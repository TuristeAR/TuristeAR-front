import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { io } from 'socket.io-client';
import Lottie from 'lottie-react';
import logoAnimado from '../../assets/logoAnimado.json';

import { get } from '../../utilities/http.util';
import Events from '../../components/ItineraryCalendar/Events';
import Swal from 'sweetalert2';

export const Calendar = ({
  onEventClick,
  activities,
  setActivities,
  deleteActivity,
  events,
  setEvents,
  itineraryId,
  itinerary,
}) => {
  const [initialDate, setInitialDate] = useState(null);

  const [loading, setLoading] = useState(true);

  const formattedActivities = activities.map((activity) => ({
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

  const formattedEvents = events.map((event) => ({
    id: String(event.id),
    title: event.name,
    start: new Date(event.fromDate),
    end: new Date(event.toDate),
    locality: event.locality,
    description: event.description,
    image: event.image,
  }));

  const combinedEvents = [
    ...formattedActivities.map((activity) => ({
      ...activity,
      type: 'activity',
    })),
    ...formattedEvents.map((event) => ({
      ...event,
      type: 'event',
    })),
  ];

  useEffect(() => {
    const socket = io('https://api-turistear.koyeb.app');

    socket.on('activityUpdated', (data) => {
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity.id == data.activityId
            ? { ...activity, fromDate: data.start, toDate: data.end }
            : activity,
        ),
      );
    });

    if (activities.length > 0) {
      const calculatedDate = new Date(activities[0].fromDate.substring(0, 10))
        .toISOString()
        .split('T')[0];
      setInitialDate(calculatedDate);
    }

    setTimeout(() => setLoading(false), 3000);

    return () => {
      socket.off('activityUpdated');
    };
  }, [activities]);

  const updateActivityInBackend = async (activityId: number, start: Date, end: Date) => {
    try {
      await fetch('https://api-turistear.koyeb.app/itinerary/update-activity', {
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
    } catch (error) {
      console.error('Error al actualizar la actividad:', error);
    }
  };
  const [eventsAdd, setEventsAdd] = useState<any[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);

  useEffect(() => {
    activities.forEach((activity) => {
      fetchEvents(activity.place.province.id).then((data) => {
        setEventsAdd(data.data);
      });
    });
  }, [itinerary]);

  const fetchEvents = async (provinceId: number) => {
    return await get(`https://api-turistear.koyeb.app/events/${provinceId}`, {
      'Content-Type': 'application/json',
    });
  };

  const addEventToItinerary = async (itineraryId, eventId) => {
    try {
      const response = await fetch('http://localhost:3001/itinerary/add-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itineraryId, eventId }),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Evento agregado',
          text: 'Se agregó con éxito el evento.',
        });
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleEventSelect = (id: number) => {
    setSelectedEvents((prevSelectedEvents) => {
      const isSelected = prevSelectedEvents.includes(id);
      const newEvent = eventsAdd.find((event) => event.id === id);

      const isEventAlreadyAdded = events.some((event) => event.id === newEvent.id);
      if (isEventAlreadyAdded) {
        Swal.fire({
          icon: 'info',
          title: 'Notificación',
          text: 'Este evento ya está agregado.',
        });
        return prevSelectedEvents; // No hacer nada si ya está agregado
      }

      const updatedSelectedEvents = isSelected
        ? prevSelectedEvents.filter((eventId) => eventId !== id)
        : [...prevSelectedEvents, id];

      setEvents((prevEvents) => {
        if (newEvent && Object.keys(newEvent).length > 0) {
          const itineraryStartDate = new Date(itinerary.fromDate).getTime();
          const itineraryEndDate = new Date(itinerary.toDate).getTime();
          const eventStartDate = new Date(newEvent.fromDate).getTime();
          const eventEndDate = new Date(newEvent.toDate).getTime();

          if (eventStartDate < itineraryStartDate || eventEndDate > itineraryEndDate) {
            Swal.fire({
              icon: 'warning',
              title: 'Advertencia',
              text: 'No puedes agregar este evento porque está fuera del rango de tu viaje.',
            });
            return prevEvents;
          } else {
            addEventToItinerary(itineraryId, newEvent.id);
            return [...prevEvents, newEvent];
          }
        }
        return prevEvents;
      });
      return updatedSelectedEvents;
    });
  };

  return (
    <>
      {loading ? (
        <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
      ) : (
        <div className="w-full p-4 bg-white rounded-lg shadow-md">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialDate={initialDate}
            locale={esLocale}
            events={combinedEvents}
            eventClick={({ event }) => onEventClick(event)}
            editable={true}
            eventDrop={(info) => {
              const { event } = info;

              if (event.extendedProps.type === 'activity') {
                const updatedActivities = activities.map((activity) => {
                  if (activity.id == event.id) {
                    const updatedActivity = {
                      ...activity,
                      fromDate: event.start.toISOString(),
                      toDate: event.end ? event.end.toISOString() : activity.toDate,
                    };

                    updateActivityInBackend(
                      activity.id,
                      event.start,
                      event.end ? event.end : new Date(activity.toDate),
                    );

                    return updatedActivity;
                  }
                  return activity;
                });
                setActivities(updatedActivities);
              } else {
                info.revert();
              }
            }}
            eventContent={(eventInfo) => {
              const isActivity = eventInfo.event.extendedProps.type === 'activity';

              return (
                <div className="flex flex-col w-full ">
                  {isActivity && (
                    <p
                      className="text-[10px] md:text-[13px] w-[70px] my-2
            isActivity ? 'text-white bg-primary text-white px-2 mx-1 rounded-md"
                    >
                      {eventInfo.event.start
                        ? new Date(eventInfo.event.start)
                            .toLocaleTimeString([], {
                              hour: '2-digit',
                              minute:
                                new Date(eventInfo.event.start).getMinutes() === 0
                                  ? undefined
                                  : '2-digit',
                              hour12: false,
                            })
                            .replace(':00', '') + ' hs'
                        : ''}
                    </p>
                  )}
                  <p
                    className={`flex items-center text-[8px] md:text-[12px] mx-1 p-1 font-semibold md:h-12 hover:bg-opacity-80 cursor-pointer rounded-md ${
                      isActivity ? 'bg-primary-3 text-white' : 'bg-orange text-black my-1.5'
                    }`}
                  >
                    {eventInfo.event.title.replace(/ - \d{1,2} \w+\./, '')}
                  </p>
                </div>
              );
            }}
            headerToolbar={{
              ...(window.innerWidth > 768 && {
                right: 'dayGridMonth,dayGridWeek,dayGridDay',
                left: 'prev,next',
                center: 'title',
              }),
            }}
          />
          <Events
            events={eventsAdd}
            selectedEvents={selectedEvents}
            onEventSelect={handleEventSelect}
          />
        </div>
      )}
    </>
  );
};
