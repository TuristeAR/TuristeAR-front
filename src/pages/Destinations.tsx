import Carousel from '../components/Carousel';
import { Header } from '../components/Header';
import MapaArg from '../components/MapaArg';
import { useState, useEffect } from 'react';
const info = [
  {
    place: 'Buenos Aires - San Nicolas',
    descripcion:
      'Conocido a menudo como el Microcentro, San Nicolás es el centro neurálgico comercial y artístico de la ciudad. La avenida 9 de Julio, una de las calles más anchas del mundo, bordea el elevado Obelisco, un punto de referencia nacional y un popular lugar de selfies. Venerada por su acústica, la fastuosa ópera del Teatro Colón también ofrece visitas guiadas por sus bastidores. En la avenida Corrientes, se pueden encontrar teatros de estilo art déco iluminados con neón, restaurantes de pizza informales y librerías nocturnas.',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
  },
];
type Province = {
  id: string;
  nombre: string;
  descripcion: string;
};

const usuariosReview = [
  {
    imgPerson: '/assets/person.svg',
    usuario: 'Pablo Ramirez',
    fecha: '26 Sep 2024',
    descripcion:
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
    descripcion:
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
    descripcion:
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
    descripcion:
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
    descripcion:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
  },
];

const provincias = [
  {
    id: 'caba',
    nombre: 'Ciudad Autónoma de Buenos Aires',
    descripcion:
      'La provincia más poblada de Argentina, famosa por su rica cultura y su vibrante vida nocturna. Es hogar de la ciudad de Buenos Aires, conocida por el tango, la arquitectura y la gastronomía. Su diversidad geográfica incluye llanuras, lagunas y una extensa costa atlántica.',
  },
  {
    id: 'caba-z',
    nombre: 'Ciudad Autónoma de Buenos Aires',
    descripcion:
      'La provincia más poblada de Argentina, famosa por su rica cultura y su vibrante vida nocturna. Es hogar de la ciudad de Buenos Aires, conocida por el tango, la arquitectura y la gastronomía. Su diversidad geográfica incluye llanuras, lagunas y una extensa costa atlántica.',
  },
  {
    id: 'buenos-aires',
    nombre: 'Buenos Aires',
    descripcion:
      'La provincia más poblada de Argentina, famosa por su rica cultura y su vibrante vida nocturna. Es hogar de la ciudad de Buenos Aires, conocida por el tango, la arquitectura y la gastronomía. Su diversidad geográfica incluye llanuras, lagunas y una extensa costa atlántica.',
  },
  {
    id: 'catamarca',
    nombre: 'Catamarca',
    descripcion:
      'Situada en el noroeste, destaca por sus montañas y valles fértiles. Su economía se basa en la agricultura, especialmente en la producción de frutas y hortalizas. Además, tiene un rico patrimonio cultural con influencias indígenas.',
  },
  {
    id: 'chaco',
    nombre: 'Chaco',
    descripcion:
      'Conocida por su biodiversidad y vastas extensiones de tierras fértiles. La economía se centra en la agricultura y la ganadería, además de ser un importante productor de algodón. Su cultura refleja una mezcla de tradiciones indígenas y coloniales.',
  },
  {
    id: 'chubut',
    nombre: 'Chubut',
    descripcion:
      'Famosa por sus impresionantes paisajes patagónicos, incluyendo la Península Valdés, hogar de diversas especies marinas. La economía se basa en la pesca, el turismo y la producción de petróleo. También destaca su historia galesa y cultural.',
  },
  {
    id: 'cordoba',
    nombre: 'Córdoba',
    descripcion:
      'Un importante centro educativo y cultural, conocido por su arquitectura colonial y su vibrante vida estudiantil. La provincia alberga numerosas universidades y una rica historia. Su economía se basa en la agricultura, la industria y el turismo.',
  },
  {
    id: 'corrientes',
    nombre: 'Corrientes',
    descripcion:
      'Famosa por su carnaval y su rica tradición cultural, esta provincia es conocida por sus festivales y danzas. Su economía está centrada en la agricultura y la ganadería, con producción de arroz y yerba mate. También destaca por sus paisajes naturales.',
  },
  {
    id: 'entre-rios',
    nombre: 'Entre Ríos',
    descripcion:
      'Conocida por sus termas y paisajes naturales, es un destino popular para el turismo. Su economía se basa en la agricultura, especialmente en la producción de frutas y verduras. También es famosa por su rica historia y tradiciones.',
  },
  {
    id: 'formosa',
    nombre: 'Formosa',
    descripcion:
      'Región de selvas y humedales, ideal para la biodiversidad y la pesca. Su economía se centra en la agricultura y la ganadería, así como en el ecoturismo. Formosa también es rica en cultura indígena y tradiciones locales.',
  },
  {
    id: 'jujuy',
    nombre: 'Jujuy',
    descripcion:
      'Famosa por sus montañas de colores, como el Cerro de los Siete Colores. La cultura indígena es fuerte en esta región, con numerosas tradiciones y festivales. Su economía se basa en la agricultura y el turismo.',
  },
  {
    id: 'la-pampa',
    nombre: 'La Pampa',
    descripcion:
      'Conocida por sus vastas llanuras, es un importante centro de producción agrícola y ganadera. Su paisaje está dominado por campos de cultivo y cría de ganado. También cuenta con una rica cultura gauchesca.',
  },
  {
    id: 'la-rioja',
    nombre: 'La Rioja',
    descripcion:
      'Famosa por su producción de vino y paisajes montañosos. La provincia tiene un rico patrimonio histórico y cultural, con influencias indígenas y coloniales. Su economía se centra en la viticultura y el turismo.',
  },
  {
    id: 'mendoza',
    nombre: 'Mendoza',
    descripcion:
      'Reconocida mundialmente por sus vinos, especialmente el Malbec, y sus impresionantes paisajes montañosos. Mendoza es un importante destino turístico, con muchas bodegas y actividades al aire libre. Su economía se basa en la viticultura y el turismo.',
  },
  {
    id: 'misiones',

    nombre: 'Misiones',
    descripcion:
      'Hogar de las majestuosas Cataratas del Iguazú, es conocida por su biodiversidad y rica cultura guaraní. La economía se centra en el turismo y la producción de yerba mate. Misiones es un destino único con paisajes naturales excepcionales.',
  },
  {
    id: 'neuquen',

    nombre: 'Neuquén',
    descripcion:
      'Famosa por sus paisajes patagónicos, montañas y lagos. La economía se basa en la producción de petróleo y gas, además del turismo. También es conocida por sus actividades al aire libre y deportes extremos.',
  },
  {
    id: 'rio-negro',

    nombre: 'Río Negro',
    descripcion:
      'Conocida por sus frutales y producción de vino en la región de la Patagonia. La economía se basa en la agricultura, la ganadería y el turismo. También ofrece paisajes variados, desde montañas hasta costas.',
  },
  {
    id: 'salta',

    nombre: 'Salta',
    descripcion:
      'Famosa por sus montañas y tradiciones indígenas, es un destino turístico atractivo. La provincia es conocida por su producción de vino y paisajes naturales impresionantes. Su cultura se refleja en su arquitectura y festividades.',
  },
  {
    id: 'san-juan',

    nombre: 'San Juan',
    descripcion:
      'Conocida por su producción vitivinícola y paisajes áridos, especialmente el Malbec. La economía se centra en la viticultura y la minería. San Juan también alberga el Parque Nacional Ischigualasto, famoso por sus formaciones geológicas.',
  },
  {
    id: 'san-luis',

    nombre: 'San Luis',
    descripcion:
      'Famosa por sus paisajes montañosos y su producción agrícola, incluyendo frutas y verduras. La provincia ofrece diversas actividades al aire libre y tiene un rico patrimonio cultural. Su economía está en crecimiento y diversificación.',
  },
  {
    id: 'santa-cruz',

    nombre: 'Santa Cruz',
    descripcion:
      'La provincia más grande de Argentina, conocida por sus paisajes impresionantes y la cordillera de los Andes. La economía se basa en la minería y el turismo, especialmente en lugares como El Calafate. También destaca por su fauna y flora.',
  },
  {
    id: 'santa-fe',

    nombre: 'Santa Fe',
    descripcion:
      'Conocida por su producción agrícola y ganadera, especialmente en la región pampeana. Su economía es una de las más fuertes del país. Santa Fe también es rica en historia, cultura y tradiciones.',
  },
  {
    id: 'santiago-del-estero',

    nombre: 'Santiago del Estero',
    descripcion:
      'Región con una rica herencia cultural y famosa por su folclore. Su economía se basa en la agricultura y la ganadería. La provincia también es conocida por sus festivales y tradiciones populares.',
  },
  {
    id: 'tierra-del-fuego',

    nombre: 'Tierra del Fuego, Antártida e Islas del Atlántico Sur',
    descripcion:
      'La provincia más austral de Argentina, famosa por sus paisajes naturales y la ciudad de Ushuaia. Su economía se basa en el turismo y la pesca. También es conocida por su rica fauna y flora en un entorno único.',
  },
  {
    id: 'tucuman',

    nombre: 'Tucumán',
    descripcion:
      "Conocida como el 'Jardín de la República', destaca por su producción de azúcar y cítricos. La provincia tiene un rico patrimonio histórico y cultural. Su clima y paisajes son ideales para la agricultura.",
  },
];

