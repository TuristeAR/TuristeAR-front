import { useState } from 'react';

/* Icons */
import plusIcon from '/assets/add.svg';
import chatIcon from '/assets/chat.svg';
import galleryIcon from '/assets/gallery.svg';
import alignIcon from '/assets/align.svg';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import useFetchPlacesByProvince from '../../utilities/useFetchPlacesByProvince';

import { AddParticipantModal } from '../AddParticipantModal/AddParticipantModal';

export const LeftColumn = ({
  itinerary,
  itineraryId,
  usersOldNav,
  handleUpdateUsersOld,
  isAddingActivity,
  setIsAddingActivity,
  activities,
  setActivities,
}) => {
  const [newActivity, setNewActivity] = useState({ name: '', fromDate: '', toDate: '', place: '' });
  const [selectedPlace, setSelectedPlace] = useState('');
  const [showPlaces, setShowPlaces] = useState(false);

  const activityByProvince = useFetchPlacesByProvince(itinerary);
  const [filteredPlaces, setFilteredPlaces] = useState(activityByProvince);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSelectedPlace(inputValue);

    // Filtra los lugares basados en el valor del input
    const filtered = activityByProvince.filter((place) =>
      place.name.toLowerCase().includes(inputValue.toLowerCase()),
    );

    setFilteredPlaces(filtered);
    setShowPlaces(true); // Muestra la lista sin importar si hay coincidencias
  };

  const handlePlaceSelect = (placeName: string, placeId: string) => {
    setSelectedPlace(placeName);
    setNewActivity({ ...newActivity, place: placeId });
    setShowPlaces(false); // Cierra la lista al seleccionar un lugar
  };

  const handleAddActivity = () => {
    fetch('https://api-turistear.koyeb.app/itinerary/add-activity', {
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

  return (
    <aside className="order-2 lg:order-1 col-span-1 p-4 flex">
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-col justify-center  border-gray">
          <h2 className="font-medium tracking-[-0.5px] leading-none">{(itinerary as any)?.name}</h2>
          <div className="flex flex-col p-2 gap-y-2">
            <div className="option-card cursor-pointer">
              <img src={plusIcon} alt="" />
              <button onClick={() => setIsAddingActivity(true)}>Agregar actividad</button>
            </div>
            <div className="option-card cursor-pointer">
              <img src={chatIcon} alt="" />
              <p className="text-sm">Chat de viaje</p>
            </div>
            <div className="option-card cursor-pointer">
              <img src={galleryIcon} alt="" />
              <p className="text-sm">Galeria compartida</p>
            </div>
            <div className="option-card cursor-pointer">
              <img src={alignIcon} alt="" />
              <Link to={`/itineraryDetail/${itineraryId}`}>
                <p className="text-sm">Resumen del viaje</p>
              </Link>
            </div>
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
        {isAddingActivity && (
          <>
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>

            <div className="fixed top-0 left-0 right-0 flex justify-center items-center h-screen z-50">
              <div className="bg-white w-auto md:w-[450px] h-auto flex flex-col  mx-auto p-4  rounded shadow-lg">
                <h3 className="font-semibold text-black text-2xl text-start mb-4">
                  Agregar nueva actividad
                </h3>
                <input
                  type="text"
                  placeholder="Nombre de la actividad"
                  value={newActivity.name}
                  onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                  className="w-full p-2 border border-primary  rounded mb-2 outline-none"
                />
                <input
                  type="datetime-local"
                  value={newActivity.fromDate}
                  onChange={(e) => setNewActivity({ ...newActivity, fromDate: e.target.value })}
                  className="w-full p-2 border border-primary  rounded mb-2 outline-none"
                />
                <input
                  type="datetime-local"
                  value={newActivity.toDate}
                  onChange={(e) => setNewActivity({ ...newActivity, toDate: e.target.value })}
                  className="w-full p-2 border border-primary rounded mb-2 outline-none"
                />
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Lugar"
                    value={selectedPlace || newActivity.place}
                    onChange={handleInputChange}
                    onFocus={() => setShowPlaces(true)}
                    className="w-full p-2 border border-primary rounded mb-2 outline-none"
                  />

                  {showPlaces && (
                    <div className="absolute left-0 right-0 max-h-48 bg-white rounded z-50 overflow-y-auto">
                      {filteredPlaces.length > 0 &&
                        filteredPlaces.map((place, index) => (
                          <div
                            key={index}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handlePlaceSelect(place.name, place.id)}
                          >
                            {place.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-x-2 justify-center">
                  <button onClick={handleAddActivity} className="btn-question">
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
              <div className="w-full flex flex-col gap-2 mb-2">
                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center w-full p-2 bg-white rounded-lg shadow-md option-card"
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
      </div>
    </aside>
  );
};