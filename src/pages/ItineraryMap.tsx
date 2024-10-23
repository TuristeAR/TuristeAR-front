import { useParams } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import useFetchItinerary from '../utilities/useFetchItinerary';
import { GoogleMapComponentForItinerary } from '../components/GoogleMapComponent/GoogleMapComponentForItinerary';

export const ItineraryMap = () => {
  const { itineraryId } = useParams();

  const { activities } = useFetchItinerary(itineraryId || null);

  return (
    <>
      <Header />
      <section>
        <h2 className="text-3xl font-bold text-center mt-8">Mapa del itinerario</h2>
        <h3 className="text-xl text-center text-gray-500 mt-4">
          A partir del mapa interactivo, podés visualizar la ubicación de los lugares que vas a
          visitar.
        </h3>
        <div className="mx-auto w-full md:w-[90%] flex flex-col justify-center z-30 relative p-4">
          <GoogleMapComponentForItinerary activities={activities} />
        </div>
      </section>
    </>
  );
};
