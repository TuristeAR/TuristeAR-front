import { Link, useParams } from 'react-router-dom';
import useFetchItinerary from '../utilities/useFetchItinerary';
import { Header } from '../components/Header/Header';
import { UploadImageSharedGallery } from '../components/ItineraryCalendar/UploadImageSharedGallery';
import React, { useState, useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const SharedGallery = () => {
  const { itineraryId } = useParams();
  const { itinerary, activities } = useFetchItinerary(itineraryId || null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);
  const swiperRef = useRef(null);

  const openLightbox = (index) => {
    setInitialSlide(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  return (
    <>
      <Header />
      <UploadImageSharedGallery activities={activities} />

      <div className="border-b p-4 mb-4 border-gray-50 flex items-center">
        <Link to={`/itinerario/calendario/${itineraryId}`} className="md:mr-10">
          <img src={'/assets/arrow-prev.svg'} alt={'Regresar'} className={'w-[50px]'} />
        </Link>
        <h2 className="text-2xl font-bold text-primary-3">{itinerary?.name}</h2>
      </div>

      <div className="flex flex-col gap-10">
        {activities.map((activity, index) => (
          <details key={index} className="flex flex-col gap-6 p-4 bg-white rounded-lg shadow-md">
            <summary className="text-xl font-semibold text-primary-3 cursor-pointer hover:text-primary-4">
              {activity.name + ' | ' + activity.images.length}{' '}
              {activity.images.length != 1 ? ' imágenes' : ' imagen'}
            </summary>

            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              navigation
              slidesPerView={3}
              spaceBetween={10}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              className="w-full max-w-4xl mt-4"
            >
              {activity.images.length !== 0 ? (
                activity.images.map((image, imgIndex) => (
                  <SwiperSlide key={imgIndex}>
                    <div
                      className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer"
                      onClick={() => openLightbox(imgIndex)}
                    >
                      <img src={image} alt="Imagen" className="w-full h-48 object-cover" />
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <div className="flex items-center justify-center text-gray-400 text-xl">
                  No hay imágenes para mostrar sobre {activity.name.split('-')[0]}
                </div>
              )}
            </Swiper>
          </details>
        ))}
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full h-full max-w-4xl">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-3xl font-bold cursor-pointer z-10"
            >
              &times;
            </button>
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              navigation
              pagination={{ clickable: true }}
              slidesPerView={1}
              initialSlide={initialSlide}
              onSwiper={(swiper) => {
                if (swiperRef.current) swiperRef.current = swiper;
              }}
              className="w-full h-full"
            >
              {activities
                .flatMap((activity) => activity.images)
                .map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt="Imagen ampliada"
                      className="w-full h-full object-contain"
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};
