import { useState, useEffect } from 'react';

const useFetchItinerary = (itineraryId: string | null) => {
  const [itinerary, setItinerary] = useState(null);
  const [activities, setActivities] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch(`https://api-turistear.koyeb.app/itinerary/${itineraryId}`);
        const data = await response.json();
        setItinerary(data.data.itinerary || null);
        setActivities(data.data.activities?.activities || []);
      } catch (error) {
        console.error('Error fetching itinerary:', error);
      }
    };

    if (itineraryId) {
      fetchItinerary();
    }
  }, [itineraryId]);

  return { itinerary, activities, setActivities, setItinerary };
};

export default useFetchItinerary;
