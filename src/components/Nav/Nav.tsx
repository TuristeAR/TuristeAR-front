import { Link, useLocation } from 'react-router-dom';
import logo from '/src/assets/TuristeAR-logo.png';
import arrowRight from '/assets/arrow-right.svg';
import { useEffect, useState } from 'react';
import { get } from '../../utilities/http.util';

export const Nav = () => {
  const location = useLocation();
  const [user, setUser] = useState<{ name: string; profilePicture: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await get('https://api-turistear.koyeb.app/logout', {
        'Content-Type': 'application/json',
      });
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  useEffect(() => {
    const cachedUser = localStorage.getItem('user');

    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    } else {
      const fetchUser = async () => {
        const response = await get('https://api-turistear.koyeb.app/session', {
          'Content-Type': 'application/json',
        });

        if (response.statusCode === 200) {
          localStorage.setItem('user', JSON.stringify(response.user));
          setUser(response.user);
        }
      };

      fetchUser();
    }
  }, []);

  return (
    <>
      <Link to={'/'} className="flex title-font font-medium items-center md:mb-0">
        <img src={logo} alt="Logo" className="h-14" />
      </Link>
      <nav className="hidden mt-auto mb-0 text-white md:block md:ml-auto md:mr-auto text-lg font-semibold">
        <Link
          to={'/destinations'}
          className={`mr-5 hover:text-gray-900 hover:text-hover cursor-pointer px-3 pt-1 pb-2.5 rounded-sm ${
            location.pathname === '/destinations' ? 'bg-white text-black' : ''
          }`}
        >
          Destinos
        </Link>
        <Link
          to={'/community'}
          className={`mr-5 hover:text-gray-900 hover:text-hover cursor-pointer px-3 pt-1 pb-2.5 rounded-sm ${
            location.pathname === '/community' ? 'bg-white text-black' : ''
          }`}
        >
          Comunidad
        </Link>
        <Link
          to={'/formQuestions'}
          className={`hover:text-gray-900 hover:text-hover cursor-pointer px-3 pt-1 pb-2.5  rounded-sm ${
            location.pathname === '/formQuestions' ? 'bg-white text-black ' : ''
          }`}
        >
          Armá tu viaje
        </Link>
        <div></div>
      </nav>
      {!user ? (
        <Link
          to={'/login'}
          className="hidden md:flex justify-center items-center text-white text-lg mt-4 md:mt-auto md:mb-0 gap-x-2 hover:text-hover font-semibold"
        >
          <p>Iniciá sesión</p>
          <img src={arrowRight} alt="Arrow Right" className="hidden md:block w-6 h-6 " />
        </Link>
      ) : (
        <div className="hidden mt-auto md:flex items-center gap-x-4">
          <img
            src={user.profilePicture}
            className="w-[3em] h-[3em] border-2 mt-4 md:mt-auto md:mb-0 border-white rounded-full cursor-pointer"
            alt="Foto de perfil"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          <h2 className="text-white font-bold text-[16px]">{user.name}</h2>
          {isDropdownOpen && (
            <div className="absolute top-[4em] right-8 bg-white shadow-lg rounded-md py-2 w-40 z-50">
              <button
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 z-50"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
