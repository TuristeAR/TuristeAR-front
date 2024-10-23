import { ChangeEvent, Key, useEffect, useState } from 'react';
import { Trash2Icon } from 'lucide-react';
import { Edit2Icon } from 'lucide-react';
import { InfoIcon } from 'lucide-react';
import { StarIcon } from 'lucide-react';
import { MapPin } from 'lucide-react';

import { Link } from 'react-router-dom';
import { get } from '../../utilities/http.util';

export const ModalActivity = ({ handleClose, editEvent, deleteActivity, eventInfo }) => {
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar si estamos editando
  const [newName, setNewName] = useState(eventInfo.event.title); // Estado para el nuevo nombre del evento
  const [reviews, setReviews] = useState([]);
  const [selectedTab, setSelectedTab] = useState('info'); // Estado para alternar entre las secciones

  const handleSave = () => {
    editEvent(Number(eventInfo.event.id), newName); // Llama a la función `editEvent` con el nuevo nombre
    setIsEditing(false); // Salir del modo de edición
  };

  const handleEvent = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  useEffect(() => {
    const fetchReviews = () => {
      return get(
        `https://api-turistear.koyeb.app/reviews/place/${eventInfo.event.extendedProps.googleId}`,
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
  }, [eventInfo.event.extendedProps.googleId]);

  console.log(reviews);
  return (
    <>
      <div className="flex justify-center items-center fixed top-0 left-0 w-[100%] h-[100%] z-50 bg-black/80 cursor-default">
        <div className="flex flex-col gap-y-2  bg-white p-2 rounded-lg shadow-md text-center w-[350px] md:w-full md:max-w-[500px] h-[45vh] md:h-[70vh] relative overflow-y-auto ">
          <div className="flex justify-end gap-x-2 w-full">
            <button onClick={() => setIsEditing(true)}>
              <Edit2Icon size={20} color="#49A2EC" />
            </button>

            <button onClick={() => deleteActivity(Number(eventInfo.event.id))}>
              <Trash2Icon size={20} color="#49A2EC" />
            </button>
            <div className="relative bg-gray-50 hover:bg-gray/25 rounded-full w-10 h-10  flex justify-center items-center">
              <span
                className="absolute top-0 right-0 left-0 text-[26px] text-center text-gray font-bold"
                onClick={handleClose}
              >
                &times;
              </span>
            </div>
          </div>

          <div className="flex gap-x-2 items-center">
            <div className="bg-primary w-5 h-5 rounded-sm"></div>
            <span className="text-[11px] md:text-xl font-semibold whitespace-normal break-words text-black">
              {eventInfo.event.title.replace(/ - \d{1,2} \w+\./, '')}
            </span>
            <span className="flex gap-x-2 text-[11px] md:text-sm font-semibold whitespace-normal break-words text-gray/95 md:ml-7">
              <StarIcon size={20} color="#49A2EC" fill="#49A2EC" />
              {eventInfo.event.extendedProps.rating}
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
                <span className="text-[11px] md:text-sm font-semibold whitespace-normal break-words text-black/90 md:ml-7">
                  {eventInfo.event.start && eventInfo.event.start.toLocaleDateString()}{' '}
                  {eventInfo.event.start && eventInfo.event.start.toLocaleTimeString()}{' '}
                </span>
                <Link
                  to={`/lugar-esperado/${eventInfo.event.extendedProps.googleId}`}
                  className="flex gap-x-2 text-[11px] md:text-sm font-semibold whitespace-normal break-words text-gray/95 hover:text-gray/70 md:ml-7 cursor-pointer"
                >
                  Sobre este lugar <InfoIcon size={20} color="#49A2EC" />
                </Link>
                <div className="flex flex-col items-start gap-y-2 w-full">
                  <span className="flex text-[11px] md:text-sm font-semibold whitespace-normal break-words text-gray/95 md:ml-6">
                    <MapPin size={20} color="#49A2EC" />

                    {eventInfo.event.extendedProps.address}
                  </span>

                  <span className="flex flex-col gap-y-2 text-start text-[11px] md:text-sm font-semibold whitespace-normal break-words text-gray/95 md:ml-7">
                    Horarios:
                    {eventInfo.event.extendedProps.hours.map((hour, index) => (
                      <span  className='whitespace-normal break-words' key={index}>{hour}</span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Sección de Reseñas */}
          {selectedTab === 'reviews' && (
            <div className="flex-1 overflow-y-auto max-h-[400px] p-4">
              {reviews.map((review, index) => (
                <div key={index} className="flex flex-col items-start gap-y-2">
                  <div className="flex gap-x-2 items-center">
                    <img
                      src={review.authorPhoto}
                      alt={review.authorName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-[11px] md:text-sm font-semibold whitespace-normal break-words text-black">
                      {review.authorName}
                    </span>
                    <span className="flex gap-x-2 text-[11px] md:text-sm font-semibold whitespace-normal break-words text-gray/95 md:ml-7">
                      <StarIcon size={20} color="#49A2EC" fill="#49A2EC" />
                      {review.rating}
                    </span>
                  </div>
                  <span className="text-[11px] md:text-sm font-semibold whitespace-normal break-words text-gray/95 md:ml-7">
                    {review.text}
                  </span>
                  <div className="flex flex-col items-start gap-y-2">
                    {review.photos.map((photo: any, index: Key) => (
                      <img
                        key={index}
                        src={photo}
                        alt={review.authorName}
                        className="w-full h-auto max-h-[200px] object-cover rounded-md"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* {isEditing && (
            <div className="flex gap-x-2 justify-center mt-1 overflow-hidden">
              <button onClick={handleSave} className="btn-question">
                Guardar
              </button>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};
