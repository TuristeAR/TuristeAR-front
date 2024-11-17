import Lottie from 'lottie-react';
import { useRef, useState, useEffect, SetStateAction } from 'react';
import logoAnimado from '../../assets/logoAnimado.json';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EventCard } from './EventCard';

const Loading = ({
  fetchEvents,
  selectedProvinces,
  localities,
  selectedEvents,
  handleEventSelect,
}) => {
  const [carouselEvents, setCarouselEvents] = useState<any[]>([]);

  useEffect(() => {
    if (selectedProvinces.length > 0) {
      fetchEvents(selectedProvinces[0].id).then((data: { data: SetStateAction<any[]>; }) => {
        setCarouselEvents(data.data);
      });
    }
  }, [selectedProvinces]);

  const swiperRef = useRef(null);
  return (
    <div className="w-[90%] md:w-full mx-auto min-h-[90vh] flex flex-col items-center justify-center">
      <div className="h-full flex flex-col md:flex-row justify-center items-center gap-x-4 my-4">
        <h2 className="text-4xl text-center text-primary-4 mx-auto mb-6 md:mb-0">
          Estamos armando el viaje ideal para vos...
        </h2>
        <Lottie className="w-[6rem] md:w-[4rem] mx-auto" animationData={logoAnimado} />
      </div>

      <Swiper
        ref={swiperRef}
        className="w-full max-w-[90%] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px] xl:max-w-[850px]"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        slidesPerGroup={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
      >
        {carouselEvents.map((event) => (
          <SwiperSlide key={event.id}>
            <EventCard
              fromDate={event.fromDate}
              toDate={event.toDate}
              name={event.name}
              locality={localities.find((loc: { name: any; }) => loc.name === event.locality)}
              description={event.description}
              image={event.image}
              id={event.id}
              isSelected={selectedEvents.includes(event.id)}
              onSelect={handleEventSelect}
              isLoading={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Loading;
