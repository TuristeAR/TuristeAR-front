import logo from '/assets/logo.svg';
import arrowRight from '/assets/arrow-right.svg';
export const Header = ({ containerStyles }) => {
  return (
    <>
      <header className={`relative ${containerStyles}`}>
        <nav>
          <ul>
            <header className="text-gray-600 body-font">
              <div className="container mx-auto flex flex-wrap p-5  md:flex-row items-center justify-between">
                <a href='/' className="flex title-font font-medium items-center md:mb-0">
                  <img src={logo} alt="Logo" className="logo w-12" />
                  <span className="ml-3 text-xl text-white font-bold hidden md:block">
                    TURISTEAR
                  </span>
                </a>
                {/* Links */}
                <nav className="hidden my-auto text-white  md:block md:ml-auto md:mr-auto flex-wrap items-center text-base justify-center font-semibold">
                  <a href='/destinations' className="mr-5 hover:text-gray-900 hover:text-hover cursor-pointer">
                    Destinos
                  </a>
                  <a className="mr-5 hover:text-gray-900 hover:text-hover cursor-pointer">
                    Comunidad
                  </a>
                  <a className="mr-5 hover:text-gray-900 hover:text-hover cursor-pointer">
                    Armá tu viaje
                  </a>
                  <div>
                    
                  </div>
                </nav>
                <button className="text-white flex justify-center items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 gap-x-2 hover:text-hover font-semibold">
                  <p>Login</p>
                  <img src={arrowRight} alt="Arrow Right" className="hidden md:block w-6 h-6 " />
                </button>
              </div>
            </header>
          </ul>
        </nav>
      </header>
    </>
  );
};
