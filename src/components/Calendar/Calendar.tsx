import { useEffect } from 'react';

/* Full Calendar */
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

export const Calendar = ({
  onEventClick,
  activities,
  setActivities,
  deleteActivity,
}: {
  onEventClick: any;
  activities: any;
  setActivities: any;
  deleteActivity: any;
}) => {
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
        eventClick={({ event }) => onEventClick(event)}
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
