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
  const [loading, setLoading] = useState<boolean>(true); // Control de estado de carga
  const [error, setError] = useState<string | null>(null); // Control de errores

  useEffect(() => {
    let isMounted = true; // Bandera para controlar el estado del montaje del componente

    const fetchSession = async () => {
      try {
        const sessionResponse = await fetch('https://api-turistear.koyeb.app/session', {
          method: 'GET',
          credentials: 'include',
        });

        if (!sessionResponse.ok) {
          // Redirigir solo después de manejar el error
          if (isMounted) {
            setError('No se pudo obtener la sesión. Redirigiendo...');
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000); // Tiempo para que el usuario vea el mensaje
          }
          return;
        }

        const sessionData = await sessionResponse.json();
        if (isMounted) {
          setUser(sessionData.user);
          setError(null); // Resetea el error si la llamada es exitosa
        }
      } catch (e) {
        if (isMounted) {
          setError('Ocurrió un error al obtener la sesión.');
        }
      } finally {
        if (isMounted) {
          setLoading(false); // Desactiva la carga
        }
      }
    };

    fetchSession();

    return () => {
      isMounted = false; // Limpieza para evitar actualizaciones en componentes desmontados
    };
  }, []);

  return { user, loading, error };
};
