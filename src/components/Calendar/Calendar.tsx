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
  deleteActivity,
}: {
  activities: any;
  setActivities: any;
  deleteActivity: any;
}) => {
  const [openNewEvent, setOpenNewEvent] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // Cambia a null en lugar de false

  const [selectedDate, setSelectedDate] = useState('');
  const [eventName, setEventName] = useState('');

  const handleDateClick = (arg: { dateStr: string }) => {
    setSelectedDate(arg.dateStr); // Guardar la fecha seleccionada
    setOpenNewEvent(true);
  };

  const handleEventClick = (info: any) => {
    setSelectedDate(info.event);
    setSelectedEvent(info.event.id);
  };

  const handleClose = () => {
    setOpenNewEvent(false);
    setSelectedEvent(null);
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
              {selectedEvent === eventInfo.event.id  && (
                <ModalActivity
                  handleClose={handleClose}
                  editEvent={editEvent}
                  deleteActivity={deleteActivity}
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
