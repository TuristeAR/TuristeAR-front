import { useEffect, useRef, useState } from 'react';
import { Header } from '../components/Header/Header';
import PlaceList from '../components/PlaceList/PlaceList';
import SearchHeroSection from '../components/SearchHeroSection/SearchHeroSection';
import { get } from '../utilities/http.util';
import GoogleMapComponent from '../components/GoogleMapComponent/GoogleMapComponent';
import { useParams } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import Lottie from 'lottie-react';

import logoAnimado from '../assets/logoAnimado.json';
import { co } from '@fullcalendar/core/internal-common';

type Province = {
  id: number;
  name: string;
  description: string;
  images: string;
  places: Place[];
};

type Review = {
  id: number;
  googleId: string;
  publishedTime: string;
  rating: number;
  text: string;
  authorName: string;
  authorPhoto: string;
  photos: string[];
};

type Place = {
  id: number;
  googleId: string;
  name: string;
  rating: number;
  reviews: Review[];
  types: String[];
  localidad?: String;
  departamento?: String;
};
const getLocationDetails = async (lat, lng) => {
  try {
    const response = await fetch(
      `${process.env.VITE_GEOREF_API_URL}/ubicacion?lat=${lat}&lon=${lng}`,
    );
    const data = await response.json();

    if (data && data.ubicaciones && data.ubicaciones.length > 0) {
      const { localidad, departamento } = data.ubicaciones[0];

      return {
        localidad: localidad ? localidad.nombre : null,
        departamento: departamento ? departamento.nombre : null,
      };
    }
  } catch (error) {
    console.error('Error fetching location details:', error);
  }

  return { localidad: null, departamento: null };
};

const Places = () => {
  const [placesFound, setPlacesFound] = useState<Place[]>([]);
  const [placesFoundType, setPlacesFoundType] = useState<Place[]>([]);
  const [province, setProvince] = useState<Province>(null);
  const { provinceName } = useParams();
  let departamento;
  let localidad;
  const [offset, setOffset] = useState(0);
  const [count] = useState(15);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [displayedPlaces, setDisplayedPlaces] = useState<Place[]>([]);
  const [displayedPlacesForTypes, setDisplayedPlacesForTypes] = useState<Place[]>([]);
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  try {
    const storedLocalidad = localStorage.getItem('selectedLocalidad');
    if (storedLocalidad) {
      localidad = JSON.parse(storedLocalidad).localidad;
      departamento = JSON.parse(storedLocalidad).departamento;
    }
  } catch (error) {
    console.error('Error al analizar selectedLocalidad:', error);
  }
  useEffect(() => {
    if (!provinceName) return;

    const fetchProvinces = async () => {
      try {
        const response = await get(`${process.env.VITE_API_URL}/provinces/${provinceName}`, {
          'Content-Type': 'application/json',
        });
        setProvince(response);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, [provinceName]);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (province) {
        try {
          const response = await fetch(
            `${process.env.VITE_API_URL}/province/places/${province.id}`,
          );
          const data = await response.json();

          const dataPlaceDepartamentoLocalidad = data.map(async (p) => {
            const locationDetails = await getLocationDetails(p.latitude, p.longitude);

            p.departamento = locationDetails.departamento;
            p.localidad = locationDetails.localidad;
          });
          console.log('Location', dataPlaceDepartamentoLocalidad);
          setPlacesFound(dataPlaceDepartamentoLocalidad);
          console.log(localidad);
          if (localidad) {
            const dataFoundLocalidad = dataPlaceDepartamentoLocalidad.filter(
              (place) => place.localidad == localidad,
            );
            setDisplayedPlaces(dataFoundLocalidad.slice(0, count));
          } else {
            setDisplayedPlaces(data.slice(0, count));
          }

          const types = data.flatMap((place) => place.types);
          const unique = Array.from(new Set(types));
          setUniqueTypes(unique as string[]);
        } catch (error) {
          console.error('Error fetching places:', error);
        }
      }
    };

    fetchPlaces();
  }, [province, count]);

  const handleSearch = ({ localidad, provincia }) => {
    localidad = localidad;
    provincia = provincia;
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    const newOffset = offset + count;

    if (selectedTypes.length > 0) {
      const newPlacesForTypes = placesFoundType.slice(0, newOffset);
      setDisplayedPlacesForTypes(newPlacesForTypes);
    } else {
      const newPlaces = placesFound.slice(0, newOffset);
      setDisplayedPlaces(newPlaces);
    }

    setOffset(newOffset);
    setIsLoadingMore(false);
  };

  useEffect(() => {
    if (selectedTypes.length > 0) {
      const filteredPlaces = placesFound.filter((place) =>
        place.types.some((type) => selectedTypes.includes(type as string)),
      );
      setPlacesFoundType(filteredPlaces);
      setDisplayedPlacesForTypes(filteredPlaces.slice(0, count));
      setOffset(count);
    } else {
      setDisplayedPlaces(placesFound.slice(0, count));
      setOffset(count);
    }
  }, [selectedTypes, placesFound, count]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes((prevSelected) =>
      prevSelected.includes(type)
        ? prevSelected.filter((t) => t !== type)
        : [...prevSelected, type],
    );
  };

  if (!province) {
    return (
      <div className="w-screen h-screen flex">
        <Lottie className="w-[20rem] m-auto" animationData={logoAnimado} />
      </div>
    );
  }

  return (
    <>
      <Header />

      <SearchHeroSection
        onSearch={handleSearch}
        title={`Puntos de interés de ${province.name} - ${departamento} - ${localidad}`}
      />

      <section className="py-5 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-12">
            <CategoryFilter
              provinceName={province.name}
              departamento={departamento}
              localidad={localidad}
              types={uniqueTypes}
              selectedTypes={selectedTypes}
              onTypeChange={handleTypeChange}
            />
            <div className="col-span-12 md:col-span-9">
              {selectedTypes.length > 0 ? (
                <PlaceList places={displayedPlacesForTypes} />
              ) : (
                <PlaceList places={displayedPlaces} />
              )}

              <div className="w-full text-center">
                {selectedTypes.length > 0
                  ? displayedPlacesForTypes.length < placesFoundType.length && (
                      <button onClick={handleLoadMore} className="btn-blue mr-3 mt-5">
                        {isLoadingMore ? 'Cargando más...' : 'Ver más publicaciones'}
                      </button>
                    )
                  : displayedPlaces.length < placesFound.length && (
                      <button onClick={handleLoadMore} className="btn-blue mr-3 mt-5">
                        {isLoadingMore ? 'Cargando más...' : 'Ver más publicaciones'}
                      </button>
                    )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Places;
