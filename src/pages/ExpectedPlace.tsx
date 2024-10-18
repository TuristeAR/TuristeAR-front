import { Header } from '../components/Header/Header';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { PostCard } from '../components/Destinations/PostCard';
import GoogleMapComponent from '../components/GoogleMapComponent/GoogleMapComponent';
import { FeaturedImageGalleryModal } from '../components/GalleryViewer/GalleryViewer';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';

import logoAnimado from '../assets/logoAnimado.json';



const infoHotel = {
  place: 'Hotel Awwa duites & Spa',
  descripcion:
    'Conocido a menudo como el Microcentro, San Nicolás es el centro neurálgico comercial y aras del mundo, bordea el elevado Obelisco, un punto de referencia nacional y un popular lugar de selfies. Venerada por su acústica, la fastuosa ópera del Teatro Colón también ofrece visitas guiadas por sus bastidores. En la avenida Corrientes, se pueden encontrar teatros de estilo art déco iluminados con neón, restaurantes de pizza informales y librerías nocturnas.',
};

type Departamento = {
  id: string;
  nombre: string;
};

type Municipio = {
  id: string;
  nombre: string;
};

type Provincia = {
  id: string;
  nombre: string;
};

type Ubicacion = {
  departamento: Departamento;
  lat: number;
  lon: number;
  municipio: Municipio;
  provincia: Provincia;
};
type RespuestaGeoref = {
  ubicacion: Ubicacion;
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
  phoneNumber: string;
};

