import { Key, useEffect, useState } from 'react';
import { Calendar, Trash2Icon } from 'lucide-react';
import { Edit2Icon } from 'lucide-react';
import { InfoIcon } from 'lucide-react';
import { StarIcon } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { get } from '../../utilities/http.util';
import formatFromDateAndToDate from '../../utilities/formatEventDate';

export const ModalActivity = ({ handleClose, deleteActivity, eventInfo, deleteEvent }) => {
  const [reviews, setReviews] = useState([]);
  const [selectedTab, setSelectedTab] = useState('info');
  const isActivity = eventInfo._def.extendedProps.type === 'activity';

  useEffect(() => {
    if (isActivity) {
      const fetchReviews = () => {
        return get(
          `${process.env.VITE_API_URL}/reviews/place/${eventInfo.extendedProps.googleId}`,
          {
            'Content-Type': 'application/json',
          },
        );
      };

      const fetchData = async () => {
        try {
          const [reviewsData] = await Promise.all([fetchReviews()]);
          setReviews(reviewsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [eventInfo.extendedProps.googleId]);

  return (
    <>
      <div className="flex justify-center items-center fixed top-0 left-0 w-screen h-screen z-50 bg-black/80 cursor-default">
        {isActivity ? (
          <div className="flex flex-col justify-evenly md:justify-start gap-y-2 bg-white p-4 rounded-lg shadow-md text-center w-[90%] lg:max-w-[800px] h-[75vh] overflow-y-auto scrollbar-hidden relative">
            <div className="flex justify-end gap-x-6 w-full">
              <button onClick={() => deleteActivity(Number(eventInfo.id))}>
                <Trash2Icon size={20} color="#49A2EC" />
              </button>
              <div className="relative bg-gray-50 hover:bg-gray/25 rounded-full w-10 h-10 flex justify-center items-center">
                <span
                  className="absolute top-0 right-0 left-0 text-[26px] text-center text-gray font-bold cursor-pointer"
                  onClick={handleClose}
                >
                  &times;
                </span>
              </div>
            </div>
            <div className="flex gap-x-2 items-center justify-between m-4">
              <div className="flex items-center gap-x-2">
                <div className="bg-primary w-5 h-5 rounded-sm"></div>
                <span className="text-lg md:text-2xl font-semibold whitespace-normal break-words text-black">
                  {eventInfo.title.replace(/ - \d{1,2} \w+\./, '')}
                </span>
              </div>
              <span className="flex gap-x-2 text-md md:text-lg font-semibold whitespace-normal break-words text-gray/95">
                <StarIcon size={25} color="#49A2EC" fill="#49A2EC" />
                {eventInfo.extendedProps.rating}
              </span>
            </div>

            {/* Botones para alternar entre Información General y Reseñas */}
            <div className="flex justify-center gap-x-4 mb-4">
              <button
                className={`p-2 rounded-md font-semibold ${selectedTab === 'info' ? 'bg-primary text-white' : 'bg-gray-200 text-gray'}`}
                onClick={() => setSelectedTab('info')}
              >
                Información General
              </button>
              <button
                className={`p-2 rounded-md font-semibold ${selectedTab === 'reviews' ? 'bg-primary text-white' : 'bg-gray-200 text-gray'}`}
                onClick={() => setSelectedTab('reviews')}
              >
                Reseñas
              </button>
            </div>

            {/* Sección de Información General */}

            {selectedTab === 'info' && (
              <div className="flex flex-col  md:flex-row">
                <div className="flex flex-1 flex-col items-start gap-y-2">
                  <span className="text-md md:text-lg font-semibold whitespace-normal break-words text-black/90 md:my-3 md:ml-7">
                    {eventInfo.start && eventInfo.start.toLocaleDateString('en-GB')} -{' '}
                    {eventInfo.start &&
                      eventInfo.start.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                  </span>
                  <Link
                    to={`/lugar-esperado/${eventInfo.extendedProps.googleId}`}
                    className="flex items-center gap-x-2 text-md md:text-lg font-semibold whitespace-normal break-words text-primary hover:text-gray/70 md:my-3 md:ml-7 cursor-pointer"
                  >
                    <InfoIcon size={20} color="#49A2EC" />
                    Más info de este lugar
                  </Link>
                  <div className="flex flex-col items-start gap-x-2 gap-y-2 w-full">
                    {eventInfo.extendedProps.address && (
                      <span className="flex items-center gap-x-2 text-md md:text-lg font-semibold whitespace-normal break-words text-gray/95 hover:text-gray/70 md:my-3 md:ml-7 cursor-pointer">
                        <MapPin size={20} color="#49A2EC" />
                        {eventInfo.extendedProps.address}
                      </span>
                    )}
                    {eventInfo.extendedProps.hours.length > 0 && (
                      <div className="flex gap-x-2 md:my-3 md:ml-7 text-md md:text-lg font-semibold text-gray/95">
                        {' '}
                        <Calendar size={20} color="#49A2EC" />
                        <div className="flex flex-col items-start">
                          {eventInfo.extendedProps.hours.map((hour, index) => (
                            <span className="whitespace-normal break-words" key={index}>
                              {hour}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Sección de Reseñas */}
            {selectedTab === 'reviews' && (
              <div className="flex-1 overflow-y-auto scrollbar-hidden p-4">
                {Array.isArray(reviews) && reviews.length === 0 ? (
                  <span className="text-md md:text-lg font-semibold whitespace-normal break-words text-gray/95 md:my-3 md:ml-7">
                    No hay reseñas disponibles
                  </span>
                ) : (
                  Array.isArray(reviews) &&
                  reviews.map((review, index) => (
                    <div key={index} className="flex flex-col items-start gap-y-2">
                      <div className="flex gap-x-2 items-center">
                        <img
                          src={review.authorPhoto}
                          alt={review.authorName}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-md md:text-lg font-semibold whitespace-normal break-words text-black">
                          {review.authorName}
                        </span>
                        <span className="flex items-center gap-x-2 text-md md:text-lg font-semibold whitespace-normal break-words text-gray/95 md:my-3 md:ml-7">
                          <StarIcon size={20} color="#49A2EC" fill="#49A2EC" />
                          {review.rating}
                        </span>
                      </div>
                      <span className="text-md md:text-lg font-semibold whitespace-normal break-words text-gray/95 md:my-3 md:ml-7">
                        {review.text || 'No review text available'}
                      </span>
                      <div className="flex items-center justify-center w-full flex-wrap md:flex-nowrap my-2 gap-2">
                        {review.photos &&
                          review.photos.map((photo: any, index: Key) => (
                            <img
                              key={index}
                              src={photo}
                              alt={review.authorName}
                              className="w-full h-auto max-h-[200px] object-cover rounded-md"
                            />
                          ))}
                      </div>
                      <hr className="my-2 border-[#aaaaaa] w-full" />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-evenly md:justify-start gap-y-2 bg-white p-4 rounded-lg shadow-md text-center w-[90%] lg:max-w-[800px] h-[75vh] overflow-y-auto scrollbar-hidden relative">
            <div className="flex justify-end gap-x-6 w-full">
              <button onClick={() => deleteEvent(Number(eventInfo.id))}>
                <Trash2Icon size={20} color="#49A2EC" />
              </button>
              <div className="relative bg-gray-50 hover:bg-gray/25 rounded-full w-10 h-10 flex justify-center items-center">
                <span
                  className="absolute top-0 right-0 left-0 text-[26px] text-center text-gray font-bold cursor-pointer"
                  onClick={handleClose}
                >
                  &times;
                </span>
              </div>
            </div>
            <p className="text-lg md:text-2xl font-semibold whitespace-normal break-words text-black text-center">
              {eventInfo.title.replace(/ - \d{1,2} \w+\./, '')}
            </p>
            <img
              src={eventInfo.extendedProps.image}
              alt={eventInfo.title}
              className="my-1 md:my-2 w-full h-auto max-h-[300px] object-cover rounded-md"
            />
            <p className="my-1 md:my-2 px-1 text-start text-md md:text-lg font-semibold whitespace-normal break-words text-gray/95">
              {eventInfo.extendedProps.description}
            </p>
            <span className="my-1 md:my-2 px-1 flex items-center gap-x-2 text-md md:text-lg font-semibold whitespace-normal break-words text-gray/95">
              {' '}
              <MapPin size={20} color="#49A2EC" />
              {eventInfo.extendedProps.locality}
            </span>
            <div className="my-1 md:my-2 px-1 flex gap-x-2 text-md md:text-lg font-semibold text-gray/95">
              {' '}
              <Calendar size={20} color="#49A2EC" />
              <span className="flex items-center gap-x-2 text-md md:text-lg font-semibold whitespace-normal break-words text-gray/95">
                {formatFromDateAndToDate(eventInfo.start, eventInfo.end)}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
