import React, { ReactNode } from 'react';
import useCarousel from '../utilities/useCarousel';

interface CarouselProps {
  children: ReactNode; // Ahora aceptamos ReactNode en lugar de ReactNode[]
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const length = React.Children.count(children);
  const { currentSlide, goToNextSlide, goToPrevSlide } = useCarousel(length, 3000);

  return (
    <div className="relative  overflow-hidden">
      {/* Contenedor de las imágenes */}
      <div
        className="flex h-full transition-transform ease-in-out duration-1000"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      {/* <div className="absolute inset-0 flex justify-between items-center px-4">
        <button
          onClick={goToPrevSlide}
          className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        >
          &#9664;
        </button>
        <button
          onClick={goToNextSlide}
          className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        >
          &#9654;
        </button>
      </div> */}
    </div>
  );
};

export default Carousel;
