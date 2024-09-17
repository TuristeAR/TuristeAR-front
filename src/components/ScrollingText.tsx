import { useEffect, useState } from 'react';

export const ScrollingText = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const translateX = scrollY % window.innerWidth;

  return (
    <div className="hidden md:block w-full text-center py-5 text-[80px] whitespace-nowrap overflow-hidden bg-primary text-white">
      <p
        className="inline-block whitespace-nowrap transition-transform duration-900 ease-out"
        style={{ transform: `translateX(-${translateX}px)` }}
      >
        VIAJÁ INTELIGENTE
        <span className="font-bold"> VIVÍ LA ARGENTINA </span>
        VIAJÁ INTELIGENTE
        <span className="font-bold"> VIVÍ LA ARGENTINA </span>
      </p>
    </div>
  );
};
