import Carousel from '../components/Destinations/Carousel';
import { Header } from '../components/Header/Header';
import { MapaArg } from '../components/Destinations/MapaArg';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { get } from '../utilities/http.util';
import SearchHeroSection from '../components/SearchHeroSection/SearchHeroSection';

type Province = {
  id: number;
  name: string;
  description: string;
  images: string[];
  places: Place[];
};

type Review = {
  id: number;
  createdAt: string;
  publishedTime: string;
  rating: number;
  text: string;
  authorName: string;
  authorPhoto: string;
  photos: string[];
};

type Place = {
  id: number;
  createdAt: string;
  googleId: string;
  name: string;
  types: string[];
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  openingHours: string[];
  phoneNumber: string | null;
  reviews: Review[];
};

const Destinations = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Province>(null);
  const [reviews, setReviews] = useState<Place[]>([]);

  const scrollToSection = useCallback(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleRedirect = useCallback(() => {
    if (selectedProvince) {
      navigate(`/destino-esperado/${selectedProvince.name}`);
    }
  }, [navigate, selectedProvince]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await get('https://api-turistear.koyeb.app/province', {
          'Content-Type': 'application/json',
        });
        setProvinces(response.data);
        setSelectedProvince(response.data[0]);
        fetchReviews(response.data[0].name);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  const fetchReviews = async (provinceName: string) => {
    try {
      const response = await get(`https://api-turistear.koyeb.app/provinces/${provinceName}/4`, {
        'Content-Type': 'application/json',
      });
      setReviews(response.places);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleProvinceClick = (id: number) => {
    console.log(provinces)

    const province = provinces.find((p) => p.id === id) || null;
    fetchReviews(province.name);
    setSelectedProvince(province);
  };

  return (
    <>
      <Header />
      <section>
        <SearchHeroSection
          title={`Si ya sabés cuál es tu destino, seleccionalo para descubrir los mejores lugares y
              actividades`}
          onSearch={() => {}}
        ></SearchHeroSection>
        <div className="md:flex flex-wrap my-6 container mx-auto gap-1 p-4">
          <div className="flex-1 md:w-[400px] xl:w-auto">
            <div className="flex justify-center items-center" onClick={scrollToSection}>
              <MapaArg onProvinceClick={handleProvinceClick} />
            </div>
          </div>
          <div className="w-px bg-custom-orange m-10 "></div>
          <div ref={sectionRef} className="flex-1 max-w-[600px] w-full flex flex-col gap-y-6 ">
            <div className="flex flex-col gap-y-4 p-4 mx-6">
              <h1 className="text-3xl text-left">{selectedProvince?.name} </h1>
              <p className="font-light text-gray-500 text-xl text-start">
                {selectedProvince?.description}
              </p>
              <div className="flex justify-start gap-2 overflow-hidden">
                {selectedProvince?.images.map((image, index) => (
                  <div key={index} className="w-full h-[300px] overflow-hidden">
                    <img
                      key={image}
                      src={image}
                      className="w-full h-full object-cover"
                      alt={selectedProvince?.name}
                    />
                  </div>
                ))}
              </div>
              {selectedProvince ? (
                <div className={'flex justify-end'}>
                  <button className="btn-blue" onClick={handleRedirect}>
                    Descubrir más de {selectedProvince?.name}
                  </button>
                </div>
              ) : (
                <div>
                  <span className="text-xl">Seleccioná una provincia para ver más detalles.</span>
                </div>
              )}
            </div>
            <div className="h-px bg-custom-orange m-10"></div>
            <Carousel>
              {selectedProvince &&
                reviews?.map((item, index) => {
                  return (
                    <>
                      <div
                        className="flex flex-col gap-y-4 p-4 mx-6 mb-6 rounded-2xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)]"
                        key={index}>
                        <div className="flex justify-between items-center px-2 text-gray">
                          <div className="flex items-center gap-4">
                            <div className="rounded-full p-2 border border-1 border-black">
                              <img
                                className="w-8 h-8"
                                src={item.reviews[0].authorPhoto}
                                alt="person"
                              />
                            </div>
                            <p className="text-lg">{item.reviews[0].authorName}</p>
                          </div>
                          <p className="text-lg">{item.reviews[0].publishedTime}</p>
                        </div>
                        <p className="font-light text-gray-500 text-base lg:text-lg text-start">
                          {item.reviews[0].text}
                        </p>
                        <p className="italic text-md">
                          {item.name}, {selectedProvince?.name}
                        </p>
                        <div className="flex justify-start gap-2 w-full">
                          {item.reviews[0].photos.map((image, imgIndex) => (
                            <div key={imgIndex} className="w-3/4 h-[170px] overflow-hidden">
                              <img
                                src={image}
                                className="w-full h-full object-cover"
                                alt={selectedProvince?.name}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={'flex justify-end mx-6'}>
                        <Link to={`/lugar-esperado/${item.googleId}`}>
                          <button className="btn-blue">Ver más publicaciones</button>
                        </Link>
                      </div>
                    </>

                  );
                })}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default Destinations;
