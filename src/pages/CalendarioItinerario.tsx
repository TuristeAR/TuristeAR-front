/* Icons */
import plusIcon from '/assets/add.svg';
import chatIcon from '/assets/chat.svg';
import galleryIcon from '/assets/gallery.svg';
import alignIcon from '/assets/align.svg';
import deleteIcon from '/assets/delete.svg';

/* Hooks */
import { useState } from 'react';

/* Components */
import Calendar from '../components/Calendar';
import { Header } from '../components/Header';

const CalendarioItinerario = () => {
  const [events, setEvents] = useState([
    { id: '1', title: 'Pasear por el Jardin Japones', date: '2024-10-04' },
    { id: '2', title: 'Tomar mates en el Rosedal', date: '2024-10-05' },
  ]);

  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <section className="h-screen xl:h-auto overflow-x-clip relative">
      <Header containerStyles="bg-primary fixed top-0 left-0 right-0 z-[60]" />
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 h-full mt-20 py-4 ">
        {/* Left Column */}
        <aside className="col-span-1 p-4 hidden md:flex">
          <div className="flex flex-col h-full w-full">
            <div className="flex flex-col justify-center border-b border-gray">
              <h2 className="font-semibold tracking-[-0.5px] leading-none">
                Buenos Aires - 4 días
              </h2>
              <div className="flex flex-col p-2 gap-y-2">
                <div className="flex items-center gap-x-2 cursor-pointer">
                  <img src={plusIcon} alt=""  />
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
                  <p className="text-sm">Resumen del viaje</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 my-4 border-b border-gray">
              <h2 className="font-semibold tracking-[-0.5px] leading-none">Participantes</h2>
              <div className="w-full flex flex-col gap-2 mb-2">
                {['Sofia Ramirez', 'Ana Martinez', 'German Riggiano', 'Camila Ibarra'].map(
                  (name) => (
                    <div key={name} className="flex items-center w-full gap-2">
                      <div className="bg-gray-50 w-8 h-8 rounded-full"></div>
                      <p>{name}</p>
                    </div>
                  ),
                )}
                <div>
                  <p className='cursor-pointer'>Agregar amigos</p>
                </div>
              </div>
            </div>

            {/* Eliminar actividad */}
            <div className="flex flex-col gap-4 my-4">
              {events.length === 0 ? (
                <p>No hay actividades para eliminar</p>
              ) : (
                <>
                  <h2 className="font-semibold tracking-[-0.5px] leading-none">
                    Eliminar actividades
                  </h2>
                  <div className="w-full flex flex-col gap-2 mb-2">
                    {events.map((activity, index) => (
                      <div key={index} className="flex items-center w-full gap-2">
                        <button onClick={() => deleteEvent(activity.id)}>
                          <img src={deleteIcon} alt="" />
                        </button>
                        <p>{activity.title}</p>
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
        <main className="col-span-1 container mx-auto flex justify-center flex-1 my-4">
          <div className="flex flex-col h-full mx-4 md:mx-0 md:w-[900px]">
            <Calendar setEvents={setEvents} events={events} />
          </div>
        </main>
      </div>
    </section>
  );
};

export default CalendarioItinerario;
