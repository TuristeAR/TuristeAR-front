import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


const GoogleMapComponent = ({ latitud, longitud, nombre }) => {
    const mapContainerStyle = {
        height: '400px',
        width: '100%',
    };

    const center = {
        lat: latitud,
        lng: longitud,
    };

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={16}
                options={{ disableDefaultUI: true, styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }] }}
            >
                <Marker position={center} title={nombre}  />
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapComponent;
