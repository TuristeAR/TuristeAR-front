import { useEffect, useState } from 'react';

/* Full Calendar */
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { AddActivityCalendar } from './AddEventCalendar';
import { ModalActivity } from './ModalEvent';

export const Calendar = ({
  activities,
  setActivities,
}: {
  activities: any;
  setActivities: any;
}) => {
  const [openNewEvent, setOpenNewEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');
  const [eventName, setEventName] = useState('');

  const handleDateClick = (arg: { dateStr: string }) => {
    setSelectedDate(arg.dateStr); // Guardar la fecha seleccionada
    setOpenNewEvent(true);
  };

  const handleEventClick = (info: any) => {
    setSelectedDate(info.event);
    setSelectedEvent(true);
  };

  const handleClose = () => {
    setOpenNewEvent(false);
    setSelectedEvent(false);
  };

  const handleSave = () => {
    if (eventName) {
      const newId = String(Date.now());
      setActivities([
        ...activities,
        { id: newId, name: eventName, fromDate: selectedDate, toDate: selectedDate },
      ]);
      setOpenNewEvent(false);
      setEventName('');
    }
  };

  const deleteEvent = (id: number) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      console.log('Actividades antes:', activities);

      const updatedEvents = activities.filter((event: any) => event.id !== id);
      setActivities(updatedEvents);
      console.log('Actividades después:', updatedEvents);
    }
    setSelectedEvent(false);
  };

  const editEvent = (id: number, newName: string) => {
    const updatedEvents = activities.map((event: any) =>
      event.id === id ? { ...event, name: newName } : event,
    );
    setActivities(updatedEvents);
  };

  // Formatear actividades para FullCalendar
  const formattedActivities = activities.map((activity: any) => ({
    id: String(activity.id),
    title: activity.name,
    date: activity.fromDate.substring(0, 10),
  }));

  useEffect(() => {
    const calendarRows = document.querySelectorAll('.fc-daygrid-body tr');

    calendarRows.forEach((row) => {
      const daysInRow = row.querySelectorAll('.fc-daygrid-day');
      let allDaysOutOfMonth = true;

      daysInRow.forEach((day) => {
        if (!day.classList.contains('fc-day-other')) {
          allDaysOutOfMonth = false;
        }
      });

      if (allDaysOutOfMonth) {
        (row as HTMLElement).style.display = 'none';
      }
    });
  }, []);

  

  return (
    <div className='relative'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        events={formattedActivities}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        editable={true}
        eventDrop={(info) => {
          const updatedEvents = activities.map((event: any) =>
            event.id === info.event.id ? { ...event, date: info.event.startStr } : event,
          );
          setActivities(updatedEvents);
        }}
        eventContent={(eventInfo) => (
          <>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[11px] md:text-sm font-semibold whitespace-normal break-words">
                {eventInfo.event.title.replace(/ - \d{1,2} \w+\./, '')}
              </span>
              {selectedEvent && (
                <ModalActivity
                  handleClose={handleClose}
                  editEvent={editEvent}
                  deleteEvent={deleteEvent}
                  eventInfo={eventInfo}
                />
              )}
            </div>
          </>
        )}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
      />
      {openNewEvent && (
        <AddActivityCalendar
          eventName={eventName}
          setEventName={setEventName}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};