const ExpectedPlace = () => {
  const { googleId } = useParams();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [place, setPlace] = useState<Place>(null);
  const [loading, setLoading] = useState(true);
  const [showHours, setShowHours] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [address, setAddress] = useState<RespuestaGeoref>();
  let photosHeader: string[] = [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log('Google ID:', googleId);

    if (!googleId || googleId === 'undefined') {
      console.error('googleId is undefined or invalid');
      return;
    }

    const fetchReviews = async () => {
      const response = await fetch(`https://api-turistear.koyeb.app/reviews/place/${googleId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    };

    const fetchPlace = async () => {
      const response = await fetch(`https://api-turistear.koyeb.app/place/${googleId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching place');
      }

      return response.json();
    };

    const fetchData = async () => {
      try {
        const [reviewsData, placeData] = await Promise.all([fetchReviews(), fetchPlace()]);

        setReviews(reviewsData);
        setPlace(placeData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
      }
    };

    fetchData();
  }, [googleId]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (place.address) {
        try {
          const response = await fetch(
            `https://apis.datos.gob.ar/georef/api/ubicacion?lat=${place.latitude}&lon=${place.longitude}`,
          );
          if (!response.ok) throw new Error('Error fetching address');
          const data = await response.json();
          setAddress(data);
        } catch (error) {
          console.error('Error fetching address:', error);
        }
        setLoading(false);
      }
    };

    fetchAddress();
  }, [place]);
  if (place) {
    photosHeader = reviews
      .map((i) => i.photos)
      .flat()
      .filter((i) => i != null);
  }
  if (loading) {
    return <div className='w-screen h-screen flex'>
      <Lottie className="w-[20rem] m-auto" animationData={logoAnimado} />
    </div>
  }

  const toggleHours = () => {
    setShowHours(!showHours);
  };
  const toggleReviews = () => {
    setVisibleCount((prevCount) => prevCount + 2);
  };

  return (
    <>
      <Header />

      <section className="w-full mb-5">
        <div className="sm:w-10/12 m-auto">
          <div onClick={() => openModal()}>
            {photosHeader.length>0?<ImageGallery images={photosHeader} height={70}></ImageGallery>:""}
          </div>
          {isModalOpen && (
            <FeaturedImageGalleryModal closeModal={closeModal} photos={photosHeader} />
          )}
          <div className="px-2 sm:px-0 flex flex-col gap-y-4">
            <h1 className="text-center">{place.name}</h1>
            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <p className="w-11/12 mx-auto font-light text-gray-500 text-sm md:text-base lg:text-lg text-justify sm:text-start">
                {infoHotel.descripcion}
              </p>
              <div className="flex mx-auto">
                <div className="flex flex-col items-center max-lg:justify-center w-full h-full">
                  <div className="flex flex-row items-center  ">
                    <div className="flex items-center justify-start gap-3 mb-4">
                      {[...Array(Math.round(place.rating))].map((_, index) => (
                        <svg
                          key={index}
                          className="items-end ml-auto"
                          xmlns="http://www.w3.org/2000/svg"
                          height="30px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#49A2EC"
                        >
                          <path d="m223-107 68-292L64-596l300-25 116-276 117 276 299 25-227 197 68 292-257-155-257 155Z" />
                        </svg>
                      ))}
                    </div>
                    <h2 className="font-manrope ml-2 font-bold text-5xl text-primary text-center mb-1">
                      {place.rating}
                    </h2>
                  </div>
                  <div className="flex gap-2 justify-between">
                    <a
                      href={'link'}
                      className="border inline-flex items-center px-1 py-1 text-[10px] font-medium text-center text-primary bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Palermo
                    </a>
                    <a
                      href={'link'}
                      className="border inline-flex items-center px-3 py-1 text-[10px] font-medium text-center text-primary bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      CABA
                    </a>
                    <a
                      href={'link'}
                      className="border inline-flex items-center px-3 py-1 text-[10px] font-medium text-center text-primary bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Palermo
                    </a>
                  </div>
                  <div className="flex flex-col gap-1 font-light text-gray-500 text-sm  lg:text-md w-full">
                    <div className="flex flex-nowrap gap-1">
                      <div>
                        <svg
                          className="fill-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#e8eaed"
                        >
                          <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                        </svg>
                      </div>

                      <div className="flex sm:w-[200px]">
                        <span>
                          {place.address? place.address:address.ubicacion.departamento.nombre},{address.ubicacion.provincia.nombre}
                        </span>
                      </div>
                    </div>

                    {place.phoneNumber ? (
                      <div className="flex gap-1">
                        <div>
                          <svg
                            className="fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e8eaed"
                          >
                            <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                          </svg>
                        </div>

                        <span>{place.phoneNumber}</span>
                      </div>
                    ) : (
                      ''
                    )}

                    <div className="flex gap-1 flex-nowrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`fill-primary`}
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                      >
                        <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                      </svg>

                      <div className="flex flex-col sm:w-[180px] justify-between">
                        {place.openingHours.slice(0, 2).map((i) => (
                          <span>{i}</span>
                        ))}
                        {showHours && place.openingHours.slice(2).map((i) => <span>{i}</span>)}
                      </div>
                      <svg
                        onClick={toggleHours}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`fill-primary ${!showHours ? 'block' : 'hidden'}`}
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                      >
                        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                      </svg>
                      <svg
                        onClick={toggleHours}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`fill-primary ${showHours ? 'block' : 'hidden'}`}
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e8eaed"
                      >
                        <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Map */}
      <section>
        <div className="sm:w-10/12 m-auto mt-20">
          <h3 className="text-4xl pl-1 sm:pl-0 font-bold ">Ubicación</h3>
          <hr />
          <div className='"w-full mt-5'>
            <GoogleMapComponent latitud={place.latitude} longitud={place.longitude} nombre={place.openingHours}></GoogleMapComponent>
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <section>
        <div className="sm:w-10/12 m-auto mt-20">
          <h3 className="text-4xl font-bold pl-1 sm:pl-0">
            Descubre lo que cuentan nuestros usuarios
          </h3>
          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
         {reviews.length>0 ? reviews.slice(0, visibleCount).map((userPost, index) => (
              <PostCard
                key={index}
                imgPerson={userPost.authorPhoto}
                usuario={userPost.authorName}
                fecha={userPost.publishedTime}
                descripcion={userPost.text}
                img={userPost.photos}
                place={place.name}
                province={`${address.ubicacion.departamento.nombre} - ${address.ubicacion.provincia.nombre}`}
                rating={userPost.rating}
              />
            )):""}
           
          </div>

          <div className="flex gap-2 mt-5 justify-around flex-wrap">
            {reviews.length < visibleCount ? (
              ''
            ) : (
              <button onClick={toggleReviews} className="btn-blue">
                Ver más publicaciones
              </button>
            )}
          </div>
        </div>
      </section>
      <div className="h-4"></div>
    </>
  );
};
export default ExpectedPlace;
