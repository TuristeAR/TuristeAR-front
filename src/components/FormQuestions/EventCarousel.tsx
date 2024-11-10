import { useRef, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import prevArrow from '/assets/arrow-prev.svg';
import nextArrow from '/assets/arrow-next.svg';
import { EventCard } from './EventCard';

function EventCarousel({ localities, events, selectedEvents, onEventSelect }) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;

      if (swiper.params.navigation) {
        const navigation = swiper.params.navigation as {
          prevEl?: HTMLElement | null;
          nextEl?: HTMLElement | null;
        };

        navigation.prevEl = prevRef.current;
        navigation.nextEl = nextRef.current;

        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, []);

  return (
    <>
      <div className="w-[10%]" ref={prevRef}>
        <img src={prevArrow} alt="Previous" className="min-w-10 cursor-pointer" />
      </div>
      <Swiper
        ref={swiperRef}
        className="w-[90%]"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation={{
          prevEl: prevRef.current || undefined,
          nextEl: nextRef.current || undefined,
        }}
        slidesPerView={1}
        slidesPerGroup={1}
        loop={true}
      >
        {events.map((event) => (
          <SwiperSlide key={event.id}>
            <EventCard
              fromDate={event.fromDate}
              toDate={event.toDate}
              name={event.name}
              locality={localities.find((loc) => loc.name === event.locality)}
              description={event.description}
              image={event.image}
              id={event.id}
              isSelected={selectedEvents.includes(event.id)}
              onSelect={onEventSelect}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-[10%]" ref={nextRef}>
        <img src={nextArrow} alt="Next" className="min-w-10 cursor-pointer" />
      </div>
    </>
  );
}

export default EventCarousel;
