import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  profilePicture: string;
  description: string;
  birthdate: string;
  coverPicture: string;
  location: string;
};

export const UseFetchSession = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionResponse = await fetch('https://api-turistear.koyeb.app/session', {
        method: 'GET',
        credentials: 'include',
      });

      if (!sessionResponse.ok) {
        window.location.href = '/login';
        return;
      }

      const sessionData = await sessionResponse.json();
      setUser(sessionData.user);
    }
    fetchSession();
  })

  return {user}
}