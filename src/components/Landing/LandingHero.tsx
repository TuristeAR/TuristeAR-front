import pathMap from '/assets/path-map.svg';

export const LandingHero = () => {
  const goToArmaTuViaje = () => {
    window.location.href = '/formQuestions';
  };

  return (
    <section className="w-full h-screen overflow-hidden text-gray-600 body-font">
      <video
        src="https://files.catbox.moe/nwc9ki.mp4"
        data-testid="landing-hero-video"
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      ></video>
      <div className="container h-full mx-auto flex px-5 py-24 md:flex-row flex-col items-center justify-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-7xl text-3xl mb-4 font-bold  text-white max-w-[750px]">
            Descubrí <span className="text-primary">Argentina</span> a tu medida
          </h1>
          <p className="mb-8 leading-relaxed text-l text-white">
            Creá tu viaje perfecto y explorá los destinos más fascinantes del país junto a nuestra
            comunidad.
          </p>
          <div>
            <button
              onClick={goToArmaTuViaje}
              className="w-60 my-auto flex text-white bg-custom-orange border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg bg-primary"
            >
              <span className="my-auto mr-4">Planificá tu viaje</span>
              <img src={pathMap} alt="Path Map" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
