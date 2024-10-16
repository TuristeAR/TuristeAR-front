import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../../utilities/http.util';

export const NavMobile = () => {
  const [user, setUser] = useState<{ name: string; profilePicture: string } | null>(null);

  const fetchUser = async () => {
    const response = await get('https://api-turistear.koyeb.app/session', {
      'Content-Type': 'application/json',
    });

    if (response.statusCode === 200) {
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
    } else {
      localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    const cachedUser = localStorage.getItem('user');
    setUser(cachedUser ? JSON.parse(cachedUser) : null);
    fetchUser();
  }, []);

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
