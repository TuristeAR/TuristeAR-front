import { GoogleMap, InfoWindow, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const GoogleMapComponentForItinerary = ({ activities }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [zoom, setZoom] = useState(10);

  const center =
    activities.length > 0
      ? {
          lat:
            activities.reduce((sum, activity) => sum + activity.place.latitude, 0) /
            activities.length,
          lng:
            activities.reduce((sum, activity) => sum + activity.place.longitude, 0) /
            activities.length,
        }
      : { lat: 0, lng: 0 };

  const pathCoordinates = activities.map((activity) => ({
    lat: activity.place.latitude,
    lng: activity.place.longitude,
  }));

  const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => (x * Math.PI) / 180;

    const lat1 = coords1.lat;
    const lon1 = coords1.lng;
    const lat2 = coords2.lat;
    const lon2 = coords2.lng;

    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (activities.length > 1) {
      let maxDistance = 0;
      for (let i = 0; i < activities.length - 1; i++) {
        for (let j = i + 1; j < activities.length; j++) {
          const distance = haversineDistance(
            { lat: activities[i].place.latitude, lng: activities[i].place.longitude },
            { lat: activities[j].place.latitude, lng: activities[j].place.longitude },
          );
          if (distance > maxDistance) {
            maxDistance = distance;
          }
        }
      }

      switch (true) {
        case maxDistance < 5:
          setZoom(15);
          break;
        case maxDistance < 50:
          setZoom(12);
          break;
        case maxDistance < 150:
          setZoom(10);
          break;
        default:
          setZoom(10);
      }
    }
  }, [activities]);

  return (
    <LoadScript googleMapsApiKey={process.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerClassName={'w-full h-[600px] lg:h-[730px] border border-gray rounded-md'}
        center={center}
        zoom={zoom}
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

        <Polyline
          path={pathCoordinates}
          options={{
            strokeColor: '#ff8c00',
            strokeOpacity: 0,
            icons: [
              {
                icon: {
                  path: 'M 0,-1 0,1',
                  strokeOpacity: 1,
                  scale: 3,
                },
                offset: '0',
                repeat: '20px',
              },
            ],
          }}
        />

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
