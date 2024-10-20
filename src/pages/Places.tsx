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

type PlaceCard = {
  id: number;
  googleId: string;
  name: string;
  types: string[];
  rating: number;
  address: string;
  reviews: {
    id: number;
    photos: string[];
  }[];
};
const Places = () => {
  const [placesFound, setPlacesFound] = useState<Place[]>([]);
  const { provinceId } = useParams();
  const [offset, setOffset] = useState(0); 
  const [count] = useState(15);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      if (provinceId) {
       
        try {
          const response = await get(
            `http://localhost:3001/places/province?provinceId=${provinceId}&count=${count}&offset=${offset}`,
            { 'Content-Type': 'application/json' },
          );
          setPlacesFound((prevPlaces) => [...prevPlaces, ...response.data]); 
          setIsLoadingMore(false);
        } catch (error) {
          console.error('Error fetching places:', error);
      }
    }
    };

    fetchPlaces();
  }, [provinceId, offset]);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setOffset((prevOffset) => prevOffset + count);
  };


  return (
    <>
      <Header></Header>

      <SearchHeroSection
        onSearch={handleSearch}
        title={`Puntos de interés de ${provinceId}`}
      ></SearchHeroSection>
      {/*    <section>
        <div className="sm:w-10/12 mx-auto">
          <div className='"w-full'>
            <GoogleMapComponent
              latitud={'place.latitude'}
              longitud={'place.longitude'}
              nombre={'place.name'}
            ></GoogleMapComponent>
          </div>
        </div>
      </section> */}

      <section className="py-5 relative">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-12">
            <CategoryFilter></CategoryFilter>
            <div className="col-span-12 md:col-span-9">
              <PlaceList places={placesFound}></PlaceList>

              <div className="w-full text-center">
                {placesFound.length < count || !(placesFound.length > 0) ? (
                  <></>
                ) : (
                  <button onClick={handleLoadMore} className="btn-blue mr-3">
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
