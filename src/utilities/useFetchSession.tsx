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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSession = async () => {
      try {
        const sessionResponse = await fetch(`${process.env.VITE_API_URL}/session`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!sessionResponse.ok) {
          if (isMounted) {
            setError('No se pudo obtener la sesión. Redirigiendo...');
            setTimeout(() => {
              window.location.href = '/iniciar-sesion';
            }, 2000);
          }
          return;
        }

        const sessionData = await sessionResponse.json();
        if (isMounted) {
          setUser(sessionData.user);
          setError(null);
        }
      } catch (e) {
        if (isMounted) {
          setError('Ocurrió un error al obtener la sesión.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading, error };
};
