import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Activity {
  id: number;
  name: string;
  fromDate: string;
  toDate:string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  fromDate: string;
  toDate: string;
}

export const useItineraryEvents = (initialItinerary?: any) => {
  const location = useLocation();
  const [itinerary, setItinerary] = useState(initialItinerary || location.state?.itinerary); // Obtener el itinerario del prop o del estado
  const [events, setEvents] = useState<Event[]>([]); // Estado con tipo Event[]

  useEffect(() => {
    if (itinerary && Array.isArray(itinerary.activities)) {
      const newEvents = itinerary.activities.map((activity: Activity) => ({
        id: activity.id,
        date: activity.fromDate,
        title: activity.name,
        fromDate: activity.fromDate,
        toDate: activity.toDate,
      }));
      setEvents(newEvents); // Actualizar el estado con las nuevas actividades como eventos
    }
  }, [itinerary]);

  return { itinerary, events, setEvents }; // Retornar el itinerario y los eventos generados
};
