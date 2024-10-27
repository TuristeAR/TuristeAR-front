/* Icons */
import plusIcon from '/assets/add.svg';
import chatIcon from '/assets/chat.svg';
import galleryIcon from '/assets/gallery.svg';
import alignIcon from '/assets/align.svg';
import deleteIcon from '/assets/delete.svg';

/* Components */
import { Calendar } from '../components/Calendar/Calendar';
import { Header } from '../components/Header/Header';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import useFetchItinerary from '../utilities/useFetchItinerary';
import { LeftColumn } from '../components/ItineraryCalendar/LeftColumn';

export const ItineraryCalendar = () => {
  const { itineraryId } = useParams();
  const { itinerary, activities, setActivities } = useFetchItinerary(itineraryId || null);

  const [isAddingActivity, setIsAddingActivity] = useState(false);

  const deleteActivity = (activityId: number) => {
    fetch('https://api-turistear.koyeb.app/itinerary/remove-activity', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ itineraryId: itineraryId, activityId }), // Asegúrate de usar el itineraryId correcto
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          setActivities((prevActivities) =>
            prevActivities.filter((activity) => activity.id !== activityId),
          );
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
        {/* Left Column */}
        <LeftColumn
          itinerary={itinerary}
          itineraryId={itineraryId}
          isAddingActivity={isAddingActivity}
          setIsAddingActivity={setIsAddingActivity}
          activities={activities}
          setActivities={setActivities}
        />

        {/* Main Column */}
        <main className="order-1 lg:order-2 col-span-1 container mx-auto">
          <div className="flex flex-col h-full mx-4 mb-4 md:mx-0 md:w-full md:p-4">
            <Calendar
              activities={activities}
              setActivities={setActivities}
              deleteActivity={deleteActivity}
            />
          </div>
        </main>
      </div>
    </section>
  );
};
