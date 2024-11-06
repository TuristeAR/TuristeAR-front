import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import useFetchItinerary from '../utilities/useFetchItinerary';
import { GoogleMapComponentForItinerary } from '../components/GoogleMapComponent/GoogleMapComponentForItinerary';
import alignIcon from '/assets/align.svg';
import calendarIcon from '/assets/calendar-blue.svg';

export const ItineraryMap = () => {
  const { itineraryId } = useParams();

  const { activities } = useFetchItinerary(itineraryId || null);

  let totalDistance = 0;

  const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => (x * Math.PI) / 180;

    const lat1 = coords1.lat;
    const lon1 = coords1.lng;
    const lat2 = coords2.lat;
    const lon2 = coords2.lng;

    const R = 6371; // Radius of the Earth in km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  console.log(activities);
  return (
    <>
      <Header />
      <section>
        <h2 className="text-3xl font-bold text-center mt-8">Mapa del itinerario</h2>
        <div className="mx-auto w-full lg:w-[90%] flex flex-col lg:flex-row justify-center z-30 relative p-4">
          <div className="w-full lg:w-[70%]">
            <div className="flex gap-x-4 mb-4">
              <Link
                className="flex justify-center items-center p-1 gap-x-1"
                to={`/itineraryCalendar/${itineraryId}`}
              >
                <img src={calendarIcon} alt="" />
                <p className="text-sm">Calendario</p>
              </Link>
              <Link
                className="flex items-center gap-x-1 cursor-pointer"
                to={`/itineraryDetail/${itineraryId}`}
              >
                <img src={alignIcon} alt="" />

                <p className="text-sm">Resumen</p>
              </Link>
            </div>
            <GoogleMapComponentForItinerary activities={activities} />
          </div>
          <div className="w-full lg:w-[30%]">
            <div className="lg:h-12"></div>
            <div className="bg-white rounded-md p-4 shadow-sm">
              <h3 className="text-xl text-center font-bold mb-4">Recorrido de tu viaje</h3>
              <div className="mb-2 flex justify-between">
                <p className="text-lg text-primary-2">Actividad</p>
                <p className="text-lg text-primary-2">Distancia</p>
              </div>
              <hr className="border-gray mb-2" />
              {activities.map((activity, index) => {
                const activityCoordinates = {
                  lat: activity.place.latitude,
                  lng: activity.place.longitude,
                };

                const nextActivity = activities[index + 1];

                const nextActivityCoordinates = {
                  lat: nextActivity?.place.latitude,
                  lng: nextActivity?.place.longitude,
                };

                const distance = nextActivity
                  ? haversineDistance(activityCoordinates, nextActivityCoordinates).toFixed(2)
                  : null;

                if (distance) {
                  totalDistance += parseFloat(distance);
                }

                return (
                  <div
                    key={index}
                    className="my-2 lg:my-4 flex items-center option-card hover:bg-[#d9d9d9] hover:-translate-y-1.5 hover:shadow-lg"
                  >
                    <p className="w-[10%] text-md">{index + 1}.</p>
                    <Link
                      to={`/lugar-esperado/${activity.place.googleId}`}
                      className="w-[65%] text-md "
                    >
                      {activity.name.replace(/ - \d{1,2} \w+\./, '')}
                    </Link>
                    {distance && <p className="w-1/4 text-md text-end">{distance} km</p>}
                  </div>
                );
              })}
              <div className="mt-4 lg:mt-8">
                <span className="text-lg text-center font-semibold">
                  📍 En total vas a recorrer {totalDistance.toFixed(2)} km
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
