import { useState, useEffect } from 'react';

interface CarouselHook {
  currentSlide: number;
  goToNextSlide: () => void;
  goToPrevSlide: () => void;
}

// `length` es el número de slides, e `intervalTime` es opcional.
const useCarousel = (length: number, intervalTime = 3000): CarouselHook => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [length, intervalTime]);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  return { currentSlide, goToNextSlide, goToPrevSlide };
};

export default useCarousel;
