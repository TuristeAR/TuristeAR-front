import { ArticleCard } from '../components/Destinations/ArticleCard';
import { Header } from '../components/Header/Header';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { PostCard } from '../components/Destinations/PostCard';
import React, { useEffect, useState } from 'react';
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
import { BedDouble, Building2, Ticket, UtensilsCrossed } from 'lucide-react';

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
  const [visibleCount, setVisibleCount] = useState(3);
  const { nombreDeLaProvincia } = useParams();
  const [province, setProvince] = useState<Province>();
  const [gastronomyPlace, setGastronomyPlace] = useState<PlaceCard[]>([]);
  const [pointsInterest, setPointsInterest] = useState<PlaceCard[]>([]);

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
            <div className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 p-4 border border-gray cursor-pointer hover:bg-primary hover:bg-opacity-50 transition duration-300">
              <BedDouble width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />
              <span className="sm:text-xl font-medium text-center mx-auto">Alojamiento</span>
            </div>
            <div className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 p-4 border border-gray cursor-pointer hover:bg-primary hover:bg-opacity-50 transition duration-300">
              <Ticket width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />
              <span className="sm:text-xl font-medium text-center">Atracciones</span>
            </div>
            <div className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 p-4 border border-gray cursor-pointer hover:bg-primary hover:bg-opacity-50 transition duration-300">
              <Building2 width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />
              <span className="sm:text-xl font-medium text-center">Ciudad</span>
            </div>
            <div className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 p-4 border border-gray cursor-pointer hover:bg-primary hover:bg-opacity-50 transition duration-300">
              <UtensilsCrossed width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />
              <span className="sm:text-xl font-medium text-center">Restaurant</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-3">
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
      <section className="my-10">
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
      <section className="my-10">
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
            <div className="text-center my-6">
              <button className="btn-blue">Ver más</button>
            </div>
          </div>
        </div>
      </section>{' '}
    </>
  );
};
export default ExpectedDestination;
