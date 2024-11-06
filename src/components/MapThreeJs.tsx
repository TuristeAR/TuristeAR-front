import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ThreeJSOverlayView } from '@googlemaps/three';

const MapComponent = ({ lat, lon }) => {
  useEffect(() => {
    const loadGoogleMapsApi = () => {
      return new Promise((resolve, reject) => {
        const existingScript = document.getElementById('google-maps-script');
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCndlOUUXZiAKyaS4FtLNdIkeZnwPfe2Jc&callback=initMap&libraries=maps3d`;
          script.id = 'google-maps-script';
          script.async = true;
          script.defer = true;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            reject(new Error('Google Maps script could not be loaded.'));
          };
          document.body.appendChild(script);
        } else {
          resolve(true);
        }
      });
    };

    const initMap = () => {
      const mapOptions = {
        tilt: 67.5, // Puedes ajustar el ángulo de inclinación
        heading: 0,
        zoom: 18,
        center: { lat: lat, lng: lon },
        mapId: '27913169e8aade95',
        disableDefaultUI: true,
        gestureHandling: 'none',
        keyboardShortcuts: false,
        styles: [{ featureType: 'poi', stylers: [{ visibility: 'off' }] }],
      };

      const mapDiv = document.getElementById('map');

      const map = new google.maps.Map(mapDiv, mapOptions);
      const scene = new THREE.Scene();
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
      directionalLight.position.set(0, 10, 50);
      scene.add(directionalLight);

      // Cargar el modelo GLTF
      const loader = new GLTFLoader();
      const url = 'https://raw.githubusercontent.com/googlemaps/js-samples/main/assets/pin.gltf';

      loader.load(url, (gltf) => {
        gltf.scene.scale.set(10, 10, 10);
        gltf.scene.rotation.x = Math.PI;
        scene.add(gltf.scene);

        let { tilt, heading, zoom } = mapOptions;

        const animate = () => {
          if (tilt < 67.5) {
            tilt += 0.5;
          } else if (heading <= 360) {
            heading += 0.2;
            zoom -= 0.0005;
          } else {
            return;
          }

          map.moveCamera({ tilt, heading, zoom });
          requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      });

      new ThreeJSOverlayView({
        map,
        scene,
        anchor: { ...mapOptions.center, altitude: 100 },
      });
    };

    loadGoogleMapsApi()
      .then(initMap)
      .catch((error) => console.error(error));

    return () => {
      // Limpieza, si es necesario
    };
  }, [lat, lon]); // Asegúrate de que lat y lon sean dependencias

  return (
    <>
      <div id="map" style={{ height: '100vh', width: '100%' }} />
    </>
  );
};

export default MapComponent;
