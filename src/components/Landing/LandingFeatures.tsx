import { ScrollingText } from './ScrollingText';
import posts from '../../assets/landing_posts.png';
import calendar from '../../assets/landing_calendar.png';
import calendarBackgroundSm from '../../assets/landing_calendar_background_sm.svg';
import calendarBackground2 from '../../assets/landing_calendar_background_lg.svg';
import calendarBackground3 from '../../assets/landing_calendar_backgound_xl.svg';
import arrowRight from '/assets/arrow-right.svg';
import arrowRightBlue from '/assets/arrow-right-blue.svg';

export const LandingFeatures = () => {
  return (
    <>
      <ScrollingText></ScrollingText>
      <section className="bg-white my-8">
        <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-20 lg:px-6">
          <img className="w-full " src={posts} alt="User posts" />
          <div className="mt-4 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
              Viví tu aventura y compartila con viajeros de todo el mundo.
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg">
              Explorá Argentina como nunca antes siguiendo itinerarios que despiertan tu curiosidad.
              ¡Creá, seguí y compartí aventuras épicas con nuestra comunidad de viajeros
              apasionados!
            </p>
            <a
              href="#"
              className="inline-flex items-center text-white bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Ver más publicaciones
              <img src={arrowRight} alt="Arrow Right Blue" className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="mt-4 static text-white gap-8 items-center  px-4 mx-auto max-w-screen-xl xl:gap-16 grid sm:grid-cols-2 py-20 lg:px-6">
          <div className="mt-4 z-10 md:mt-0">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
              Creá tu itinerario y compartilo con otros viajeros.
            </h2>
            <p className="mb-6 font-light text-gray-500 md:text-lg">
              Personalizá tu viaje, ya sea solo o con amigos, usando nuestro calendario interactivo.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-primary bg-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Comenzá a planificar
              <img src={arrowRightBlue} alt="Arrow Right Blue" className="w-6 h-6" />
            </a>
          </div>
          <img className="h-full w-full mt-4 z-10" src={calendar} alt="Calendar" />
          <div className="absolute z-0 left-0">
              <img className="hidden w-screen xl:block " src={calendarBackground3} alt="Calendar background" /> 
              <img className="hidden sm:block w-screen xl:hidden" src={calendarBackground2} alt="" />
              <img className="w-screen relative -top-9 h-[900px] sm:hidden " src={calendarBackgroundSm} alt="Calendar background2" />

          </div>
        </div>
      </section>
    </>
  );
};
