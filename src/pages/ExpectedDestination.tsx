import { ArticleCard } from '../components/Destinations/ArticleCard';
import { Header } from '../components/Header/Header';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { PostCard } from '../components/Destinations/PostCard';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { get } from '../utilities/http.util';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const swipper = [
  { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
  { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
  { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
  { id: 4, src: '/assets/san-nicolas-buenos-aires.webp' },
  { id: 5, src: '/assets/san-nicolas-buenos-aires.webp' },
];

interface Culture {
  festivals: string;
  traditionalFood: string;
  music: string;
  customs: string;
}
type Province = {
  id: number;
  name: string;
  description: string;
  images: string;
  places: Place[];
}

type Review = {
  id: number;
  googleId: string;
  publishedTime: string;
  rating: number;
  text: string;
  authorName: string;
  authorPhoto: string;
  photos: string[];
}

type Place = {
  id: number;
  googleId: string;
  name: string;
  rating: number;
  reviews: Review[];
}

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
}

const ExpectedDestination = () => {
  const [showedLugares, setShowedLugares] = useState(false);
  const [showedCulturaTradicion, setShowedCulturaTradicion] = useState(false);
  const [showedGastronomia, setShowedGastronomia] = useState(false);
  const [visibleCount, setVisibleCount] = useState(2); 


  const { nombreDeLaProvincia } = useParams();
  const [provincia, setProvincia] = useState<Province>();
  const [gastronomyPlace, setGastronomyPlace] = useState<PlaceCard[]>([]);
  const [pointsInterest, setPointsInterest] = useState<PlaceCard[]>([]);


  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const response = await get(`https://api-turistear.koyeb.app/provinces/${nombreDeLaProvincia}`, {
          'Content-Type': 'application/json',
        });

        setProvincia(response);
      } catch (error) {
        console.error('Error fetching province:', error);
      }
    };

    fetchProvince();
  }, [nombreDeLaProvincia]);


  // Gastronomy
  useEffect(() => {
    const fetchGastronomyPlace = async () => {
      if (provincia) {  // Solo se ejecuta si provincia está definida
        try {
          const response = await get(`https://api-turistear.koyeb.app/places/province?provinceId=${provincia.id}&types=restaurant&types=food&count=6`, {
            'Content-Type': 'application/json',
          });

          setGastronomyPlace(response.data);
         
        } catch (error) {
          console.error('Error fetching GastronomyPlace:', error);
        }
      }
    };

    fetchGastronomyPlace();
  }, [provincia]);

  // points of interest
  useEffect(() => {
    const fetchPointsInterest = async () => {
      if (provincia) {
        try {
          const response = await get(`https://api-turistear.koyeb.app/places/province?provinceId=${provincia.id}&types=hiking_area&types=national_park&types=museum&types=park&types=library&count=6`, {
            'Content-Type': 'application/json',
          });

          setPointsInterest(response.data);
        } catch (error) {
          console.error('Error fetching GastronomyPlace:', error);
        }
      }
    };

    fetchPointsInterest();
  }, [provincia]);

  const toggleReviews = () => {
    setVisibleCount(prevCount => prevCount + 2);
  };

  if (!provincia) return <div></div>;

  return (
    <>
      <Header />

      <section className="w-full mb-5">
        <div className="sm:w-10/12 m-auto">
          <ImageGallery images={[provincia.images]} height={70}></ImageGallery>

          <div className="px-2 sm:px-0 flex flex-col gap-y-4">
            <h1 className="text-center">{provincia.name}
            </h1>
            <p className="font-light text-gray-500 text-sm md:text-base lg:text-lg text-center">
              {provincia.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-3">
            <div className="p-2 cursor-pointer">
              <svg
                className="bg-gray-50 hover:bg-primary hover:fill-white rounded-full p-2 m-auto"
                xmlns="http://www.w3.org/2000/svg"
                height="100px"
                viewBox="0 -960 960 960"
                width="100px"
                fill="#000000"
              >
                <path d="M280-240h40v-60h320v60h40v-160q0-33-23.5-56.5T600-480H460v140H320v-180h-40v280Zm110-120q21 0 35.5-14.5T440-410q0-21-14.5-35.5T390-460q-21 0-35.5 14.5T340-410q0 21 14.5 35.5T390-360ZM160-120v-480l320-240 320 240v480H160Zm60-60h520v-394L480-763 220-574v394Zm260-292Z" />
              </svg>
              <h3 className="sm:text-xl font-medium text-center mx-auto">Alojamiento</h3>
            </div>
            <div className="p-2 cursor-pointer">
              <svg
                className="bg-gray-50 hover:bg-primary hover:fill-white rounded-full p-2 m-auto"
                xmlns="http://www.w3.org/2000/svg"
                height="100px"
                viewBox="0 -960 960 960"
                width="100px"
                fill="#000"
              >
                <path d="M480-283q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm0-167q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm0-167q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm340 457H140q-24.75 0-42.37-17.63Q80-195.25 80-220v-153q37-8 61.5-37.5T166-480q0-40-24.5-70T80-587v-153q0-24.75 17.63-42.38Q115.25-800 140-800h680q24.75 0 42.38 17.62Q880-764.75 880-740v153q-37 7-61.5 37T794-480q0 40 24.5 69.5T880-373v153q0 24.75-17.62 42.37Q844.75-160 820-160Zm0-60v-109q-38-26-62-65t-24-86q0-47 24-86t62-65v-109H140v109q39 26 62.5 65t23.5 86q0 47-23.5 86T140-329v109h680ZM480-480Z" />
              </svg>
              <h3 className="sm:text-xl font-medium text-center">Atracciones</h3>
            </div>
            <div className="p-2 cursor-pointer">
              <svg
                className="bg-gray-50 hover:bg-primary hover:fill-white rounded-full p-2 m-auto"
                xmlns="http://www.w3.org/2000/svg"
                height="100px"
                viewBox="0 -960 960 960"
                width="100px"
                fill="#000000"
              >
                <path d="M120-120v-558h247v-92l113-110 113 110v258h247v392H120Zm60-60h106v-106H180v106Zm0-166h106v-106H180v106Zm0-166h106v-106H180v106Zm247 332h106v-106H427v106Zm0-166h106v-106H427v106Zm0-166h106v-106H427v106Zm0-166h106v-106H427v106Zm247 498h106v-106H674v106Zm0-166h106v-106H674v106Z" />
              </svg>
              <h3 className="sm:text-xl font-medium text-center">Ciudad</h3>
            </div>
            <div className="p-2 cursor-pointer">
              <svg
                className="bg-gray-50 hover:bg-primary hover:fill-white rounded-full p-2 m-auto"
                xmlns="http://www.w3.org/2000/svg"
                height="100px"
                viewBox="0 -960 960 960"
                width="100px"
                fill="#000000"
              >
                <path d="M285-80v-368q-52-11-88.5-52.5T160-600v-280h60v280h65v-280h60v280h65v-280h60v280q0 58-36.5 99.5T345-448v368h-60Zm415 0v-320H585v-305q0-79 48-127t127-48v800h-60Z" />
              </svg>
              <h3 className="sm:text-xl font-medium text-center">Restaurant</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Posts usuarios */}
      <section>
        <div className="sm:w-10/12 m-auto mt-20">
          <h3 className="text-xl sm:text-4xl font-bold pl-1 sm:pl-0">
            Descubre lo que cuentan nuestros usuarios
          </h3>
          <hr />
          <div className="flex gap-2 mt-5 justify-around flex-wrap">
          {provincia.places.slice(0,visibleCount).map((userPost, index) => (
              <PostCard
                key={index}
                imgPerson={userPost.reviews[0].authorPhoto}
                usuario={userPost.reviews[0].authorName}
                fecha={userPost.reviews[0].publishedTime}
                descripcion={userPost.reviews[0].text}
                place={userPost.name}
                province={provincia.name}
                img={userPost.reviews[0].photos}
                rating={userPost.reviews[0].rating}
              />
            ))}
          </div>
          <div className="text-center mt-5">
          {provincia.places.length<=visibleCount?"":

            <button             onClick={toggleReviews}
            className="btn-blue">Ver más publicaciones</button>}
          </div>
        </div>
      </section>

      {/* Puntos de interes */}
      <section>
        <div className="sm:w-10/12 m-auto mt-10">
          <h3
            onClick={() => setShowedLugares(!showedLugares)}

            className="text-xl sm:text-3xl pl-2 font-bold btn-drop-down-blue flex items-center">Lugares
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
                slidesPerView={pointsInterest.length <= 2 ? 1 :4}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                breakpoints={{
                  // cuando el ancho de la ventana es >= 320px
                  320: {
                    slidesPerView: 1, // Mostrar 1 diapositiva
                    spaceBetween: 10,
                  },
                  // cuando el ancho de la ventana es >= 480px
                  480: {
                    slidesPerView: 2, // Mostrar 2 diapositivas
                    spaceBetween: 10,
                  },
                  // cuando el ancho de la ventana es >= 768px
                  768: {
                    slidesPerView: 3, // Mostrar 3 diapositivas
                    spaceBetween: 10,
                  },
                  // cuando el ancho de la ventana es >= 1024px
                  1024: {
                    slidesPerView: 4, // Mostrar 4 diapositivas
                    spaceBetween: 10,
                  },
                }}
              >
                {pointsInterest.map((article, index) => (
                  <SwiperSlide key={index}>
                    <Link to={`/lugar-esperado/${article.googleId}`}>
                      <ArticleCard
                        key={article.id}
                        title={article.name}
                        images={article.reviews.length > 0 ? article.reviews[0].photos : []}
                        description={article.name}
                        rating={article.rating}
                        types={article.types}
                        address={article.address}
                      />
                    </Link>

                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-button-prev hidden"></div>
              <div className="hidden swiper-button-next"></div>
            </div>
            <div className="text-center mt-1">
              <button className="btn-blue">Ver Puntos de interes</button>
            </div>
          </div>
        </div>
      </section>

      {/* Cultura y tradiciones*/}
      <section>
        <div className="sm:w-10/12 m-auto mt-10">
          <h3
            onClick={() => setShowedCulturaTradicion(!showedCulturaTradicion)}
            className="text-xl sm:text-3xl pl-2 font-bold btn-drop-down-blue flex items-center"
          >
            Cultura y tradiciones
            <div className="icons">
              <svg
                className={`${!showedCulturaTradicion ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                height="50px"
                viewBox="0 -960 960 960"
                width="50px"
                fill="#FFFFFF"
              >
                <path d="M480-360 280-560h400L480-360Z" />
              </svg>
              <svg
                className={`${showedCulturaTradicion ? 'block' : 'hidden'}`}
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
          <div className={`${showedCulturaTradicion ? 'block' : 'hidden'}`}>
            <div className="flex gap-2 mt-5 justify-around flex-wrap">
              <div className="mx-auto grid max-w-screen-xl rounded-lg bg-gray-2 lg:grid-cols-12 lg:gap-8 xl:gap-16">
                <div className="mx-auto lg:col-span-5 lg:mt-0 h-56 w-56 sm:h-96 sm:w-96 md:h-full md:w-full">
                  <a href="#">
                    <img
                      className="mb-4 mx-auto w-full h-full object-cover"
                      src={swipper[0].src}
                      alt="peripherals"
                    />
                  </a>
                </div>
                <div className="mx-auto place-self-center lg:col-span-7 md:p-8 lg:p-16 p-4">
                  <h1 className="mb-3 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
                    Festival
                  </h1>
                  {/*  <p className="mb-6 text-gray-500">{provincia.culture.festivals}</p> */}
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5 justify-around flex-wrap">
              <div className="mx-auto grid max-w-screen-xl rounded-lg bg-gray-2 lg:grid-cols-12 lg:gap-8 xl:gap-16">
                <div className="mx-auto lg:col-span-5 lg:mt-0 h-56 w-56 sm:h-96 sm:w-96 md:h-full md:w-full">
                  <a href="#">
                    <img
                      className="mb-4 mx-auto h-full w-full object-cover"
                      src={swipper[0].src}
                      alt="peripherals"
                    />
                  </a>
                </div>
                <div className="mx-auto place-self-center lg:col-span-7 md:p-8 lg:p-16 p-4">
                  <h1 className="mb-3 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
                    Comida tradicional
                  </h1>
                  {/*  <p className="mb-6 text-gray-500">{provincia.culture.traditionalFood}</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gastronomía */}
      <section>
        <div className="sm:w-10/12 m-auto mt-10">
          <h3
            onClick={() => setShowedGastronomia(!showedGastronomia)}
            className="text-xl sm:text-3xl pl-2 font-bold btn-drop-down-blue flex items-center"
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
                spaceBetween={5}
                slidesPerView={4}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                breakpoints={{
                  // cuando el ancho de la ventana es >= 320px
                  320: {
                    slidesPerView: 1, // Mostrar 1 diapositiva
                    spaceBetween: 10,
                  },
                  // cuando el ancho de la ventana es >= 480px
                  480: {
                    slidesPerView: 2, // Mostrar 2 diapositivas
                    spaceBetween: 10,
                  },
                  // cuando el ancho de la ventana es >= 768px
                  768: {
                    slidesPerView: 3, // Mostrar 3 diapositivas
                    spaceBetween: 10,
                  },
                  // cuando el ancho de la ventana es >= 1024px
                  1024: {
                    slidesPerView: 4, // Mostrar 4 diapositivas
                    spaceBetween: 10,
                  },
                }}
              >
                {gastronomyPlace?.map((article, index) => (
                  <SwiperSlide key={index}>
                    <Link to={`/lugar-esperado/${article.googleId}`}>
                    <ArticleCard 
                      key={article.id}
                      title={article.name}
                      images={article.reviews.length > 0 ? article.reviews[0].photos : []}
                      description={article.name}
                      rating={article.rating}
                      types={article.types}
                      address={article.address}
                    />
                    </Link>
                    
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="swiper-button-next"></div>
              <div className="swiper-button-prev"></div>
            </div>
            <div className="text-center mt-1">
              <button className="btn-blue">Ver Puntos de interes</button>
            </div>
          </div>
        </div>
      </section>      <div className="h-4"></div>

    </>
  );
};
export default ExpectedDestination;
