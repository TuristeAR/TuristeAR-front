import { useEffect, useState } from 'react';
type User = {
  id: number;
  email: string;
  name: string;
  profilePicture: string;
};
const useFetchParticipants = (itineraryId: any) => {
  const [usersOldNav, setUsersOldNav] = useState<User[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(
          `https://api-turistear.koyeb.app/itinerary/participants/${itineraryId}`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );
        if (response.ok) {
          const data = await response.json();
          const owner = { ...data.itineraryParticipants.user, isOwner: true };
          setUsersOldNav([owner, ...data.itineraryParticipants.participants]);
        } else setUsersOldNav([]);
      } catch (error) {
        console.error('Error fetching data:', error);
        setUsersOldNav([]);
      }
    };

    fetchParticipants();
  }, [itineraryId]);

  return { usersOldNav, setUsersOldNav };
};

export default useFetchParticipants;
