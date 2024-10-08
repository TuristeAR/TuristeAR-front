import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const NavMobile = () => {
  const [user, setUser] = useState<{ name: string; profilePicture: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://api-turistear.koyeb.app/session', {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.log('Usuario no autenticado');
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      } finally {
      }
    };

    fetchUser();
  }, [user]);

  return (
    <nav className="bg-primary overflow-hidden my-4 rounded-lg  w-full h-[85vh]">
      <div className="container mx-auto h-full flex flex-col items-center justify-center">
        <ul className="flex flex-col gap-8 font-primary text-2xl font-semibold items-center uppercase ">
          {!user ? (
            <Link to={'/login'} className="flex justify-center items-center ">
              <p className=" text-4xl font-semibold  uppercase text-white hover:text-gray ">
                Login
              </p>
            </Link>
          ) : (
            <div className="flex items-center gap-x-4">
              <img
                src={user.profilePicture}
                className="w-14 h-14 border-2 border-white rounded-full"
                alt="Foto de perfil"
              />
              <h2 className="text-white text-2xl whitespace-nowrap">{user.name}</h2>
            </div>
          )}

          <Link to={'/destinations'} className="  text-white hover:text-gray  transition-all ">
            Destinos
          </Link>
          <Link to={'/community'} className=" text-white hover:text-gray transition-all">
            Comunidad
          </Link>
          <Link to={'/formQuestions'} className=" text-white hover:text-gray transition-all">
            Armá tu viaje
          </Link>
        </ul>
      </div>
    </nav>
  );
};
