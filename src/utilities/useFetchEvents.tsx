import { useCallback } from 'react';

const useFetchEvents = () => {
  const fetchEvents = useCallback(async (provinceId: number) => {
    const response = await fetch(`https://api-turistear.koyeb.app/events/${provinceId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      throw new Error('Error fetching events');
    }
    
    return response.json();
  }, []);

  return fetchEvents;
};

export default useFetchEvents;
