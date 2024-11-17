import { useEffect, useState } from 'react';

const useFetchPlacesByProvince = (itinerary) => {
  const [activityByProvince, setActivityByProvince] = useState([]);

  useEffect(() => {
    const fetchPlacesByProvince = async () => {
      try {
        if (itinerary) {
          const province = itinerary.activities[0].place.province.name;
          const response = await fetch(
            `${process.env.VITE_API_URL}/fetch-activities-places/${province}`,
            { method: 'GET', credentials: 'include' },
          );

          if (response.ok) {
            const data = await response.json();
            setActivityByProvince(data.status === 'success' ? data.data : []);
          }
        }
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlacesByProvince();
  }, [itinerary]);

  return activityByProvince;
};
export default useFetchPlacesByProvince;
