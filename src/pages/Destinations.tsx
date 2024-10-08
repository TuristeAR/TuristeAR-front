import Carousel from '../components/Destinations/Carousel';
import { Header } from '../components/Header/Header';
import { MapaArg } from '../components/Destinations/MapaArg';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../utilities/http.util';

type Province = {
  id: number;
  name: string;
  description: string;
  images: string[];
  places: Place[]
}

const reviews = [
  {
    imgPerson: '/assets/person.svg',
    usuario: 'Pablo Ramirez',
    fecha: '26 Sep 2024',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
  },
  {
    imgPerson: '/assets/person.svg',
    usuario: 'Victor Gonzalez',
    fecha: '26 Sep 2024',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
  },
  {
    imgPerson: '/assets/person.svg',
    usuario: 'Malena Yannone',
    fecha: '26 Sep 2024',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
  },
  {
    imgPerson: '/assets/person.svg',
    usuario: 'Belen Peña',
    fecha: '26 Sep 2024',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
  },
  {
    imgPerson: '/assets/person.svg',
    usuario: 'Gabriel Fuentes',
    fecha: '26 Sep 2024',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
  },
];

interface Review {
  id: number;
  createdAt: string;
  publishedTime: string;
  rating: number;
  text: string;
  authorName: string;
  authorPhoto: string;
  photos: string[];
}

interface Place {
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
  phoneNumber: string | null;
  reviews: Review[];
}



const Destinations = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [reviews, setReviews] = useState<Province>(); 

  const scrollToSection = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRedirect = () => {
    navigate(`/destino-esperado/${selectedProvince?.name}`);
  };

  const [selectedProvince, setSelectedProvince] = useState<Province>();

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await get('https://api-turistear.koyeb.app/province', {
          'Content-Type': 'application/json',
        });

        setSelectedProvince(response.data[0]);
        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      if (selectedProvince) {
        try {
          const response = await get(`https://api-turistear.koyeb.app/provinces/${selectedProvince.id}`, {
            'Content-Type': 'application/json',
          });
          console.log(response)
          setReviews(response);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      }
    };

    fetchReviews();
  }, [selectedProvince]);

  const handleProvinceClick = (id: number) => {
    const province = provinces.find((p) => p.id === id);
    setSelectedProvince(province);
  };

  return (
    <>
      <Header />
      <section>
        <div className="bg-[#E6E6E6] w-full h-[120px]">
          <div className="container mx-auto h-full flex flex-col items-center justify-center gap-y-4 ">
            <p className="px-8 lg:px-0 max-w-[600px] text-center font-semibold tracking-tight   ">
              Si ya sabés cuál es tu destino, seleccionalo para descubrir los mejores lugares y
              actividades
            </p>
            <div>
              <form action="" className="flex items-center relative ">
                <input
                  className=" w-[250px] md:w-[400px]  rounded outline-none text-sm p-1  pr-10"
                  type="text"
                  placeholder="Buscar por provincia, localidad o tipo de lugar..."
                />
                <img src="/assets/search.svg" className="absolute right-2" alt="" />
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap my-6 container mx-auto gap-1 p-4">
          <div className="flex-1 md:w-[400px] xl:w-auto">
            <div className="flex justify-center items-center" onClick={scrollToSection}>
              <MapaArg onProvinceClick={handleProvinceClick} />
            </div>
          </div>
          <div ref={sectionRef} className="flex-1  max-w-[600px] w-full flex flex-col gap-y-6 ">
            <div className="flex flex-col gap-y-4">
              <h1 className="text-center">{selectedProvince?.name} </h1>
              <p className="font-light text-gray-500 text-sm md:text-base lg:text-lg text-start">
                {selectedProvince?.description}
              </p>
              <div className="flex justify-center gap-2 overflow-hidden">
                {selectedProvince?.images.map((image, index) => (
                  <div
                    key={index}
                    className="w-[150px] h-[100px] md:w-[300px] md:h-[300px] overflow-hidden"
                  >
                    <img
                      key={image}
                      src={image}
                      className="w-full h-full object-cover"
                      alt={selectedProvince?.name}
                    />
                  </div>
                ))}
              </div>
              <div>
                <button className="btn-blue" onClick={handleRedirect}>
                  Descrubí más de {selectedProvince?.name}{' '}
                </button>
              </div>
            </div>
            <div className="border-b border-gray my-4 "></div>
            <Carousel>
              {reviews?.places.map((item, index) => {
                return (
                  <div className="flex flex-col gap-y-4" key={index}>
                    <div className="flex justify-between items-center px-2 text-gray">
                      <div className="flex items-center gap-4  ">
                        <div className="rounded-full p-2 border border-1 border-black">
                          <img className="w-8 h-8" src={item.reviews[0].authorPhoto} alt="person" />
                        </div>
                        <p>{item.reviews[0].authorName}</p>
                      </div>
                      <p>{item.reviews[0].publishedTime}</p>
                    </div>
                    <p className="font-light text-gray-500 text-sm md:text-base lg:text-lg text-start">
                      {item.reviews[0].text}
                    </p>
                    <div className="flex justify-center gap-2">
                      {item.reviews[0].photos.map((image, index) => (
                        <div
                          key={index}
                          className="w-[150px] h-[100px] md:w-[200px] md:h-[170px] overflow-hidden"
                        >
                          <img
                            key={index}
                            src={image}
                            className="w-full h-full object-cover"
                            alt={selectedProvince?.name}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <button className="btn-blue">Ver más publicaciones</button>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </section>
    </>
  );
};

export default Destinations;
