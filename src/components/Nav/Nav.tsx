import { Link, useLocation } from 'react-router-dom';
import logo from '/src/assets/TuristeAR-logo.png';
import arrowRight from '/assets/arrow-right.svg';

export const Nav = () => {
  const location = useLocation();

  return (
    <>
      <Link to={'/'} className="flex title-font font-medium items-center md:mb-0">
        <img src={logo} alt="Logo" className="h-14" />
      </Link>
      <nav className="hidden mt-auto mb-0 text-white md:block md:ml-auto md:mr-auto flex-wrap items-center text-lg justify-center font-semibold">
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
      <Link
        to={'/login'}
        className="hidden md:flex justify-center items-center text-white text-lg mt-4 md:mt-auto md:mb-0 gap-x-2 hover:text-hover font-semibold"
      >
        <p>Iniciá sesión</p>
        <img src={arrowRight} alt="Arrow Right" className="hidden md:block w-6 h-6 " />
      </Link>
    </>
  );
};