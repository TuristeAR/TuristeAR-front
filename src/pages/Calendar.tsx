import { Header } from '../components/Header';
import FullCalendar from '@fullcalendar/react';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';

const Calendar = () => {
  const [events, setEvents] = useState([
    { id: '1', title: 'Evento 1', date: '2024-09-01' },
    { id: '2', title: 'Evento 2', date: '2024-09-05' },
  ]);

  const handleEventClick = (info: { event: { title: any; id: string } }) => {
    const confirmed = window.confirm(`¿Quieres borrar el evento: ${info.event.title}?`);
    if (confirmed) {
      setEvents(events.filter((event) => event.id !== info.event.id));
    }
  };

  const handleDateClick = (arg: { dateStr: any; }) => {
    const title = prompt('Introduce el título del nuevo evento:');
    if (title) {
      setEvents([...events, { id: String(events.length + 1), title, date: arg.dateStr }]);
    }
  };
  return (
    <section className="h-screen xl:h-[1600px] overflow-x-clip relative">
      <Header containerStyles="bg-primary fixed top-0 left-0 right-0 z-[60]" />
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 h-full mt-20">
        {/* Left Column */}
        <aside className="col-span-1 p-4 hidden md:flex">
          <div className="flex flex-col h-full">
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
              <h2 className="font-semibold tracking-[-0.5px] leading-none">Eliminar actividades</h2>
              <div className="w-full flex flex-col gap-2 mb-2">
                {['Museo de las bellas artes', 'Teatro Colón', 'Tour por Palermo'].map(
                  (activity) => (
                    <div key={activity} className="flex items-center w-full gap-2">
                      <div className="bg-gray-50 w-8 h-8 rounded-full"></div>
                      <p>{activity}</p>
                    </div>
                  ),
                )}
              </div>
              <div className="p-2">
                <p>Descubrir más</p>
              </div>
            </div>
          </div>
        </aside>
        <main className="col-span-1 container mx-auto flex justify-center flex-1">
          <div className="flex flex-col h-full mx-4 md:mx-0 md:w-[700px]">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={events}
              eventClick={handleEventClick}
              dateClick={handleDateClick}
              editable={true} // Permite mover eventos
              eventDrop={(info) => {
                // Actualiza la fecha del evento al ser movido
                const updatedEvents = events.map((event) =>
                  event.id === info.event.id ? { ...event, date: info.event.startStr } : event,
                );
                setEvents(updatedEvents);
              }}
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
