import logo from '/logo.svg';

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
                <nav className="hidden my-auto text-white  md:block md:ml-auto md:mr-auto flex-wrap items-center text-base justify-center">
                  <a className="mr-5 hover:text-gray-900">Destinos</a>
                  <a className="mr-5 hover:text-gray-900">Comunidad</a>
                  <a className="mr-5 hover:text-gray-900">Armá tu viaje</a>
                </nav>
                <button className="text-white inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0 ">
                  Login
                  <svg
                    className="w-4 h-4 mx-auto ml-1"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </header>
          </ul>
        </nav>
      </header>
    </>
  );
};
