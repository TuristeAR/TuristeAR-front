import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import Swal from 'sweetalert2';

const EVENT_ADD_ACTIVITY = 'addActivity';

const useAddActivities = (itineraryId, setActivities, itinerary) => {
  const socket = io(process.env.VITE_API_URL);
  const [newActivity, setNewActivity] = useState({ name: '', fromDate: '', toDate: '', place: '' });

  const validateDates = () => {
    const itineraryStartDate = new Date(itinerary.fromDate).getTime();
    const itineraryEndDate = new Date(itinerary.toDate).getTime();
    const eventStartDate = new Date(newActivity.fromDate).getTime();
    const eventEndDate = new Date(newActivity.toDate).getTime();

    if (eventStartDate < itineraryStartDate || eventEndDate > itineraryEndDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'No puedes agregar este evento porque está fuera del rango de tu viaje.',
      });
      return false;
    }

    return true;
  };

  const handleAddActivity = () => {
    if (validateDates()) {
      fetch(`${process.env.VITE_API_URL}/itinerary/add-activity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itineraryId, createActivityDto: newActivity }),
      }).catch((error) => {
        console.error('Error add activity:', error);
      });
    }
  };

  const handleSocketAddActivity = useCallback(
    ({ itinerary }) => {
      const activitiesList = itinerary?.activities || [];
      const lastActivity = activitiesList[activitiesList.length - 1];
      if (lastActivity) {
        setActivities((prevActivities) => [...prevActivities, lastActivity]);
        Swal.fire({
          icon: 'success',
          title: 'Actividad agregada',
          text: 'La actividad se ha agregado exitosamente al itinerario.',
        });
      }
    },
    [setActivities],
  );

  useEffect(() => {
    socket.on(EVENT_ADD_ACTIVITY, handleSocketAddActivity);
    return () => {
      socket.off(EVENT_ADD_ACTIVITY, handleSocketAddActivity);
    };
  }, [handleSocketAddActivity]);

  return { handleAddActivity, newActivity, setNewActivity };
};

export default useAddActivities;
