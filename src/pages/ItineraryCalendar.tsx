/* Icons */
import plusIcon from '/assets/add.svg';
import chatIcon from '/assets/chat.svg';
import galleryIcon from '/assets/gallery.svg';
import alignIcon from '/assets/align.svg';
import deleteIcon from '/assets/delete.svg';

/* Components */
import { Calendar } from '../components/Calendar/Calendar';
import { AddParticipantModal } from '../components/AddParticipantModal/AddParticipantModal';
import { Header } from '../components/Header/Header';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetchItinerary from '../utilities/useFetchItinerary';

type User = {
  id: number;
  email: string;
  name: string;
  username: string;
  profilePicture: string;
};

export const ItineraryCalendar = () => {
  const { itineraryId } = useParams();
  const { itinerary, activities, setActivities } = useFetchItinerary(itineraryId || null);
  let [usersOldNav, setUsersOldNav] = useState<User[]>([]);

  const [newActivity, setNewActivity] = useState({ name: '', fromDate: '', toDate: '', place: '' });
  const [activityProvince, setActivityProvince] = useState([]);

  const [isAddingActivity, setIsAddingActivity] = useState(false);

  const [showPlaces, setShowPlaces] = useState(false);

  const [selectedPlace, setSelectedPlace] = useState(''); // Nuevo estado para el nombre del lugar

  const handleAddActivity = () => {
    fetch('http://localhost:3001/itinerary/add-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itineraryId, createActivityDto: newActivity }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response data:', data); // Verificar la estructura de la respuesta

        if (data.status === 'success') {
          const updatedItinerary = data.itinerary;
          const activitiesList = updatedItinerary?.activities || [];
          const lastActivity = activitiesList[activitiesList.length - 1];

          if (lastActivity) {
            setActivities((prevActivities) => [...prevActivities, lastActivity]);
            console.log('activities:', activities);
            console.log('Itinerary after adding activity front:', lastActivity);
          }

          setNewActivity({ name: '', fromDate: '', toDate: '', place: '' }); // Resetear el formulario
          setIsAddingActivity(false); // Cerrar el formulario
        } else {
          console.error('Error al agregar la actividad:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error al agregar la actividad:', error);
      });
  };

  const deleteActivity = (activityId: number) => {
    fetch('https://api-turistear.koyeb.app/itinerary/remove-activity', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itineraryId: itineraryId, activityId }), // Asegúrate de usar el itineraryId correcto
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          // Actualizar las actividades en el frontend después de eliminar una
          setActivities((prevActivities) =>
            prevActivities.filter((activity) => activity.id !== activityId),
          );
        } else {
          console.error('Error al eliminar la actividad:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error al eliminar la actividad:', error);
      });
  };

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

  //users updated in parent
  const handleUpdateUsersOld = (updatedUsers: User[]) => {
    setUsersOldNav(updatedUsers);
    usersOldNav = updatedUsers;
    console.log('Usuarios actualizados en el padre:', updatedUsers);
    console.log('UserNav new: ', usersOldNav);
  };

  // Efecto para cargar lugares por provincia
  useEffect(() => {
    const fetchPlacesByProvince = async () => {
      try {
        if (itinerary && itinerary.name) {
          const province = itinerary.name.split(' a ')[1]; // Extrae la provincia del nombre del itinerario

          // Realiza la llamada al endpoint en el backend
          const response = await fetch(
            `http://localhost:3001/fetch-activities-places/${province}`,
            {
              method: 'GET',
              credentials: 'include',
            },
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          // Verifica si la respuesta es exitosa y tiene lugares
          if (data.status === 'success') {
            setActivityProvince(data.data);
          } else {
            setActivityProvince([]); // Limpia el estado si no hay lugares
          }
        } else {
          console.error('El itinerario no tiene nombre o no se ha cargado correctamente.');
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlacesByProvince();
  }, [itinerary]);

  return (
    <section className="h-screen xl:h-auto overflow-x-clip relative">
      <Header containerStyles="fixed top-0 left-0 right-0 z-[60]" />
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4 h-full mt-20 py-4">
        {/* Left Column */}
        <aside className="order-2 lg:order-1 col-span-1 p-4 flex">
          <div className="flex flex-col h-full w-full">
            <div className="flex flex-col justify-center border-b border-gray">
              <h2 className="font-semibold tracking-[-0.5px] leading-none">
                {(itinerary as any)?.name}
              </h2>
              <div className="flex flex-col p-2 gap-y-2">
                <div className="flex items-center gap-x-2 cursor-pointer">
                  <img src={plusIcon} alt="" />
                  <button onClick={() => setIsAddingActivity(true)}>Agregar actividad</button>
                </div>
                <div className="flex items-center gap-x-2 cursor-pointer">
                  <img src={chatIcon} alt="" />
                  <p className="text-sm">Chat de viaje</p>
                </div>
                <div className="flex items-center gap-x-2 cursor-pointer">
                  <img src={galleryIcon} alt="" />
                  <p className="text-sm">Galeria compartida</p>
                </div>
                <div className="flex items-center gap-x-2 cursor-pointer">
                  <img src={alignIcon} alt="" />
                  <Link to={`/itineraryDetail/${itineraryId}`}>
                    <p className="text-sm">Resumen del viaje</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 my-4 border-b border-gray">
              <div className="w-full flex flex-col gap-2 mb-2">
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
            {/* Formulario para agregar actividad */}
            {isAddingActivity && (
              <div className="flex justify-center items-center w-[450px] h-auto flex-col mx-auto right-0 left-0 p-4 border rounded  absolute z-50 bg-black/80 ">
                <h3 className="font-semibold text-white text-2xl mb-4">Agregar nueva actividad</h3>
                <input
                  type="text"
                  placeholder="Nombre de la actividad"
                  value={newActivity.name}
                  onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                  className="w-full p-2 border border-gray rounded mb-2"
                />
                <input
                  type="datetime-local"
                  value={newActivity.fromDate}
                  onChange={(e) => setNewActivity({ ...newActivity, fromDate: e.target.value })}
                  className="w-full p-2 border border-gray rounded mb-2"
                />
                <input
                  type="datetime-local"
                  value={newActivity.toDate}
                  onChange={(e) => setNewActivity({ ...newActivity, toDate: e.target.value })}
                  className="w-full p-2 border border-gray rounded mb-2"
                />
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Lugar"
                    value={selectedPlace || newActivity.place}
                    onChange={(e) => setSelectedPlace(e.target.value)}
                    onFocus={() => setShowPlaces(true)}
                    className="w-full p-2 border border-gray rounded mb-2"
                  />

                  {showPlaces && (
                    <div className="absolute left-0 right-0 bg-white border border-gray rounded mt-1 z-50">
                      {activityProvince.map((place, index) => (
                        <div
                          key={index}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => {
                            setSelectedPlace(place.name);
                            setNewActivity({ ...newActivity, place: place.id });
                            setShowPlaces(false);
                          }}
                        >
                          {place.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-x-2">
                  <button onClick={handleAddActivity} className="btn-question">
                    Agregar
                  </button>
                  <button onClick={() => setIsAddingActivity(false)} className="btn-question">
                    Cancelar
                  </button>
                </div>
              </div>
            )}
            {/* Eliminar actividad */}
            <div className="flex flex-col gap-4 md:my-4">
              {activities.length === 0 ? (
                <p>No hay actividades para eliminar</p>
              ) : (
                <>
                  <h2 className="font-semibold tracking-[-0.5px] leading-none">
                    Eliminar actividades
                  </h2>
                  <div className="w-full flex flex-col gap-2 mb-2">
                    {activities.map((activity, index) => (
                      <div key={index} className="flex justify-between items-center w-full">
                        <p className="text-sm w-[90%]">{activity.name}</p>
                        <button className="w-[10%]" onClick={() => deleteActivity(activity.id)}>
                          <img className="w-5 mx-auto" src={deleteIcon} alt="" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="p-2">
                    <p className="text-gray">Descubrir más</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>
        {/* Main Column */}
        <main className="order-1 lg:order-2 col-span-1 container mx-auto">
          <div className="flex flex-col h-full mx-4 mb-4 md:mx-0 md:w-full">
            <Calendar
              activities={activities}
              setActivities={setActivities}
              deleteActivity={deleteActivity}
            />
          </div>
        </main>
      </div>
    </section>
  );
};
