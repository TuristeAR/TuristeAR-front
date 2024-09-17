import logo from '/assets/logo.svg';
import arrowRight from '/assets/arrow-right.svg';
export const Header = () => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <header className="text-gray-600 body-font">
              <div className="container mx-auto flex flex-wrap p-5  md:flex-row items-center justify-between">
                <a className="flex title-font font-medium items-center md:mb-0">
                  <img src={logo} alt="Logo" className="logo w-12" />
                  <span className="ml-3 text-xl text-primary font-bold hidden md:block">
                    TURISTEAR
                  </span>
                </a>
                {/* Links */}
                <nav className="hidden my-auto text-white  md:block md:ml-auto md:mr-auto flex-wrap items-center text-base justify-center font-semibold">
                  <a className="mr-5 hover:text-gray-900 hover:text-hover cursor-pointer">Destinos</a>
                  <a className="mr-5 hover:text-gray-900 hover:text-hover cursor-pointer">Comunidad</a>
                  <a className="mr-5 hover:text-gray-900 hover:text-hover cursor-pointer">Armá tu viaje</a>
                </nav>
                <button className="text-white flex justify-center items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 gap-x-2 hover:text-hover font-semibold">
                  <p>Login</p>
                  <div className="border border-1 rounded-full w-6 h-6 flex items-center justify-center">
                    <img src={arrowRight} alt="Arrow Right" className="w-6 h-6 " />
                  </div>
                </button>
              </div>
            </header>
          </ul>
        </nav>
      </header>
    </>
  );
};
