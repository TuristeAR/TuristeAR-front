import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { useState, useEffect, useMemo } from 'react';
import useFetchItinerary from '../utilities/useFetchItinerary';
import { AddParticipantModal } from '../components/AddParticipantModal/AddParticipantModal';
import { get } from '../utilities/http.util';
import calendarIcon from '/assets/calendar-blue.svg';
import mapIcon from '/assets/map-icon.svg';
import { Countdown } from '../components/Calendar/Countdown';
import useDownloadPdf from '../utilities/useDownloadPdf';
import { UploadImageSharedGallery } from '../components/ItineraryCalendar/UploadImageSharedGallery';
import { formatDate } from '../utilities/formatDate';
import { reorderDate } from '../utilities/reorderDate';
import { io } from 'socket.io-client';
import useFetchParticipants from '../utilities/useFetchParticipants';

type User = {
  id: number;
  email: string;
  name: string;
  profilePicture: string;
};

export const ItineraryDetail = () => {
  const { itineraryId } = useParams();
  const { itinerary, activities, events } = useFetchItinerary(itineraryId || null);
  const { downloadPDF } = useDownloadPdf();
  const { usersOldNav, setUsersOldNav } = useFetchParticipants(itineraryId);

  const [reviews, setReviews] = useState<any[]>([]);
  const [activitiesByNeighborhoodAndDay, setActivitiesByNeighborhoodAndDay] = useState({});
  const [activitiesAndEventsByDate, setActivitiesAndEventsByDate] = useState({});
  const socket = io(process.env.VITE_API_URL);

  useEffect(() => {
    socket.on('usersUpdated', (data) => {
      if(data.itineraryParticipants.id == itineraryId) {
        const owner = {
          ...data.itineraryParticipants.user,
          isOwner: true,
        };
        setUsersOldNav([owner, ...data.itineraryParticipants.participants]);
      }
    });
    socket.on('usersAddItinerary', (data) => {
      console.log('socket add', data.updatedItinerary);
      if(data.updatedItinerary == itineraryId) {
        const owner = {
          ...data.updatedItinerary.user,
          isOwner: true,
        };
        setUsersOldNav([owner, ...data.updatedItinerary.participants]);
      }
    });

    socket.on('userRemoved', ({itineraryId, participantId }) => {
      if(itinerary.id == itineraryId) {
        setUsersOldNav((prevUsersOldNav) =>
          prevUsersOldNav.filter((user) => user.id !== participantId),
        );
      }
    });

    return () => {
      socket.off('usersUpdated');
      socket.off('usersAddItinerary');
      socket.off('userRemoved');
    };
  }, []);

  useEffect(() => {
    if (activities.length > 0) {
      const fetchReviewsForActivity = (googleId: string) => {
        return get(`${process.env.VITE_API_URL}/reviews/place/${googleId}`, {
          'Content-Type': 'application/json',
        });
      };

      const fetchData = async () => {
        try {
          const reviewsPromises = activities.map((activity) =>
            fetchReviewsForActivity(activity.place.googleId),
          );
          const allReviews = await Promise.all(reviewsPromises);
          setReviews(allReviews.flat());
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [activities]);

  const randomImages = useMemo(() => {
    const getRandomImages = () => {
      const allPhotos = reviews.flatMap((review) => review.photos);
      const shuffledPhotos = allPhotos.sort(() => 0.5 - Math.random());
      return shuffledPhotos.slice(0, 3);
    };

    return getRandomImages();
  }, [reviews]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const options = { hour: '2-digit', minute: '2-digit', hour12: false } as const;
    return date.toLocaleTimeString([], options);
  };

  const handleUpdateUsersOld = (updatedUsers: User[]) => {
    setUsersOldNav(updatedUsers);
  };

  const fetchNeighborhoods = async (latitude: number, longitude: number) => {
    try {
      // Paso 1: Obtén la provincia a partir de las coordenadas
      const response = await fetch(
        `${process.env.VITE_GEOREF_API_URL}/ubicacion?lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP status ${response.status}`);
      }

      const locationData = await response.json();
      const provinciaId = locationData.ubicacion.provincia.id;

      // Paso 2: Obtén los asentamientos de la provincia
      const settlementsResponse = await fetch(
        `${process.env.VITE_GEOREF_API_URL}/asentamientos?provincia=${provinciaId}&max=2000`,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!settlementsResponse.ok) {
        throw new Error(`HTTP status ${settlementsResponse.status}`);
      }

      const settlementsData = await settlementsResponse.json();

      const settlements = settlementsData?.asentamientos;

      if (!settlements || settlements.length === 0) {
        console.warn('No se encontraron asentamientos en la provincia especificada.');
        return 'Barrio no encontrado';
      }

      // Paso 3: Encuentra el barrio más cercano calculando la distancia mínima
      let closestNeighborhood = null;
      let minDistance = Infinity;

      settlements.forEach((settlement) => {
        const settlementLat = settlement.centroide.lat;
        const settlementLon = settlement.centroide.lon;

        const distance = Math.sqrt(
          Math.pow(settlementLat - latitude, 2) + Math.pow(settlementLon - longitude, 2),
        );

        if (distance < minDistance) {
          minDistance = distance;
          closestNeighborhood = settlement.nombre;
        }
      });

      return closestNeighborhood || 'Barrio no encontrado';
    } catch (error) {
      console.error('Error en fetchNeighborhoods:', error);
      return 'Error al buscar barrio';
    }
  };

  useEffect(() => {
    const fetchSuburbsAndGroupActivitiesAndEvents = async () => {
      if (activities && activities.length > 0) {
        const suburbsPromises = activities.map((activity) =>
          fetchNeighborhoods(activity.place.latitude, activity.place.longitude),
        );

        const allSuburbs = await Promise.all(suburbsPromises);

        const activitiesByNeighborhoodAndDay = allSuburbs.reduce((acc, suburb, index) => {
          const activity = activities[index];
          const fromDate = typeof activity.fromDate === 'string' ? activity.fromDate : '';
          const dayKey = reorderDate(fromDate.split('T')[0]);

          if (!acc[dayKey]) {
            acc[dayKey] = { activities: {}, events: {} };
          }
          if (!acc[dayKey].activities[suburb]) {
            acc[dayKey].activities[suburb] = [];
          }
          acc[dayKey].activities[suburb].push(activity);
          return acc;
        }, {});

        if (events && events.length > 0) {
          events.forEach((event) => {
            const fromDate = typeof event.fromDate === 'string' ? event.fromDate : '';
            const dayKey = reorderDate(fromDate.split('T')[0]);

            if (!activitiesByNeighborhoodAndDay[dayKey]) {
              activitiesByNeighborhoodAndDay[dayKey] = { activities: {}, events: {} };
            }
            if (!activitiesByNeighborhoodAndDay[dayKey].events[event.locality]) {
              activitiesByNeighborhoodAndDay[dayKey].events[event.locality] = [];
            }
            activitiesByNeighborhoodAndDay[dayKey].events[event.locality].push(event);
          });
        }

        setActivitiesByNeighborhoodAndDay(activitiesByNeighborhoodAndDay);
      }
    };

    fetchSuburbsAndGroupActivitiesAndEvents();
  }, [activities, events]);

  useEffect(() => {
    const groupActivitiesAndEventsByDate = () => {
      const grouped = Object.entries<Record<string, { activities: any[]; events: any[] }>>(
        activitiesByNeighborhoodAndDay,
      ).reduce((acc, [date, { activities, events }]) => {
        acc[date] = { activities, events };
        return acc;
      }, {});

      setActivitiesAndEventsByDate(grouped);
    };

    groupActivitiesAndEventsByDate();
  }, [activitiesByNeighborhoodAndDay]);

  return (
    <>
      <Header />
      <UploadImageSharedGallery activities={activities} />

      <section>
        <div className="container mx-auto flex flex-col justify-center z-30 relative p-4">
          <div className="w-full  my-2">
            <div className="flex flex-col md:flex-row gap-y-3 md:gap-x-12 border-b pb-4 border-gray-50 ">
              <div className="md:max-w-[650px] flex flex-col gap-y-6 flex-1 my-4">
                <div className="border-b pb-2 border-gray-50 ">
                  <h2 className="text-xl font-bold text-primary-3">{itinerary?.name}</h2>
                </div>
                <div>
                  <Countdown fromDate={itinerary?.fromDate} />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Participants */}
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
                  {/* Mapa & Calendar */}
                  <div className="flex flex-row md:flex-col w-full justify-around md:justify-center">
                    <div className="flex items-center p-1 gap-x-2 cursor-pointer">
                      <img src={calendarIcon} alt="" />
                      <Link to={`/itinerario/calendario/${itineraryId}`}>
                        <p className="text-sm hover:underline">Calendario</p>
                      </Link>
                    </div>
                    <div className="flex items-center p-1 gap-x-2 cursor-pointer">
                      <img src={mapIcon} alt="" />
                      <Link to={`/itinerario/mapa/${itineraryId}`}>
                        <p className="text-sm hover:underline">Mapa</p>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Download PDF */}
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => downloadPDF('itinerary', 'itinerario.pdf')}
                    className="btn-drop-down-blue-itinerary hover:bg-blue-600 text-white font-semibold px-4 rounded mb-4"
                  >
                    Descargar Itinerario
                  </button>
                </div>
              </div>
              <div className="hidden lg:block md:w-[45%]">
                <ImageGallery images={randomImages} height={70} />
              </div>
            </div>
          </div>

          {/* Itinerario */}
          <div id="itinerary" className="w-full my-2">
            <div className="mb-10">
              <h2 className="font-semibold text-md my-2">Itinerario de viaje</h2>

              {Object.keys(activitiesAndEventsByDate)
                .sort((a, b) => a.localeCompare(b)) // Ordenar fechas como cadenas
                .map((dateKey, dayIndex) => (
                  <div key={dayIndex}>
                    <div className="flex justify-between bg-gray-50 rounded-lg px-4 py-1 ">
                      <h4 className="font-semibold text-md">Día {dayIndex + 1}</h4>
                      <h4 className="font-semibold text-md">{formatDate(dateKey)}</h4>
                    </div>

                    {/* Mostrar actividades */}
                    {Object.keys(activitiesAndEventsByDate[dateKey].activities).map(
                      (neighborhood) => (
                        <div key={neighborhood}>
                          <h3 className="text-sm sm:text-md font-semibold flex items-center rounded-md btn-drop-down-blue-itinerary my-1">
                            {neighborhood}
                          </h3>
                          {activitiesAndEventsByDate[dateKey].activities[neighborhood].map(
                            (activity, idx) => (
                              <div
                                key={idx}
                                className="my-4 option-card flex flex-row items-center gap-2 cursor-pointer hover:bg-[#d9d9d9] hover:-translate-y-1.5 hover:shadow-lg"
                              >
                                <div className="bg-gray-50 rounded-lg px-4 py-2">
                                  <span className="text-[0.95rem]">
                                    {formatTime(activity.fromDate)} - {formatTime(activity.toDate)}
                                  </span>
                                </div>
                                <div className="flex-1 border-l border-gray-200 pl-4 sm:pl-2">
                                  <Link
                                    to={`/lugar-esperado/${activity.place.googleId}`}
                                    className="font-semibold text-sm sm:text-base"
                                  >
                                    {activity.name?.split(' - ')[0]}
                                  </Link>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      ),
                    )}

                    {/* Mostrar eventos */}
                    {Object.keys(activitiesAndEventsByDate[dateKey].events).map((locality) => (
                      <div key={locality}>
                        <h3 className="text-sm sm:text-md font-semibold flex items-center rounded-md btn-drop-down-blue-itinerary my-1">
                          {locality}
                        </h3>
                        {activitiesAndEventsByDate[dateKey].events[locality].map((event, idx) => (
                          <div
                            key={idx}
                            className="my-4 option-card flex flex-row items-center gap-2 cursor-pointer hover:bg-[#d9d9d9] hover:-translate-y-1.5 hover:shadow-lg"
                          >
                            <div className="bg-gray-50 rounded-lg px-4 py-2">
                              <span className="text-[0.95rem]">
                                {formatTime(event.fromDate)} - {formatTime(event.toDate)}
                              </span>
                            </div>
                            <div className="flex-1 border-l border-gray-200 pl-4 sm:pl-2">
                              <Link
                                to={`/evento/${event.id}`}
                                className="font-semibold text-sm sm:text-base"
                              >
                                {event.name}
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
