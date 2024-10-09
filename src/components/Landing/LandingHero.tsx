import pathMap from '/assets/path-map.svg';

export const LandingHero = () => {
  const goToArmaTuViaje = () => {
    window.location.href = '/formQuestions';
  };

  return (
    <section className="w-full h-screen overflow-hidden text-gray-600 body-font">
      <video
        src="https://d1lrjy0kkf9pj7.cloudfront.net/app/media/346043eb/075257f4-b0de-4ba3-b8c9-45e01f6eb676/HD.mp4?Policy=eyJTdGF0ZW1lbnQiOiBbeyJSZXNvdXJjZSI6Imh0dHBzOi8vZDFscmp5MGtrZjlwajcuY2xvdWRmcm9udC5uZXQvYXBwL21lZGlhLzM0NjA0M2ViLzA3NTI1N2Y0LWIwZGUtNGJhMy1iOGM5LTQ1ZTAxZjZlYjY3Ni9IRC5tcDQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3Mjg3ODczNTl9fX1dfQ__&Signature=jHu6io0eds0K4toLWBaaBM7Xw~bQ6kSv6I3ZvsaAPHRIZbt2hVvFijecvXz4XYKhBCb3DZbSCNX9H~rFhxrAL7De4ub5L93begSYGJClkE7Ei6SMbI4OuDwj3YYN5i4WTDDJ0UmyGWJBvWvgx1mWjlfnhw1ukuRAQpUruHt87XYtypl3aJxn4IFsgmwEr~H5z1kWyoeUGlzibJ0xwt8JMFGo4t5gUQR5qci3N5cJaSzS3-W4s9gDJ7MwBo32ENCicMbQ-FxHUIoks~p6V3gPMviaUtXiSm~O89GJENY5XW9DFaDAR1o-sHLyKKO1~atQeGN8HOYe-1DOy7mU30l0Hw__&Key-Pair-Id=K2PIQ58NFTSVKU"
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
              className="w-60 my-auto flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg bg-primary"
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
