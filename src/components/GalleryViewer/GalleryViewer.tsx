import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

SwiperCore.use([Navigation, Pagination, Autoplay]);

export function FeaturedImageGalleryModal({ photos, closeModal }) {
  const [active, setActive] = useState(photos[0]);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div>
      {
        <div className="bg-black fixed inset-0 flex items-center justify-center z-[100]  bg-opacity-75">
          <div className=" rounded-lg  w-[100vw] h-[100vh] relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-4xl font-bold"
            >
              &times;
            </button>

            <div
              className="h-[85vh] w-full flex items-center justify-center overflow-hidden"
              onClick={handleBackgroundClick}
            >
              <img
                className="my-auto w-auto h-max-full  sm:h-full object-cover object-center"
                src={active}
                alt="Featured"
              />
            </div>

            <Swiper
              effect={'coverflow'}
              spaceBetween={10}
              slidesPerView={5}
              navigation
              onSlideChange={(swiper) => setActive(photos[swiper.activeIndex])}
              className="h-[15vh] cursor-pointer overflow-hidden"
            >
              {photos.map((imgelink, index) => (
                <SwiperSlide key={index}>
                  <img
                    onClick={() => setActive(imgelink)}
                    src={imgelink}
                    className={`h-full p-1  w-full cursor-pointer object-cover object-center ${
                      active === imgelink ? 'shadow-xl shadow-black p-0' : ''
                    }`}
                    alt={`gallery-image-${index}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      }
    </div>
  );
}
