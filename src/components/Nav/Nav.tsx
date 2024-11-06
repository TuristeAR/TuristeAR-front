import { Link, useLocation } from 'react-router-dom';
import logo from '/src/assets/TuristeAR-logo.png';
import arrowRight from '/assets/arrow-right.svg';
import { useEffect, useState } from 'react';
import { get } from '../../utilities/http.util';

type Notification={
  id: number
}

export const Nav = () => {
  const location = useLocation();
  const [user, setUser] = useState<{ name: string; profilePicture: string } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenNotification, setIsDropdownOpenNotification] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

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

  const fetchUser = async () => {
    const response = await get(' https://api-turistear.koyeb.app/session', {
      'Content-Type': 'application/json',
    });

    if (response.statusCode === 200) {
      localStorage.setItem('user', JSON.stringify(response.user));
      setUser(response.user);
    } else {
      localStorage.removeItem('user');
    }
  };

  const fetchNotifications = async () => {
    const response = await get('http://localhost:3001/notifications/byUser', {
      'Content-Type': 'application/json',
      credentials: 'include',
    });

    if (response.statusCode === 200) {
      setNotifications(response)
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
          <div className={'relative'}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={'w-[35px]'}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M19.3399 14.49L18.3399 12.83C18.1299 12.46 17.9399 11.76 17.9399 11.35V8.82C17.9399 6.47 16.5599 4.44 14.5699 3.49C14.0499 2.57 13.0899 2 11.9899 2C10.8999 2 9.91994 2.59 9.39994 3.52C7.44994 4.49 6.09994 6.5 6.09994 8.82V11.35C6.09994 11.76 5.90994 12.46 5.69994 12.82L4.68994 14.49C4.28994 15.16 4.19994 15.9 4.44994 16.58C4.68994 17.25 5.25994 17.77 5.99994 18.02C7.93994 18.68 9.97994 19 12.0199 19C14.0599 19 16.0999 18.68 18.0399 18.03C18.7399 17.8 19.2799 17.27 19.5399 16.58C19.7999 15.89 19.7299 15.13 19.3399 14.49Z"
                  fill="#009fe3"
                ></path>
                <path
                  d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z"
                  fill="#009fe3"
                ></path>
              </g>
            </svg>
            {notifications.length > 0 && (
              <div className="absolute bg-[#c0daeb] rounded-full w-[35px] h-[35px] flex items-center justify-center -left-5 -top-5">
                <span className={'font-semibold'}>{notifications.length}</span>
              </div>
            )}
          </div>

          {isDropdownOpenNotification && (
            <div className="absolute top-16 right-40 bg-white shadow-lg rounded-lg my-3 w-70 z-50">
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 font-medium hover:bg-primary rounded-md transition duration-200 ease-in-out"
                onClick={handleLogout}
              >
                Aqui mis notificaciones
              </button>

              <button
                className="block w-full text-left px-4 py-2 text-gray-700 font-medium hover:bg-primary rounded-md transition duration-200 ease-in-out"
                onClick={handleLogout}
              >
                Aqui mis notificaciones
              </button>
            </div>
          )}

          <img
            src={user.profilePicture}
            className="w-[3em] h-[3em] border-2 mt-4 md:mt-auto md:mb-0 border-white rounded-full cursor-pointer"
            alt="Foto de perfil"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          <h2 className="text-white font-bold text-[16px]">{user.name}</h2>
          {isDropdownOpen && (
            <div className="absolute top-16 right-8 bg-white shadow-lg rounded-lg my-3 w-44 z-50">
              <Link
                to={'/profile'}
                className="block w-full text-left px-4 py-2 text-gray-700 font-medium hover:bg-primary rounded-md transition duration-200 ease-in-out"
              >
                Mi perfil
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 font-medium hover:bg-primary rounded-md transition duration-200 ease-in-out"
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
