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

export const ItineraryCalendar = () => {
  const { itineraryId } = useParams();
  const [isEditing, setIsEditing] = useState(false);

  const { itinerary, activities, setActivities } = useFetchItinerary(itineraryId || null);

  useEffect(() => {
    console.log('Itinerario:', itinerary);
    console.log('Activities:', activities);
  }, [itinerary, activities]);

  const deleteEvent = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      setActivities((prevEvents) => prevEvents.filter((event) => event.id !== id));
    }
  };

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
                  <p className="text-sm">Agregar actividad</p>
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
                  <AddParticipantModal itinerary={Number(itineraryId)} tap={1} />
                  <AddParticipantModal itinerary={Number(itineraryId)} tap={2} />
                </div>
              </div>
            </div>

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
                        <button className="w-[10%]" onClick={() => deleteEvent(activity.id)}>
                          <img className="w-5 mx-auto" src={deleteIcon} alt="" />
                        </button>
                      </div>
                    ))}
                  </div>
                  {isEditing && <button className="btn-question">Guardar</button>}
                </>
              )}
            </div>
          </div>
        </aside>
        {/* Main Column */}
        <main className="order-1 lg:order-2 col-span-1 container mx-auto">
          <div className="flex flex-col h-full mx-4 mb-4 md:mx-0 md:w-full">
            <Calendar activities={activities} setActivities={setActivities} isEditing = {isEditing} setIsEditing = {setIsEditing} />
          </div>
        </main>
      </div>
    </section>
  );
};
