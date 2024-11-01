import { ArticleCard } from '../components/Destinations/ArticleCard';
import { Header } from '../components/Header/Header';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { PostCard } from '../components/Destinations/PostCard';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { get } from '../utilities/http.util';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';
import { BedDouble, Building2, School, Ticket, Trees, UtensilsCrossed } from 'lucide-react';

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

const ExpectedDestination = () => {
  const [showedLugares, setShowedLugares] = useState(false);
  const [showedGastronomia, setShowedGastronomia] = useState(false);
  const [showedAirFree, setShowedAirFree] = useState(false);
  const [showedCulture, setShowedCulture] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const {nombreDeLaProvincia} = useParams();
  const [province, setProvince] = useState<Province>();
  const [gastronomyPlace, setGastronomyPlace] = useState<PlaceCard[]>([]);
  const [pointsInterest, setPointsInterest] = useState<PlaceCard[]>([]);
  const [airFreePlace, setAirFreePlace] = useState<PlaceCard[]>([]);
  const [culturePlace, setCulturePlace] = useState<PlaceCard[]>([]);

  const gastronomyRef = useRef(null);
  const cultureRef = useRef(null);
  const airFreeRef = useRef(null);
  const lugaresRef = useRef(null);  

  const handleScrollToSection = (sectionRef, setShowSection) => {
    setShowSection((prev) => !prev); // Cambia el estado de despliegue
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const response = await get(
          `https://api-turistear.koyeb.app/provinces/${nombreDeLaProvincia}`,
          {
            'Content-Type': 'application/json',
          },
        );

        setProvince(response);
      } catch (error) {
        console.error('Error fetching province:', error);
      }
    };

    fetchProvince();
  }, [nombreDeLaProvincia]);

  // Gastronomy
  useEffect(() => {
    const fetchGastronomyPlace = async () => {
      if (province) {
        try {
          const response = await get(
            `https://api-turistear.koyeb.app/places/province?provinceId=${province.id}&types=restaurant&types=food&count=6`,
            {
              'Content-Type': 'application/json',
            },
          );

          setGastronomyPlace(response.data);
        } catch (error) {
          console.error('Error fetching GastronomyPlace:', error);
        }
      }
    };

    fetchGastronomyPlace();
  }, [province]);

  // airfree 
  useEffect(() => {
    const fetchAirFreePlace = async () => {
      if (province) {
        try {
          //change value count on url, to receive more places
          const response = await get(
            `https://api-turistear.koyeb.app/places/province?provinceId=${province.id}&types=hiking_area&types=campground&types=national_park&types=park&count=10`,
            {
              'Content-Type': 'application/json',
            },
          );

          setAirFreePlace(response.data);
        } catch (error) {
          console.error('Error fetching AirFreePlace:', error);
        }
      }
    };

    fetchAirFreePlace();
  }, [province]);

  // culture 
  useEffect(() => {
    const fetchCulturePlace = async () => {
      if (province) {
        try {
          //change value count on url, to receive more places
          const response = await get(
            `https://api-turistear.koyeb.app/places/province?provinceId=${province.id}&types=library&types=museum&types=political&count=10`,
            {
              'Content-Type': 'application/json',
            },
          );

          setCulturePlace(response.data);
        } catch (error) {
          console.error('Error fetching AirFreePlace:', error);
        }
      }
    };

    fetchCulturePlace();
  }, [province]);

  // atraction
  useEffect(() => {
    const fetchCulturePlace = async () => {
      if (province) {
        try {
          //change value count on url, to receive more places
          const response = await get(
            `https://api-turistear.koyeb.app/places/province?provinceId=${province.id}&types=tourist_attraction&types=museum&types=political&count=10`,
            {
              'Content-Type': 'application/json',
            },
          );

          setCulturePlace(response.data);
        } catch (error) {
          console.error('Error fetching AirFreePlace:', error);
        }
      }
    };

    fetchCulturePlace();
  }, [province]);

  // points of interest
  useEffect(() => {
    const fetchPointsInterest = async () => {
      if (province) {
        try {
          const response = await get(
            `https://api-turistear.koyeb.app/places/province?provinceId=${province.id}&types=hiking_area&types=national_park&types=museum&types=park&types=library&count=6`,
            {
              'Content-Type': 'application/json',
            },
          );

          setPointsInterest(response.data);
        } catch (error) {
          console.error('Error fetching GastronomyPlace:', error);
        }
      }
    };

    fetchPointsInterest();
  }, [province]);

  const toggleReviews = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  if (!province)
    return (
      <div className="w-screen h-screen flex">
        <Lottie className="w-[20rem] m-auto" animationData={logoAnimado} />
      </div>
    );

  return (
    <>
      <Header />
      <section className="w-full mb-5 mt-12">
        <div className="sm:w-10/12 m-auto">
          <ImageGallery images={[province.images]} height={70}></ImageGallery>
          <div className="my-8 px-2 sm:px-0 flex flex-col gap-y-4">
            <h1 className="text-center">{province.name}</h1>
            <p className="font-light text-gray-500 text-sm md:text-base lg:text-xl text-center">
              {province.description}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-3">
            <div className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 p-4 border border-gray cursor-pointer hover:bg-primary hover:bg-opacity-50 transition duration-300"
            onClick={() => handleScrollToSection(airFreeRef, setShowedAirFree)}>
              <Trees width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />
              <span className="sm:text-xl font-medium text-center mx-auto">Aire Libre</span>
            </div>
            <div className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 p-4 border border-gray cursor-pointer hover:bg-primary hover:bg-opacity-50 transition duration-300"
            onClick={() => handleScrollToSection(lugaresRef, setShowedLugares)}>
              <Ticket width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />
              <span className="sm:text-xl font-medium text-center">Atracciones</span>
            </div>
            <div className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 p-4 border border-gray cursor-pointer hover:bg-primary hover:bg-opacity-50 transition duration-300"
            onClick={() => handleScrollToSection(cultureRef, setShowedCulture)}>
              <School width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />
              <span className="sm:text-xl font-medium text-center">Cultura</span>
            </div>
            <div className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 p-4 border border-gray cursor-pointer hover:bg-primary hover:bg-opacity-50 transition duration-300" 
            onClick={() => handleScrollToSection(gastronomyRef, setShowedGastronomia)}>
              <UtensilsCrossed width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />
              <span className="sm:text-xl font-medium text-center">Gastronomia</span>
              
            </div>
          </div>
        </div>
      </section>
      {/* Posts usuarios */}
      <section>
        <div className="sm:w-10/12 m-auto mt-20">
          <h3 className="text-xl sm:text-4xl font-bold pl-1 sm:pl-0 mb-1">
            Descubrí lo que cuentan nuestros usuarios
          </h3>
          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {province.places.slice(0, visibleCount).map((userPost, index) => (
              <PostCard
                key={index}
                imgPerson={userPost.reviews[0].authorPhoto}
                usuario={userPost.reviews[0].authorName}
                fecha={userPost.reviews[0].publishedTime}
                descripcion={userPost.reviews[0].text}
                place={userPost.name}
                province={province.name}
                img={userPost.reviews[0].photos}
                rating={userPost.reviews[0].rating}
              />
            ))}
          </div>
          <div className="text-center mt-5">
            {province.places.length <= visibleCount ? (
              ''
            ) : (
              <button onClick={toggleReviews} className="btn-blue mt-8">
                Ver más publicaciones
              </button>
            )}
          </div>
        </div>
      </section>
      {/* Puntos de interes */}
      <section  ref={lugaresRef} className="my-10">
        <div className="sm:w-10/12 m-auto mt-10">
          <h3
            onClick={() => setShowedLugares(!showedLugares)}
            className="text-xl sm:text-3xl pl-2 font-bold btn-drop-down-blue flex items-center cursor-pointer"
          >
            Lugares
            <div className="icons">
              <svg
                className={`${!showedLugares ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#FFFFFF"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
              <svg
                className={`${showedLugares ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#FFFFFF"
              >
                <path d="m280-400 200-200 200 200H280Z" />
              </svg>
            </div>
          </h3>
          <div className={`${showedLugares ? 'block' : 'hidden'}`}>
            <div className="relative px-1 sm:px-0 flex gap-2 mt-5 justify-around flex-wrap">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={5}
                slidesPerView={'auto'}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                  },
                  480: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                {pointsInterest.map(
                  (article, index) =>
                    article.reviews.length > 0 &&
                    article.reviews[0].photos.length > 0 && (
                      <div className="w-80" key={index}>
                        <SwiperSlide>
                          <Link to={`/lugar-esperado/${article.googleId}`}>
                            <ArticleCard
                              key={article.id}
                              title={article.name}
                              image={article.reviews[0].photos[0]}
                              rating={article.rating}
                              address={article.address}
                            />
                          </Link>
                        </SwiperSlide>
                      </div>
                    ),
                )}
              </Swiper>
              <div className="swiper-button-prev hidden"></div>
              <div className="hidden swiper-button-next"></div>
            </div>
            <div className="text-center my-6">
              <button className="btn-blue">Ver más</button>
            </div>
          </div>
        </div>
      </section>
      {/* Gastronomía */}
      <section ref={gastronomyRef} className="my-10">
        <div className="sm:w-10/12 m-auto mt-10">
          <h3
            onClick={() => setShowedGastronomia(!showedGastronomia)}
            className="text-xl sm:text-3xl pl-2 font-bold btn-drop-down-blue flex items-center cursor-pointer"
          >
            Gastronomía
            <div className="icons">
              <svg
                className={`${!showedGastronomia ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#FFFFFF"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
              <svg
                className={`${showedGastronomia ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#FFFFFF"
              >
                <path d="m280-400 200-200 200 200H280Z" />
              </svg>
            </div>
          </h3>
          <div className={`${showedGastronomia ? 'block' : 'hidden'}`}>
            <div className={`relative px-2 sm:px-0 flex gap-2 mt-5 justify-around flex-wrap`}>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={'auto'}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                  },
                  480: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                {gastronomyPlace.map(
                  (article, index) =>
                    article.reviews.length > 0 &&
                    article.reviews[0].photos.length > 0 && (
                      <div className="w-80" key={index}>
                        <SwiperSlide>
                          <Link to={`/lugar-esperado/${article.googleId}`}>
                            <ArticleCard
                              key={article.id}
                              title={article.name}
                              image={article.reviews[0].photos[0]}
                              rating={article.rating}
                              address={article.address}
                            />
                          </Link>
                        </SwiperSlide>
                      </div>
                    ),
                )}
              </Swiper>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
            {/* <div className="text-center my-6">
              <button className="btn-blue">Ver más</button>
            </div> */}
          </div>
        </div>
      </section>{' '}

      {/* Air Free */}
      <section  ref={airFreeRef} className="my-10">
        <div className="sm:w-10/12 m-auto mt-10">
          <h3
            onClick={() => setShowedAirFree(!showedAirFree)}
            className="text-xl sm:text-3xl pl-2 font-bold btn-drop-down-blue flex items-center cursor-pointer"
          >
            Aire Libre 
            <div className="icons">
              <svg
                className={`${!showedAirFree ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#FFFFFF"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
              <svg
                className={`${showedAirFree ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#FFFFFF"
              >
                <path d="m280-400 200-200 200 200H280Z" />
              </svg>
            </div>
          </h3>
          <div className={`${showedAirFree ? 'block' : 'hidden'}`}>
            <div className={`relative px-2 sm:px-0 flex gap-2 mt-5 justify-around flex-wrap`}>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={'auto'}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                  },
                  480: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                {airFreePlace.map(
                  (article, index) =>
                    article.reviews.length > 0 &&
                    article.reviews[0].photos.length > 0 && (
                      <div className="w-80" key={index}>
                        <SwiperSlide>
                          <Link to={`/lugar-esperado/${article.googleId}`}>
                            <ArticleCard
                              key={article.id}
                              title={article.name}
                              image={article.reviews[0].photos[0]}
                              rating={article.rating}
                              address={article.address}
                            />
                          </Link>
                        </SwiperSlide>
                      </div>
                    ),
                )}
              </Swiper>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
            {/* <div className="text-center my-6">
              <button className="btn-blue">Ver más</button>
            </div> */}
          </div>
        </div>
      </section>{' '}

      {/* Culture */}
      <section  ref={cultureRef} className="my-10">
        <div className="sm:w-10/12 m-auto mt-10">
          <h3
            onClick={() => setShowedCulture(!showedCulture)}
            className="text-xl sm:text-3xl pl-2 font-bold btn-drop-down-blue flex items-center cursor-pointer"
          >
            Cultura
            <div className="icons">
              <svg
                className={`${!showedCulture ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#FFFFFF"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
              <svg
                className={`${showedCulture ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#FFFFFF"
              >
                <path d="m280-400 200-200 200 200H280Z" />
              </svg>
            </div>
          </h3>
          <div className={`${showedCulture ? 'block' : 'hidden'}`}>
            <div className={`relative px-2 sm:px-0 flex gap-2 mt-5 justify-around flex-wrap`}>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={'auto'}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                  },
                  480: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                {culturePlace.map(
                  (article, index) =>
                    article.reviews.length > 0 &&
                    article.reviews[0].photos.length > 0 && (
                      <div className="w-80" key={index}>
                        <SwiperSlide>
                          <Link to={`/lugar-esperado/${article.googleId}`}>
                            <ArticleCard
                              key={article.id}
                              title={article.name}
                              image={article.reviews[0].photos[0]}
                              rating={article.rating}
                              address={article.address}
                            />
                          </Link>
                        </SwiperSlide>
                      </div>
                    ),
                )}
              </Swiper>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
            {/* <div className="text-center my-6">
              <button className="btn-blue">Ver más</button>
            </div> */}
          </div>
        </div>
      </section>{' '}
    </>
  );
};
export default ExpectedDestination;
