import { Header } from '../components/Header';
import FullCalendar from '@fullcalendar/react';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from 'react';

const Calendar = () => {
  const [events, setEvents] = useState([
    { id: '1', title: 'Evento 1', date: '2024-09-01' },
    { id: '2', title: 'Evento 2', date: '2024-09-05' },
  ]);
  /* 
  const handleEventClick = (info: { event: { title: any; id: string } }) => {
    
  }; */

  const handleDateClick = (arg: { dateStr: any }) => {
    const title = prompt('Introduce el título del nuevo evento:');
    if (title) {
      setEvents([...events, { id: String(events.length + 1), title, date: arg.dateStr }]);
    }
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const modificarEvento = (id: string) => {
    const eventoSelect = events.find((event) => event.id === id);
    const title = prompt('Modificar evento:', eventoSelect?.title);
    if (title) {
      const updatedEvents = events.map((event) => (event.id === id ? { ...event, title } : event));
      setEvents(updatedEvents);
    }
  };

  return (
    <section className="h-screen xl:h-auto overflow-x-clip relative">
      <Header containerStyles="bg-primary fixed top-0 left-0 right-0 z-[60]" />
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 h-full mt-20">
        {/* Left Column */}
        <aside className="col-span-1 p-4 hidden md:flex">
          <div className="flex flex-col h-full w-full">
            <div className="flex flex-col justify-center border-b border-gray">
              <h2 className="font-semibold tracking-[-0.5px] leading-none">Categorías seguidas</h2>
              <div className="flex flex-col p-2 gap-y-2">
                <p>Perfil</p>
                <p>Configuración</p>
                <p>Cerrar sesión</p>
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
              </div>
              <div className="p-2">
                <p>Descubrir más</p>
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
                        <button
                          onClick={() => deleteEvent(activity.id)}
                          className="bg-gray-50 w-8 h-8 rounded-full"
                        ></button>
                        <p>{activity.title}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2">
                    <p>Descubrir más</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>

        {/* Main Column */}
        <main className="col-span-1 container mx-auto flex justify-center flex-1 my-4">
          <div className="flex flex-col h-full mx-4 md:mx-0 md:w-[900px]">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              /* eventClick={handleEventClick} */
              dateClick={handleDateClick}
              editable={true} // Permite mover eventos
              eventDrop={(info) => {
                // Actualiza la fecha del evento al ser movido
                const updatedEvents = events.map((event) =>
                  event.id === info.event.id ? { ...event, date: info.event.startStr } : event,
                );
                setEvents(updatedEvents);
              }}
              eventContent={(eventInfo) => (
                <div className="flex justify-between items-center">
                  <span>{eventInfo.event.title}</span>
                  <div className="flex">
                    <button
                      onClick={() => deleteEvent(eventInfo.event.id)}
                      className="ml-2 text-blue-500"
                    >
                      ❌
                    </button>
                    <button
                      onClick={() => modificarEvento(eventInfo.event.id)}
                      className=" text-blue-500"
                    >
                      ✏️
                    </button>
                  </div>
                </div>
              )}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek,dayGridDay',
              }}
            />
          </div>
        </main>
      </div>
    </section>
  );
};

export default Calendar;
