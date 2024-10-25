import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { useState, useEffect } from 'react';
import useFetchItinerary from '../utilities/useFetchItinerary';
import { AddParticipantModal } from '../components/AddParticipantModal/AddParticipantModal';
import { get } from '../utilities/http.util';
import calendarIcon from '/assets/calendar-blue.svg';
import mapIcon from '/assets/map-icon.svg';

type User = {
  id: number;
  email: string;
  name: string;
  username: string;
  profilePicture: string;
};

export const ItineraryDetail = () => {
  const { itineraryId } = useParams();

  const { itinerary, activities } = useFetchItinerary(itineraryId || null);

  const [showedInfo, setShowedInfo] = useState<boolean[]>([]);

  const [reviews, setReviews] = useState<any[]>([]);

  let [usersOldNav, setUsersOldNav] = useState<User[]>([]);

  useEffect(() => {
    if (activities.length > 0) {
      const fetchReviews = () => {
        return get(
          `https://api-turistear.koyeb.app/reviews/place/${activities[0].place.googleId}`,
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
  }, [activities]);

  const toggleInfo = (index: number) => {
    setShowedInfo((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const getRandomImages = () => {
    const allPhotos = reviews.flatMap((review) => review.photos);
    const shuffledPhotos = allPhotos.sort(() => 0.5 - Math.random());
    return shuffledPhotos.slice(0, 3);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const options = { hour: '2-digit', minute: '2-digit', hour12: false } as const;
    return date.toLocaleTimeString([], options);
  };

  const activitiesByDay = activities.reduce((acc: any, activity: any) => {
    const date = new Date(activity.fromDate).toISOString().split('T')[0]; // Obtener solo la fecha
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api-turistear.koyeb.app/itinerary/participants/${itineraryId}`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === 'success' && data.itineraryParticipants.participants) {
          //setUsersOldNav(data.itineraryParticipants.participants);
          const owner = {
            ...data.itineraryParticipants.user, // El usuario dueño del itinerario
            isOwner: true, // Marcamos que este usuario es el owner
          };

          setUsersOldNav([owner, ...data.itineraryParticipants.participants]);
        } else {
          setUsersOldNav([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setUsersOldNav([]);
      }
    };

    fetchData();
  }, [itineraryId]);

  const handleUpdateUsersOld = (updatedUsers: User[]) => {
    setUsersOldNav(updatedUsers);
    usersOldNav = updatedUsers;
    console.log('Usuarios actualizados en el padre:', updatedUsers);
    console.log('UserNav new: ', usersOldNav);
  };

  const randomImages = getRandomImages();

  return (
    <>
      <Header />
      <section>
        <div className="container mx-auto max-w-[980px] flex flex-col justify-center z-30 relative p-4">
          <div className="w-full my-8">
            <ImageGallery images={randomImages} height={70} />
          </div>

          <div className="w-full  my-2">
            <div className="flex flex-col md:flex-row gap-y-3 md:gap-x-12 border-b pb-4 border-gray-50 ">
              <div className="md:max-w-[650px] flex-1">
                <div className="border-b pb-2 border-gray-50 ">
                  <h2 className="text-xl font-bold text-primary-3">{itinerary?.name}</h2>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center p-1 gap-x-2 cursor-pointer">
                  <img src={calendarIcon} alt="" />
                  <Link to={`/itineraryCalendar/${itineraryId}`}>
                    <p className="text-sm">Calendario</p>
                  </Link>
                </div>
                <div className="flex items-center p-1 gap-x-2 cursor-pointer">
                  <img src={mapIcon} alt="" />
                  <Link to={`/itineraryMap/${itineraryId}`}>
                    <p className="text-sm">Mapa</p>
                  </Link>
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="w-full flex  gap-2 mb-2">
                    <div>
                      <AddParticipantModal
                        itinerary={Number(itineraryId)}
                        tap={1}
                        usersOldNav={usersOldNav}
                        onUsersOldUpdate={handleUpdateUsersOld}
                      />
                      <AddParticipantModal
                        itinerary={Number(itineraryId)}
                        tap={2}
                        usersOldNav={usersOldNav}
                        onUsersOldUpdate={handleUpdateUsersOld}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*Itinerario */}
            <div className="mb-10">
              <h2 className="font-semibold text-md my-2">Itinerario de viaje</h2>
              {/* Días */}
              {activities.map((item: any, index: number) => {
                const dateKey = new Date(item.fromDate).toISOString().split('T')[0];
                const fecha = new Date(item.fromDate);

                return (
                  <div key={index}>
                    <button
                      className="btn-drop-down-blue-itinerary my-1"
                      onClick={() => toggleInfo(index)}
                    >
                      <h3 className="text-sm sm:text-md font-semibold flex items-center rounded-md">
                        Dia: {index + 1}
                        <div className="icons">
                          <svg
                            className={`${!showedInfo[index] ? 'block' : 'hidden'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            height="30px"
                            viewBox="0 -960 960 960"
                            width="50px"
                            fill="#FFFFFF"
                          >
                            <path d="M480-360 280-560h400L480-360Z" />
                          </svg>
                          <svg
                            className={`${showedInfo[index] ? 'block' : 'hidden'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            height="30px"
                            viewBox="0 -960 960 960"
                            width="50px"
                            fill="#FFFFFF"
                          >
                            <path d="m280-400 200-200 200 200H280Z" />
                          </svg>
                        </div>
                      </h3>
                    </button>

                    {/* Info */}
                    <div className={`${showedInfo[index] ? 'block' : 'hidden'}`}>
                      <div className="relative px-1 sm:px-0 flex flex-col gap-2 my-2 flex-wrap">
                        {/* Título del día */}
                        <h3 className="font-semibold text-sm px-10">
                          {new Date(fecha).toLocaleDateString()}
                        </h3>

                        {/* Mostrar actividades del día */}
                        {activitiesByDay[dateKey]?.map((activity: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 px-4 sm:px-8"
                          >
                            <div className="bg-gray-50 rounded-lg px-4 py-2 flex justify-center items-center">
                              <span className="text-sm">
                                {formatTime(activity.fromDate)} - {formatTime(activity.toDate)}
                              </span>
                            </div>
                            <div className="flex-1 border-l border-gray-200 pl-4 sm:pl-2">
                              <p className="font-semibold text-sm sm:text-base">
                                {activity.name?.split(' - ')[0]}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
