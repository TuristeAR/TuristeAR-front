import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';

const EVENT_ADD_ACTIVITY = 'addActivity';

const useAddActivities = (itineraryId, setActivities) => {
  const socket = io(process.env.VITE_API_URL);
  const [newActivity, setNewActivity] = useState({ name: '', fromDate: '', toDate: '', place: '' });

  const handleAddActivity = () => {
    fetch(`${process.env.VITE_API_URL}/itinerary/add-activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itineraryId, createActivityDto: newActivity }),
    }).catch((error) => {
      console.error('Error add activity:', error);
    });
  };

  const handleSocketAddActivity = useCallback(
    ({ itinerary }) => {
      const activitiesList = itinerary?.activities || [];
      const lastActivity = activitiesList[activitiesList.length - 1];
      if (lastActivity) {
        setActivities((prevActivities) => [...prevActivities, lastActivity]);
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
