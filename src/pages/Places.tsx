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
};

const Places = () => {
  const [placesFound, setPlacesFound] = useState<Place[]>([]);
  const [province, setProvince] = useState<Province>(null);
  const { provinceName } = useParams();
  const [offset, setOffset] = useState(0);
  const [count] = useState(15);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [displayedPlaces, setDisplayedPlaces] = useState<Place[]>([]);

  useEffect(() => {
    if (!provinceName) return;

    const fetchProvinces = async () => {
      try {
        const response = await get(`https://api-turistear.koyeb.app/provinces/${provinceName}`, {
          'Content-Type': 'application/json',
        });
        setProvince(response);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (province) {
        try {
          const response = await fetch(`http://localhost:3001/province/places/${province.id}`);
          const data = await response.json();
          setPlacesFound(data);
          setDisplayedPlaces(data.slice(0, count));
        } catch (error) {
          console.error('Error fetching places:', error);
        }
      }
    };

    fetchPlaces();
  }, [province, count]);

  const handleSearch = ({ localidad, provincia }) => {
    console.log('Localidad seleccionada:', localidad);
    console.log('Provincia seleccionada:', provincia);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    const newOffset = offset + count;
    const newPlaces = placesFound.slice(0, newOffset);
    setDisplayedPlaces(newPlaces);
    setOffset(newOffset);
    setIsLoadingMore(false);
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
      <Header></Header>

      <SearchHeroSection
        onSearch={handleSearch}
        title={`Puntos de interés de ${province.name}`}
      ></SearchHeroSection>
      {/*  <section>
        <div className=" mx-auto">
          <div className="w-full">
            <GoogleMapComponent
              latitud={'place.latitude'}
              longitud={'place.longitude'}
              nombre={'place.name'}
            ></GoogleMapComponent>
          </div>
        </div>
      </section>
 */}
      <section className="py-5 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-12">
            <CategoryFilter provinceName={province.name}></CategoryFilter>
            <div className="col-span-12 md:col-span-9">
              <PlaceList places={displayedPlaces}></PlaceList>

              <div className="w-full text-center">
                {displayedPlaces.length < placesFound.length && (
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
