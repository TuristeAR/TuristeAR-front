import { useEffect } from 'react';

/* Full Calendar */
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { io } from 'socket.io-client';

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
    const socket = io('https://api-turistear.koyeb.app');
    socket.on('activityUpdated', (data) => {
      console.log('Activity updated socket:', data);
      
      // Actualiza el estado de las actividades en función de los datos recibidos
      setActivities((prevActivities) => 
        prevActivities.map((activity) =>
          activity.id == data.activityId
            ? { ...activity, fromDate: data.start, toDate: data.end }
            : activity
        )
      );
    });

    // Limpiar el socket al desmontar el componente
    return () => {
      socket.off('activityUpdated');
    };
  }, []);

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

  const updateActivityInBackend = async (activityId: number, start: Date, end: Date) => {
    try {
      const response = await fetch('https://api-turistear.koyeb.app/itinerary/update-activity', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityId,
          start: start.toISOString(),
          end: end.toISOString(),
        }),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar la actividad en el backend');
      }
      const data = await response.json();
      console.log(data.message); // Mensaje de éxito del backend
    } catch (error) {
      console.error('Error al actualizar la actividad:', error);
    }
  };
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
          const { event } = info;
        
          // Actualizamos la actividad correspondiente en el estado
          const updatedEvents = activities.map((activity) => {
            if (activity.id == event.id) {
              const updatedActivity = {
                ...activity,
                fromDate: event.start.toISOString(), // Nueva fecha de inicio
                toDate: event.end ? event.end.toISOString() : activity.toDate, // Nueva fecha de fin si existe, si no se mantiene la actual
              };
        
              // Llamar a la función para actualizar en el backend
              updateActivityInBackend(activity.id, event.start, event.end ? event.end : new Date(activity.toDate));
        
              return updatedActivity;
            }
            return activity;
          });
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
