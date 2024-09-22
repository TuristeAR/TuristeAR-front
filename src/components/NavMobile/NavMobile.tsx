import { Link } from 'react-router-dom';

export const NavMobile = () => {
  return (
    <nav className="bg-primary overflow-hidden my-4 rounded-lg  w-full h-[85vh]">
      <div className="container mx-auto h-full flex flex-col items-center justify-center">
        <ul className="flex flex-col gap-8 font-primary text-4xl font-semibold items-center uppercase ">
          {/* Login */}
          <button className="flex justify-center items-center ">
            <p className=" text-4xl font-semibold  uppercase text-white hover:text-gray ">Login</p>
          </button>
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


