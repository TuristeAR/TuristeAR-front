import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const GoogleMapComponentForItinerary = ({ activities }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const center = {
    lat: activities.length > 0 ? activities[0].place.latitude : 0,
    lng: activities.length > 0 ? activities[0].place.longitude : 0,
  };

  return (
    <LoadScript googleMapsApiKey={'AIzaSyAwUPoi1TvgbcP2HrIXWF-Gxjalmzke4Ek'}>
      <GoogleMap
        mapContainerClassName={'w-full h-[85vh] md:h-[740px]'}
        center={center}
        zoom={13}
        options={{
          disableDefaultUI: true,
          styles: [{ featureType: 'poi', stylers: [{ visibility: 'off' }] }],
        }}
      >
        {activities.map((activity, index) => (
          <Marker
            key={index}
            position={{ lat: activity.place.latitude, lng: activity.place.longitude }}
            title={activity.name}
            onClick={() => setSelectedMarker(activity)}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 20,
              fillColor: '#0F254C',
              fillOpacity: 1,
              strokeWeight: 1,
              labelOrigin: new google.maps.Point(0, 0),
            }}
            label={{
              text: `${index + 1}`,
              color: '#FFF',
              fontSize: '32px',
              fontWeight: 'bold',
            }}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.place.latitude, lng: selectedMarker.place.longitude }}
            onCloseClick={() => setSelectedMarker(null)}
            options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
          >
            <div className="flex flex-col items-center justify-center">
              <h3 id="firstHeading" className="font-bold text-xl">
                {selectedMarker.name}
              </h3>
              <Link
                to={`/lugar-esperado/${selectedMarker.place.googleId}`}
                className="text-lg text-blue-500 cursor-pointer hover:underline"
              >
                Ver detalle
              </Link>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};
