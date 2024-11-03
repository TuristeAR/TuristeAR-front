import { useRef } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { EventCard } from '../ItineraryCalendar/EventCard';

function Events({ events, selectedEvents, onEventSelect }) {
  const swiperRef = useRef(null);
  return (
    <>
      <Swiper
        ref={swiperRef}
        className="w-full max-w-[90%] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px] xl:max-w-[750px]"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        slidesPerGroup={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
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
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Events;