const Destinations = () => {

  const [selectedProvince, setSelectedProvince] = useState<Province>();
   useEffect(() => {
    setSelectedProvince(provincias[3]);
  }, []);
  const handleProvinceClick = (nombre: string) => {
    const province = provincias.find((p) => p.id === nombre);
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

        <div className="flex my-6 container mx-auto gap-1">
          <div className="flex-1 hidden md:block ">
            {/* Mapa svg */}
            <div className="flex justify-center items-center">
              <MapaArg onProvinceClick={handleProvinceClick} defaultProvinceId={selectedProvince?.id}></MapaArg>
            </div>
          </div>
         
          <div className="flex-1 max-w-[600px] w-full flex flex-col gap-y-6 px-4 md:px-0">
            {/* Info */}
          
                <div  className="flex flex-col gap-y-4">
                  <h1 className="text-center">{selectedProvince?.nombre} </h1>
                  <p className="font-light text-gray-500 text-sm md:text-base lg:text-lg text-start">
                    {selectedProvince?.descripcion}
                  </p>

                  <div className="flex justify-center gap-2">
                    {info[0].img.map((image) => (
                      <img
                        key={image.id}
                        src={image.src}
                        className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-contain"
                      />
                    ))}
                  </div>
                  <div>
                    <button className="btn-blue">Ver más</button>
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
                      {item.descripcion}
                    </p>
                    <div className="flex justify-center gap-2">
                      {item.img.map((image) => (
                        <img
                          key={image.id}
                          src={image.src}
                          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-contain"
                        />
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
