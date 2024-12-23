import { useEffect, useState } from 'react';
import { Receipt, Trash2 } from 'lucide-react';
import plusIcon from '/assets/add.svg';
import chatIcon from '/assets/chat.svg';
import galleryIcon from '/assets/gallery.svg';
import alignIcon from '/assets/align.svg';
import mapIcon from '/assets/map-icon.svg';
import pencilIcon from '/assets/pencil.svg';
import useFetchPlacesByProvince from '../../utilities/useFetchPlacesByProvince';
import useFetchParticipants from '../../utilities/useFetchParticipants';
import { AddParticipantModal } from '../AddParticipantModal/AddParticipantModal';
import { io } from 'socket.io-client';
import SharedExpenses from '../../pages/SharedExpenses';
import useAddActivities from '../../utilities/useAddActivities';
import { get } from '../../utilities/http.util';
import Select from 'react-select';
import Swal from 'sweetalert2';

type User = {
  id: number;
  email: string;
  name: string;
  profilePicture: string;
};

export const LeftColumn = ({
  itinerary,
  itineraryId,
  isEditingItineraryName,
  setIsEditingItineraryName,
  isAddingActivity,
  setIsAddingActivity,
  activities,
  setActivities,
  isShowExpanse,
  events,
  setEvents,
  deleteEvent,
  onDelete,
}) => {
  const [validItinerary, setValidItinerary] = useState(null);

  const { usersOldNav, setUsersOldNav } = useFetchParticipants(itineraryId);

  const { handleAddActivity, newActivity, setNewActivity } = useAddActivities(
    itineraryId,
    setActivities,
    itinerary
  );

  const activityByProvince = useFetchPlacesByProvince(itinerary);

  const socket = io(process.env.VITE_API_URL);

  const [user, setUser] = useState<User | null>(null);

  const btnHandleAddActivity = () => {
    handleAddActivity();
    setIsAddingActivity(false);
  };

  useEffect(() => {
    if (itinerary) {
      setValidItinerary(itinerary);
    }
  }, [itinerary]);

  useEffect(() => {
    const fetchData = async () => {
      const session = await get(`${process.env.VITE_API_URL}/session`, {
        contentType: 'application/json',
      });

      if (session.statusCode !== 200) {
        window.location.href = '/iniciar-sesion';
        return;
      }

      setUser(session.user);
    };

    fetchData();
  }, []);

  useEffect(() => {

    socket.on('usersUpdated', (data) => {
      console.log('socket', data);
      if(data.itineraryParticipants.id == itineraryId){
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

    socket.on('userRemoved', ({ itineraryId, participantId }) => {
      if(itinerary.id == itineraryId) {
        setUsersOldNav((prevUsersOldNav) =>
          prevUsersOldNav.filter((user) => user.id !== participantId),
        );
      }
    });

    socket.on('activityRemoved', ({ itineraryId, activityId }) => {
      if(itinerary.id == itineraryId) {
        setActivities((prevActivities) =>
          prevActivities.filter((activity) => activity.id !== activityId),
        );
      }
    });

    socket.on('eventRemoved', ({ itineraryId, eventId }) => {
      if(itinerary.id == itineraryId) {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
      }
    });

    return () => {
      socket.off('usersUpdated');
      socket.off('userRemoved');
      socket.off('usersAddItinerary');
      socket.off('activityRemoved');
    };
  }, []);

  const placeOptions = activityByProvince.map((place) => ({
    label: place.name,
    value: place.id,
  }));

  const handleSelectChange = (selectedOption: any) => {
    setNewActivity({ ...newActivity, place: selectedOption.value });
  };

  const deleteActivity = (activityId: number) => {
    fetch(`${process.env.VITE_API_URL}/itinerary/remove-activity`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itineraryId: itineraryId, activityId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setActivities((prevActivities) =>
            prevActivities.filter((activity) => activity.id !== activityId),
          );
          Swal.fire({
            icon: 'success',
            title: 'Actividad eliminada',
            text: 'La actividad se ha eliminado correctamente del itinerario.',
          });
        } else {
          console.error('Error al eliminar la actividad:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error al eliminar la actividad:', error);
      });
  };

  const handleUpdateUsersOld = (updatedUsers: User[]) => {
    setUsersOldNav(updatedUsers);
  };

  const deleteItinerary = async (id: number) => {
    const socket = io(process.env.VITE_API_URL);
    socket.emit('deleteItinerary', {
      itineraryId: id,
      userId: user.id,
    });
    onDelete();
  };

  const updateItineraryName = (itineraryName: string) => {
    validItinerary.name = itineraryName;

    setIsEditingItineraryName(false);

    fetch(`${process.env.VITE_API_URL}/itinerary/${itineraryId}/name`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name: itineraryName }),
    });
  };

  return (
    <aside className="order-2 lg:order-1 col-span-1 p-4 flex">
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-col justify-center border-gray">
          <div className="flex flex-col justify-center border-gray">
            <div className="flex items-center justify-between">
              {validItinerary && validItinerary.name === '' ? (
                <p className="text-sm italic px-2">¡Agregá un nombre para tu itinerario!</p>
              ) : (
                <h2 className="text-lg font-medium tracking-[-0.5px] px-2">
                  {validItinerary ? validItinerary.name : ''}
                </h2>
              )}
              <img
                src={pencilIcon}
                alt=""
                className="cursor-pointer"
                onClick={() => setIsEditingItineraryName(true)}
              />
            </div>
          </div>
          <hr className="my-2 md:my-4 border-[#aaaaaa] w-full" />
          <div className="flex flex-col p-2 gap-4">
            <div
              className="option-card cursor-pointer hover:bg-[#d9d9d9] hover:-translate-y-1.5 hover:shadow-lg"
              onClick={() => setIsAddingActivity(true)}
            >
              <img src={plusIcon} alt="" />
              <button className="text-sm">Agregar actividad</button>
            </div>
            <div
              className="option-card cursor-pointer hover:bg-[#d9d9d9] hover:-translate-y-1.5 hover:shadow-lg"
              onClick={() => (window.location.href = `/itinerario/mapa/${itineraryId}`)}
            >
              <img src={mapIcon} alt="" />
              <p className="text-sm">Mapa</p>
            </div>
            <div
              className="option-card cursor-pointer hover:bg-[#d9d9d9] hover:-translate-y-1.5 hover:shadow-lg"
              onClick={() => (window.location.href = `/itinerario/chat/${itineraryId}`)}
            >
              <img src={chatIcon} alt="" />
              <p className="text-sm">Chat</p>
            </div>
            <div
              className="option-card cursor-pointer hover:bg-[#d9d9d9] hover:-translate-y-1.5 hover:shadow-lg"
              onClick={() => (window.location.href = `/itinerario/galeria/${itineraryId}`)}
            >
              <img src={galleryIcon} alt="" />
              <p className="text-sm">Galeria compartida</p>
            </div>
            <div
              className="option-card cursor-pointer hover:bg-[#d9d9d9] hover:-translate-y-1.5 hover:shadow-lg"
              onClick={() => (window.location.href = `/itinerario/detalle/${itineraryId}`)}
            >
              <img src={alignIcon} alt="" />
              <p className="text-sm">Resumen del viaje</p>
            </div>
            <div
              className="option-card cursor-pointer hover:bg-[#d9d9d9] hover:-translate-y-1.5 hover:shadow-lg"
              onClick={() => (window.location.href = `/itinerario/gastos/${itineraryId}`)}
            >
              <Receipt className="stroke-primary" strokeWidth={1} />
              <p className="text-sm">Gastos compartidos</p>
            </div>
            {user && itinerary && user.id == itinerary.user.id && (
              <div
                className="option-card cursor-pointer hover:bg-[#d9d9d9] hover:-translate-y-1.5 hover:shadow-lg"
                onClick={() => deleteItinerary(itineraryId)}
              >
                <Trash2 strokeWidth={1} color="red" />
                <p className="text-sm">Eliminar</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 my-4 border-gray">
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
        {isEditingItineraryName && (
          <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>
            <div className="fixed top-0 left-0 right-0 flex justify-center items-center h-screen z-50">
              <div className="bg-white w-auto md:w-[450px] h-auto flex flex-col mx-auto p-4 rounded shadow-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-black text-2xl text-start mb-4">
                    Editar nombre del itinerario
                  </h3>
                  <button className="mb-4" onClick={() => setIsEditingItineraryName(false)}>
                    &#x2716;
                  </button>
                </div>
                <input
                  id="itinerary-name"
                  type="text"
                  placeholder="Nombre del itinerario"
                  defaultValue={validItinerary !== '' ? validItinerary.name : ''}
                  className="w-full p-2 border border-primary rounded mb-2 outline-none"
                  autoComplete="off"
                />
                <div className="flex gap-x-2 justify-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      updateItineraryName(
                        (document.getElementById('itinerary-name') as HTMLInputElement).value,
                      );
                    }}
                    className="btn-question"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {isAddingActivity && (
          <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>

            <div className="fixed top-0 left-0 right-0 flex justify-center items-center h-screen z-50">
              <div className="bg-white w-auto md:w-[450px] h-auto flex flex-col mx-auto p-4 rounded shadow-lg">
                <h3 className="font-semibold text-black text-2xl text-start mb-4">
                  Agregar nueva actividad
                </h3>
                <input
                  type="text"
                  placeholder="Nombre de la actividad"
                  value={newActivity.name}
                  onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                  className="w-full p-2 border border-primary rounded mb-2 outline-none"
                  autoComplete="off"
                />
                <input
                  type="datetime-local"
                  value={newActivity.fromDate}
                  onChange={(e) => setNewActivity({ ...newActivity, fromDate: e.target.value })}
                  className="w-full p-2 border border-primary rounded mb-2 outline-none"
                />
                <input
                  type="datetime-local"
                  value={newActivity.toDate}
                  onChange={(e) => setNewActivity({ ...newActivity, toDate: e.target.value })}
                  className="w-full p-2 border border-primary rounded mb-2 outline-none"
                />

                <div className="relative w-full">
                  <Select
                    options={placeOptions}
                    onChange={handleSelectChange}
                    placeholder="Selecciona un lugar"
                    className="w-full py-2  rounded mb-2"
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        borderColor: '#4B5563',
                        borderRadius: '8px',
                        padding: '5px',
                      }),
                      menu: (provided) => ({
                        ...provided,
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected ? 'blue' : 'white', // Fondo verde al seleccionar
                        color: state.isSelected ? 'white' : 'black',
                        padding: '10px',
                        cursor: 'pointer',
                      }),
                    }}
                  />
                </div>

                <div className="flex gap-x-2 justify-center">
                  <button onClick={btnHandleAddActivity} className="btn-question">
                    Agregar
                  </button>
                  <button onClick={() => setIsAddingActivity(false)} className="btn-question">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
        {/* Eliminar actividad */}
        <div className="flex flex-col gap-4 md:my-4">
          <h2 className="font-medium tracking-[-0.5px] leading-none">Eliminar actividades</h2>

          {activities.length === 0 ? (
            <p>No hay actividades para eliminar</p>
          ) : (
            <>
              <div className="w-full flex flex-col gap-4 mb-2 overflow-scroll scrollbar-hidden max-h-[400px]">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full p-2 bg-white rounded-lg shadow-md option-card hover:-translate-y-1.5 hover:shadow-lg hover:bg-[#d9d9d9]"
                  >
                    <p className="text-sm w-[90%]">{activity.name}</p>
                    <button onClick={() => deleteActivity(activity.id)}>
                      <Trash2 strokeWidth={1.5} color="red" width={22} height={22} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        {isShowExpanse ? <SharedExpenses></SharedExpenses> : ''}
        {/* Eliminar actividad */}
        <div className="flex flex-col gap-4 md:my-4">
          <h2 className="font-medium tracking-[-0.5px] leading-none">Eliminar eventos</h2>

          {events.length === 0 ? (
            <p>No hay eventos para eliminar</p>
          ) : (
            <>
              <div className="w-full flex flex-col gap-4 mb-2">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full p-2 bg-white rounded-lg shadow-md option-card hover:-translate-y-1.5 hover:shadow-lg hover:bg-[#d9d9d9]"
                  >
                    <p className="text-sm w-[90%]">{event.name}</p>
                    <button onClick={() => deleteEvent(event.id)}>
                      <Trash2 strokeWidth={1.5} color="red" width={22} height={22} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};
