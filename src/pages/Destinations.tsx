import Carousel from '../components/Carousel';
import { Header } from '../components/Header';

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

const Destinations = () => {
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

        <div className="flex my-6 container mx-auto">
          <div className="flex-1 hidden md:block ">
            {/* Mapa svg */}
            <div className="flex justify-center items-center h-full ">
              <svg width="100%" height="100%">
                <g fill="#18a0fb" stroke="#555">
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="m498 662-2 2 2-1zm-44 9v20l11 3 4-2 3 1 1-3-7-2-12-12 2-3zm53-6 3 1 1-2h-2l6-2-2-2h2l-3-1v2-2l-3-1-1 5-1-1-2 2 2 4v-3zm-5-6 1 1-3-1v2l2 1-1-1-1 1h2-2v2l-3 1 2 2 3-3h2l3-5h-4zm-24 32h-2l3 1 2-2-2 1zm26-33 2 1-2-1zm0 8zm0 1v1zM589 0z"
                    aria-describedby="leaflet-tooltip-835"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="M456 556v-8l-8-3-5-7-4 4v8l2 7-3 1-2 6 1 1-2 2v6l3 1 2-1-1-1 2-2 4-1 1-4h2l7-7h2l-1-2z"
                    aria-describedby="leaflet-tooltip-997"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="M465 509h-4l1 11 3 3v13l9 1-1-20 2-5h-2v-2l-2-1h-6z"
                    aria-describedby="leaflet-tooltip-793"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="M509 483h-16l-2 16 1 2-2 7 2 9-6 9h7l5-6 3-1-3-6 1-5 6-7v-8l4-9z"
                    aria-describedby="leaflet-tooltip-816"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="m472 497-4-8h-2l1-1-2-3-3 1-6-2-3-3-5 4 4 4-1 5h4l6 6 2 7 2 2h4l2-10z"
                    aria-describedby="leaflet-tooltip-844"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="m468 472-1-1-1 2-2-2 2-4-2-2h-10v7l2 4-2 2-1-1-2 4 10 5 4-1 1 3 4 3 2 6 3-2v-7h-2l1-4-5-3-1-9z"
                    aria-describedby="leaflet-tooltip-845"
                  />
                  <path d="M477 472h-9v6l3 5 3-1 3-9z" aria-describedby="leaflet-tooltip-815" />
                  className='hover:fill-[#E88E20] transition-all duration-300'{' '}
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="m512 476-16-14h-2v-2l-5-2v2l-6 8h10v15h16l2-5-1-1 2-1z"
                    aria-describedby="leaflet-tooltip-842"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="m512 476 1-5 4-4-3-3-5-1-3-3-9-4-7-6v-2l-1 10 5 2v2h2l16 14z"
                    aria-describedby="leaflet-tooltip-841"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="M459 612h-22l-2 2v9l-1-1v2h-2l1 1-2 4 2 2-1 3-1-1v4h-2l-1 3-2-1-1 8 3 7 2-2 3 1-1 8 3 2v2h11l9 3-3-7h-4l4-1-1-5-2 1 2-2v-3l4-3-2-2 1-2v2l3 1 3-9 4-5h2l4-4-2-2-1 1 3-3v-2l-7-3-3-3v-4z"
                    aria-describedby="leaflet-tooltip-843"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="m474 581-41 1v4l4 8-2 4 5 3-2 2h-4l4 3-1 3-1-1v4h23l4-6 4-2 4 1-1-3 3-3-1-4 2-5 4-2-4-2 3-1 2 1v2l3-1-1-6-3 2h2l-1 1h-2l-3-3z"
                    aria-describedby="leaflet-tooltip-790"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="m461 512-4-2-4 2-2-3-3 1-3 4v4h2v6l-2 2-1 5-2 1 2 2-1 3 5 8 4 2 1-1 2 2v-11h10l1-3v-5l-2-2 1-5-3-3-1-7z"
                    aria-describedby="leaflet-tooltip-783"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="m491 499-3-1-1-3-13-2 1 2-3 2-2 6v6l5 2-1 19h9v-4h3l6-9 1-2-3-5 2-9z"
                    aria-describedby="leaflet-tooltip-788"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="m512 523-1-3 3-4-1-7 2-8-4-4h-2l-5 3 1 1-6 7-1 5 5 7 9 3z"
                    aria-describedby="leaflet-tooltip-839"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="m448 486-2 4 1 7-3 3v4l-1-1 2 11 3-2v-2l3-1 1 3 4-2 5 2 1-4 3 1-6-11-8-5 1-3-4-4z"
                    aria-describedby="leaflet-tooltip-836"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="m473 446-5-2-6 6v6l3 3 3-5v3l4 4h4l3-2v-4h-4v-2l-3-3 1-4z"
                    aria-describedby="leaflet-tooltip-936"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="M493 483v-15h-15l-5 19 2 2v4l12 2 1 3 3 1z"
                    aria-describedby="leaflet-tooltip-837"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="M458 548h-2l1 9-9 8h-2v2l-3 3h-2l-2 4-4-1 1 7 38 1-1-8 2-2 5 3 7-1-4-2v-10l-3-3-12-2-1 1-7-4-2-2v-3z"
                    aria-describedby="leaflet-tooltip-791"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="m525 479-4 2-9-3-3 2v4l-4 8v6l6-1 4 4v-2l13-15-3-5zm-5 0 1 1-1-1zm-3 0zm4 1zm-1 0z"
                    aria-describedby="leaflet-tooltip-838"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="M527 484h2l10-8-1-8h-5l-1 6-5 5h-2l2 4z"
                    aria-describedby="leaflet-tooltip-840"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="m489 448-2-2-5-1h-2l-2 6-2-5-4 2 3 7h4v4l-3 3-4-2-1 1-1-3-2-1v-3l-3 5-3-3-1 2-7 4 1 3h9l2 2-2 4 2 2 2-2 2 2v-2h8v-3h4l7-8z"
                    aria-describedby="leaflet-tooltip-814"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="M483 530h-9v7h-19l1 11 3 1-1 2 2 2 7 4 1-1 12 2 3 3z"
                    aria-describedby="leaflet-tooltip-792"
                  />
                  <path
                    className="hover:fill-[#E88E20] transition-all duration-300"
                    d="m512 523-5-1-6-4-4 2-4 6h-10v45l4 2 3-1-1-7 2-2v-3h-2v-4l2 2 17-2 7-3 7-10-1-3-3-2v-7l-6-4-1 1 1-5zm-21 36h1zm0-1zm-1 10 1 1zm1-9zm-1 10v1zm22-45z"
                    aria-describedby="leaflet-tooltip-789"
                  />
                  <path d="m512 527-1 1 1-1z" aria-describedby="leaflet-tooltip-846" />
                  className='hover:fill-[#E88E20] transition-all duration-300'{' '}
                </g>
              </svg>
            </div>
          </div>

          <div className="flex-1 max-w-[600px] w-full flex flex-col gap-y-6 px-4 md:px-0">
            {/* Info */}
            {info.map((item, index) => {
              return (
                <div className="flex flex-col gap-y-4 text-center  ">
                  <h1>{item.place}</h1>
                  <p className="font-light text-gray-500 text-sm md:text-base lg:text-lg text-center">
                    {item.descripcion}
                  </p>

                  <div className="flex justify-center flex-wrap mx-4 gap-2">
                    {item.img.map((image) => (
                      <img
                        key={image.id}
                        src={image.src}
                        className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-cover"
                      />
                    ))}
                  </div>
                  <div>
                    <button className="btn-blue">Ver más</button>
                  </div>
                </div>
              );
            })}

            {/* Publicaciones */}
            <div className="">
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
                      <p className="font-light text-gray-500 text-sm md:text-base lg:text-lg text-center">
                        {item.descripcion}
                      </p>
                      <div className="flex justify-center flex-wrap mx-4 gap-2">
                        {item.img.map((image) => (
                          <img
                            key={image.id}
                            src={image.src}
                            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-cover"
                          />
                        ))}
                      </div>
                      <div className=" text-center">
                        <button className="btn-blue">Ver más publicaciones</button>
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Destinations;
