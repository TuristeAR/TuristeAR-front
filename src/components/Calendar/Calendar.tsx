import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';

export const Calendar = ({
  activities,
  setActivities,
}: {
  activities: any;
  setActivities: any;
}) => {
  const handleDateClick = (arg: { dateStr: string }) => {
    const name = prompt('Introduce el título del nuevo evento:');
    if (name) {
      const newId = String(Date.now());
      setActivities([
        ...activities,
        { id: newId, name, fromDate: arg.dateStr, toDate: arg.dateStr },
      ]);
    }
  };

  const deleteEvent = (id: string) => {
    setActivities(activities.filter((event: any) => event.id !== id));
  };

  const modifyEvento = (id: string) => {
    const eventoSelect = activities.find((event: any) => event.id === id);
    const name = prompt('Modificar evento:', eventoSelect?.name);
    if (name) {
      const updatedEvents = activities.map((event: any) =>
        event.id === id ? { ...event, name } : event,
      );
      setActivities(updatedEvents);
    }
  };

  // Formatear actividades para FullCalendar
  const formattedActivities = activities.map((activity: any) => ({
    id: String(activity.id),
    title: activity.name,
    date: activity.fromDate.substring(0, 10),
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale={esLocale}
      events={formattedActivities}
      dateClick={handleDateClick}
      editable={true}
      eventDrop={(info) => {
        const updatedEvents = activities.map((event: any) =>
          event.id === info.event.id ? { ...event, date: info.event.startStr } : event,
        );
        setActivities(updatedEvents);
      }}
      eventContent={(eventInfo) => (
        <div className="flex flex-col overflow-hidden">
          <span className="text-[11px] font-semibold truncate]">{eventInfo.event.title}</span>
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
