import Carousel from '../components/Carousel';
import { Header } from '../components/Header';
import MapaArg from '../components/MapaArg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import provinciasData from '../data/provinces-data.json';

type Image = {
  id: number;
  src: string;
};
type Province = {
  id: string;
  name: string;
  description: string;
  img: Image[];
};

const provincias: Province[] = provinciasData;
const usuariosReview = [
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

const Destinations = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/destino-esperado/${selectedProvince?.name}`);
  };
  const [selectedProvince, setSelectedProvince] = useState<Province>();
  useEffect(() => {
    setSelectedProvince(provincias[3]);
  }, []);
  const handleProvinceClick = (name: string) => {
    const province = provincias.find((p) => p.id === name);
    setSelectedProvince(province);
  };

  return (
    <>
      <Header containerStyles="bg-primary" />
      <section>
        <div className="bg-[#E6E6E6] w-full h-[120px]">
          <div className="container mx-auto h-full flex flex-col items-center justify-center gap-y-4 ">
            <p className="px-8 lg:px-0 max-w-[600px] text-center font-semibold tracking-tight   ">
              Si ya sabes cual es tu destino seleccionalo para descubrir los mejores lugares y
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
            {/* Mapa svg */}
            <div className="flex justify-center items-center">
              <MapaArg
                onProvinceClick={handleProvinceClick}
                defaultProvinceId={selectedProvince?.id}
              ></MapaArg>
            </div>
          </div>

          <div className="flex-1 mx-auto max-w-[600px] w-full flex flex-col gap-y-6 ">
            {/* Info */}

            <div className="flex flex-col gap-y-4">
              <h1 className="text-center">{selectedProvince?.name} </h1>
              <p className="font-light text-gray-500 text-sm md:text-base lg:text-lg text-start">
                {selectedProvince?.description}
              </p>

              <div className="flex justify-center gap-2 overflow-hidden">
                {selectedProvince?.img.map((image, index) => (
                  <div
                    key={index}
                    className="w-[150px] h-[100px] md:w-[200px] md:h-[170px] overflow-hidden"
                  >
                    <img
                      key={image.id}
                      src={image.src}
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
            {/* Publicaciones */}
            <Carousel>
              {usuariosReview.map((item, index) => {
                return (
                  <div className="flex flex-col gap-y-4" key={index}>
                    <div className="flex justify-between items-center px-2 text-gray">
                      <div className="flex items-center gap-4  ">
                        <div className="rounded-full p-2 border border-1 border-black">
                          <img className="w-8 h-8" src={item.imgPerson} alt="person" />
                        </div>
                        <p>{item.usuario}</p>
                      </div>
                      <p>{item.fecha}</p>
                    </div>
                    <p className="font-light text-gray-500 text-sm md:text-base lg:text-lg text-start">
                      {item.description}
                    </p>
                    <div className="flex justify-center gap-2">
                      {item.img.map((image, index) => (
                        <div
                          key={index}
                          className="w-[150px] h-[100px] md:w-[200px] md:h-[170px] overflow-hidden"
                        >
                          <img
                            key={image.id}
                            src={image.src}
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
