import logo from '/assets/logo.svg';
import arrowRight from '/assets/arrow-right.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { NavMobile } from './NavMobile/NavMobile';
export const Header = ({ containerStyles }: { containerStyles: any }) => {
  const [navActive, setNavActive] = useState(false);

  return (
    <>
      <header className={`${containerStyles}  w-full text-gray-600 body-font`}>
        {' '}
        <div className="container mx-auto flex flex-wrap p-5  md:flex-row items-center justify-between">
          <Link to={'/'} className="flex title-font font-medium items-center md:mb-0">
            <img src={logo} alt="Logo" className="logo w-12" />
            <span className="ml-3 text-xl text-white font-bold hidden md:block">TURISTEAR</span>
          </Link>
          {/* Links */}
          <nav className="hidden my-auto text-white  md:block md:ml-auto md:mr-auto flex-wrap items-center text-base justify-center font-semibold">
            <Link
              to={'/destinations'}
              className="mr-5 hover:text-gray-900 hover:text-hover cursor-pointer"
            >
              Destinos
            </Link>
            <Link to={'/'} className="mr-5 hover:text-gray-900 hover:text-hover cursor-pointer">
              Comunidad
            </Link>
            <Link
              to={'/formQuestions'}
              className="mr-5 hover:text-gray-900 hover:text-hover cursor-pointer"
            >
              Armá tu viaje
            </Link>
            <div></div>
          </nav>
          {/* Nav  trigger btn */}
          <button
            onClick={() => setNavActive(!navActive)}
            className="w-8 h-6 md:hidden text-white relative flex items-center justify-center z-[60] outline-none "
          >
            {/* 1 */}
            <span
              className={`w-full h-[1.5px] bg-white absolute left-0 will-change-transform transition-transform duration-300 ${
                navActive ? 'top-1/2 rotate-45' : 'top-0 translate-y-0'
              }`}
            ></span>
            {/* 2 */}
            <span
              className={`w-full h-[1.5px] bg-white absolute left-0 transition-opacity duration-300 ${
                navActive ? 'opacity-0' : 'top-1/2'
              }`}
            ></span>
            {/* 3 */}
            <span
              className={`w-full h-[1.5px] bg-white absolute left-0 will-change-transform transition-transform duration-300 ${
                navActive ? 'top-1/2 -rotate-45' : 'bottom-0 translate-y-0'
              }`}
            ></span>
          </button>
          {navActive && <NavMobile />}

          {/* Login */}
          <button className="hidden md:flex justify-center items-center text-white text-base mt-4 md:mt-0 gap-x-2 hover:text-hover font-semibold">
            <p>Login</p>
            <img src={arrowRight} alt="Arrow Right" className="hidden md:block w-6 h-6 " />
          </button>
        </div>
      </header>
    </>
  );
};
