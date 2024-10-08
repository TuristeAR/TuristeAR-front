import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es'; 

import {  useEffect } from 'react';

export const Calendar = ({ setEvents, events }: { setEvents: any; events: any }) => {
  useEffect(() => {
    console.log(events);
  }, [events]);
  
  const handleDateClick = (arg: { dateStr: any }) => {
    const title = prompt('Introduce el título del nuevo evento:');
    if (title) {
      setEvents([...events, { id: String(events.length + 1), title, date: arg.dateStr }]);
    }
  };

  const deleteEvent = (id: string) => {
    setEvents(events.filter((event: any) => event.id !== id));
  };

  const modifyEvento = (id: string) => {
    const eventoSelect = events.find((event: any) => event.id === id);
    const title = prompt('Modificar evento:', eventoSelect?.title);
    if (title) {
      const updatedEvents = events.map((event: any) =>
        event.id === id ? { ...event, title } : event,
      );
      setEvents(updatedEvents);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale={esLocale}
      events={events}
      dateClick={handleDateClick}
      editable={true}
      eventDrop={(info) => {
        const updatedEvents = events.map((event: any) =>
          event.id === info.event.id ? { ...event, date: info.event.startStr } : event,
        );
        setEvents(updatedEvents);
      }}
      eventContent={(eventInfo) => (
        <div className="flex flex-col overflow-hidden">
          <span className='text-[11px] font-semibold truncate]'>{eventInfo.event.title}</span>
          <div className="flex space-x-1 mt-1">
            <button onClick={() => deleteEvent(eventInfo.event.id)} className="ml-2 text-blue-500">
              ❌
            </button>
            <button onClick={() => modifyEvento(eventInfo.event.id)} className=" text-blue-500">
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
  );
};

