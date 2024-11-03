import { useRef, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { EventCard } from '../FormQuestions/EventCard';

function Events({ events, selectedEvents, onEventSelect, warningMessage }) {
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
      <Swiper
        ref={swiperRef}
        className="max-w-[350px]"
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
              id={event.id}
              fromDate={event.fromDate}
              toDate={event.toDate}
              name={event.name}
              locality={event.locality}
              description={event.description}
              image={event.image}
              isSelected={selectedEvents.includes(event.id)}
              onSelect={onEventSelect}
              warningMessage={warningMessage} 
              />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Events;
