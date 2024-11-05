import { useState, useEffect } from 'react';
type User={
  id: number;
  name: string,
  profilePicture: string,
  description: string,
  birthdate: string,
  coverPicture: string,
  location: string
}

type Itinerary = {
  id: number;
  createdAt: string;
  name: string;
  fromDate: string;
  toDate: string;
  user: User | null;
};

const useFetchItinerary = (itineraryId: string | null) => {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  const [activities, setActivities] = useState<
    {
      fromDate: string | number | Date;
      place: any;
      id: number;
      name: string;
      images: string[];
    }[]
  >([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const response = await fetch(`https://api-turistear.koyeb.app/itinerary/${itineraryId}`);
        const data = await response.json();

        setItinerary(data.data.itinerary || null);
        setActivities(data.data.itinerary.activities || []);
        setEvents(data.data.itinerary.events || []);
      } catch (error) {
        console.error('Error fetching itinerary:', error);
      }
    };

    if (itineraryId) {
      fetchItinerary();
    }
  }, [itineraryId]);

  return { itinerary, activities, events, setActivities, setItinerary, setEvents };
};

export default useFetchItinerary;
