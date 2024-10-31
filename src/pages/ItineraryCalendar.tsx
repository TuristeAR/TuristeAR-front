import { Calendar } from '../components/Calendar/Calendar';
import { Header } from '../components/Header/Header';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetchItinerary from '../utilities/useFetchItinerary';
import { LeftColumn } from '../components/ItineraryCalendar/LeftColumn';
import { ModalActivity } from '../components/Calendar/ModalEvent';
import { io } from 'socket.io-client';

export const ItineraryCalendar = () => {
  const { itineraryId } = useParams();
  const { itinerary, activities, events, setActivities, setEvents } = useFetchItinerary(
    itineraryId || null,
  );
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [selectedEventInfo, setSelectedEventInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShowExpanse, setIsShowExpanse] = useState(false);

  const socket = io('https://api-turistear.koyeb.app');

  const handleEventClick = (eventInfo) => {
    setSelectedEventInfo(eventInfo);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setSelectedEventInfo(null);
    setIsModalOpen(false);
  };
  useEffect(() => {
    socket.on('activityRemoved', ({ itineraryId, activityId }) => {
      console.log(`Activity with ID ${activityId} removed from itinerary ${itineraryId}`);
    });

    return () => {
      socket.off('activityRemoved');
    };
  }, []);

  const deleteActivity = (activityId: number) => {
    fetch('https://api-turistear.koyeb.app/itinerary/remove-activity', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itineraryId: itineraryId, activityId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setActivities((prevActivities) =>
            prevActivities.filter((activity) => activity.id !== activityId),
          );
          setIsModalOpen(false);
        } else {
          console.error('Error al eliminar la actividad:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error al eliminar la actividad:', error);
      });
  };

  return (
    <section
      className={`${isAddingActivity ? 'h-screen overflow-hidden' : ''} h-screen xl:h-auto overflow-x-clip relative`}
    >
      <Header containerStyles="fixed top-0 left-0 right-0 z-[60]" />
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-4 h-full mt-20 py-4">
        <LeftColumn
          itinerary={itinerary}
          itineraryId={itineraryId}
          isAddingActivity={isAddingActivity}
          setIsAddingActivity={setIsAddingActivity}
          activities={activities}
          setActivities={setActivities}
          isShowExpanse={isShowExpanse}
          setIsShowExpanse={setIsShowExpanse}
        />
        <main className="order-1 lg:order-2 col-span-1 container mx-auto">
          <div className="flex flex-col h-full mx-4 mb-4 md:mx-0 md:w-full md:p-4">
            <Calendar
              onEventClick={handleEventClick}
              activities={activities}
              setActivities={setActivities}
              deleteActivity={deleteActivity}
              events={events}
            />
            {isModalOpen && selectedEventInfo && (
              <ModalActivity
                handleClose={handleClose}
                deleteActivity={deleteActivity}
                eventInfo={selectedEventInfo}
              />
            )}
          </div>
        </main>
      </div>
    </section>
  );
};
