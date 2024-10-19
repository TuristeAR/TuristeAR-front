import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const GoogleMapComponent = ({ latitud, longitud, nombre }) => {
    const [selectedMarker, setSelectedMarker] = useState(null);

    const mapContainerStyle = {
        height: '400px',
        width: '100%',
    };

    const center = {
        lat: latitud,
        lng: longitud,
    };

    return (
        <LoadScript googleMapsApiKey={"-AIzaSyAwUPoi1TvgbcP2HrIXWF-Gxjalmzke4Ek"}>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={16}
                options={{ disableDefaultUI: true, styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }] }}
            >
                <Marker 
                    position={center} 
                    title={nombre} 
                    onClick={() => setSelectedMarker(center)} 
                />
                
                {selectedMarker && (
                    <InfoWindow
                        position={center}
                        onCloseClick={() => setSelectedMarker(null)} 
                        options={{ pixelOffset: new window.google.maps.Size(0, -30) }}   
                        >
                        <div className='content'>
                            <h3 id="firstHeading" className="font-bold">{nombre}</h3>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapComponent;
