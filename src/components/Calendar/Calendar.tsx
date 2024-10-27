import { useEffect, useState } from 'react';

/* Full Calendar */
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
/* import { AddActivityCalendar } from './AddEventCalendar';
 */ import { ModalActivity } from './ModalEvent';

export const Calendar = ({
  activities,
  setActivities,
  deleteActivity,
}: {
  activities: any;
  setActivities: any;
  deleteActivity: any;
}) => {
  console.log(activities);
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
    start: new Date(activity.fromDate),
    end: new Date(activity.toDate),
    googleId: activity.place.googleId,
    phoneNumber: activity.place.phoneNumber,
    address: activity.place.address,
    rating: activity.place.rating,
    hours: activity.place.openingHours ? activity.place.openingHours : [],
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
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
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
            <div className="flex justify-center items-center gap-x-2 overflow-hidden">
              <span className="hidden md:block text-[10px] md:text-xs text-gray-500 bg-primary text-white px-2 rounded-3xl">
                {eventInfo.event.start
                  ? new Date(eventInfo.event.start).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : ''}
              </span>
              <span className="text-[7px] md:text-xs font-semibold truncate max-w-[80px]">
                {eventInfo.event.title.replace(/ - \d{1,2} \w+\./, '')}
              </span>

              {selectedEvent === eventInfo.event.id && (
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
          ...(window.innerWidth > 768 && {
            right: 'dayGridMonth,dayGridWeek,dayGridDay',
            left: 'prev,next',
            center: 'title',
          }),
        }}
      />
    </div>
  );
};
