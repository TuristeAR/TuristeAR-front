import ArticleCard from '../components/ArticleCard';
import { Header } from '../components/Header/Header';
import ImageGallery from '../components/ImageGallery';
import PostCard from '../components/PostCard';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const infoHotel = [
  {
    place: 'Hotel Awwa duites & Spa',
    descripcion:
      'Conocido a menudo como el Microcentro, San Nicolás es el centro neurálgico comercial y aras del mundo, bordea el elevado Obelisco, un punto de referencia nacional y un popular lugar de selfies. Venerada por su acústica, la fastuosa ópera del Teatro Colón también ofrece visitas guiadas por sus bastidores. En la avenida Corrientes, se pueden encontrar teatros de estilo art déco iluminados con neón, restaurantes de pizza informales y librerías nocturnas.',
    img: [
      {
        id: 1,
        src: 'https://lh3.googleusercontent.com/p/AF1QipMbsuZz6kbPn72mv7yy3ke_FYQLLerGGMG6cNYw=s1360-w1360-h1020',
      },
      {
        id: 2,
        src: 'https://lh3.googleusercontent.com/proxy/RzvZmax6FkJW02jRnra0v_DkFPHjvaEpq2yTm4pBsxJYGzFSiD-eebSHHdECO1iMjb5xhqPNvjTmFgvA4Jsm3Joad-sZA9I2SJBY_Oinhk8KAOVPWOMaf_IkaMhciMTGOiZDDAPMlKEir9VaWRxdkLt_g2Ys1JA=s1360-w1360-h1020',
      },
      {
        id: 3,
        src: 'https://lh3.googleusercontent.com/p/AF1QipPCirEx8vGCnVxPkuF9wuz12RLI4LeoIa2HMi1C=s1360-w1360-h1020',
      },
      {
        id: 4,
        src: 'https://lh3.googleusercontent.com/p/AF1QipOCDtixR66cLv2kEp4gIdFlh8xs5wAoA2t7VTzg=s1360-w1360-h1020',
      },
      {
        id: 5,
        src: 'https://lh3.googleusercontent.com/p/AF1QipOAgC47KMUSvkUfLD8g2D4JInDES9pH0SDulT9y=s1360-w1360-h1020',
      },
    ],
  },
];

const swipper = [
  { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
  { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
  { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
  { id: 4, src: '/assets/san-nicolas-buenos-aires.webp' },
  { id: 5, src: '/assets/san-nicolas-buenos-aires.webp' },
];

const puntosDeInteres = [
  {
    title: 'Buenos Aires',
    description:
      'Conocido a menudo como el Microcentro, San Nicolás es el centro neurálgico comercial y artístico de la ciudad...',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 4, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 5, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
    link: '',
  },
  {
    title: 'Buenos Aires',
    description:
      'Conocido a menudo como el Microcentro, San Nicolás es el centro neurálgico comercial y artístico de la ciudad...',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 4, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 5, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
    link: '',
  },
  {
    title: 'Buenos Aires',
    description:
      'Conocido a menudo como el Microcentro, San Nicolás es el centro neurálgico comercial y artístico de la ciudad...',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
    link: '',
  },
  {
    title: 'Buenos Aires',
    description:
      'Conocido a menudo como el Microcentro, San Nicolás es el centro neurálgico comercial y artístico de la ciudad...',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
    link: '',
  },
  {
    title: 'Buenos Aires',
    description:
      'Conocido a menudo como el Microcentro, San Nicolás es el centro neurálgico comercial y artístico de la ciudad...',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
    link: '',
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
    img: [{ id: 1, src: '/assets/san-nicolas-buenos-aires.webp' }],
  },
];

const ExpectedPlace = () => {
  return (
    <>
      <Header containerStyles="bg-primary" />

      <section className="w-full mb-5">
        <div className="sm:w-10/12 m-auto">
          <ImageGallery images={infoHotel[0].img} height={70}></ImageGallery>
          {infoHotel.map((item, index) => {
            return (
              <div key={index} className="px-2 sm:px-0 flex flex-col gap-y-4">
                <h1 className="text-center">{item.place}</h1>
                <div className="flex gap-2">
                  <p className="w-11/12 font-light text-gray-500 text-sm md:text-base lg:text-lg text-start">
                    {item.descripcion}
                  </p>

                  <div className="flex">
                    <div className="flex flex-col items-center max-lg:justify-center w-full h-full">
                      <div className="flex flex-row items-center  ">
                        <div className="flex items-center justify-start gap-3 mb-4">
                          {[...Array(4)].map((_, index) => (
                            <svg
                            key={index}
                              className="items-end ml-auto"
                              xmlns="http://www.w3.org/2000/svg"
                              height="30px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#49A2EC"
                            >
                              <path d="m223-107 68-292L64-596l300-25 116-276 117 276 299 25-227 197 68 292-257-155-257 155Z" />
                            </svg>
                          ))}
                        </div>
                        <h2 className="font-manrope ml-2 font-bold text-5xl text-primary text-center mb-1">
                          4.3
                        </h2>
                      </div>
                      <div className="flex gap-2 justify-between">
                        <a
                          href={'link'}
                          className="border inline-flex items-center px-1 py-1 text-[10px] font-medium text-center text-primary bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                          Palermo
                        </a>
                        <a
                          href={'link'}
                          className="border inline-flex items-center px-3 py-1 text-[10px] font-medium text-center text-primary bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                          CABA
                        </a>
                        <a
                          href={'link'}
                          className="border inline-flex items-center px-3 py-1 text-[10px] font-medium text-center text-primary bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                          Palermo
                        </a>
                      </div>
                      <div className="flex flex-col gap-1 font-light text-gray-500 text-sm md:text-base lg:text-lg ">
                        <div className="flex gap-1">
                          <svg
                            className="fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            height="30px"
                            viewBox="0 -960 960 960"
                            width="30px"
                            fill="#e8eaed"
                          >
                            <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                          </svg>
                          <span>Lafinur 3370, C1425 Cdad. Autónoma de Buenos Aires</span>
                        </div>

                        <div className="flex gap-1">
                          <svg
                            className="fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#e8eaed"
                          >
                            <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                          </svg>
                          <span>011 3966-0000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Posts Usuarios */}
      <section>
        <div className="sm:w-10/12 m-auto mt-20">
          <h3 className="text-4xl pl-1 sm:pl-0 font-bold">Puntos de interes</h3>
          <hr />
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13140.305655721764!2d-58.4122997!3d-34.576933!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb579fa2cfa59%3A0x296b8c9a44cd6331!2sAwwa%20Suites%20%26%20Spa!5e0!3m2!1ses-419!2sar!4v1727029785630!5m2!1ses-419!2sar"
            className="w-full"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe> 
        </div>
      </section>

      {/* Como Llegar */}
      <section>
        <div className="sm:w-10/12 m-auto mt-20">
          <h3 className="text-4xl font-bold pl-1 sm:pl-0">
            Descubre lo que cuentan nuestros usuarios
          </h3>
          <hr />
          <div className="flex gap-2 mt-5 justify-around flex-wrap">
            {usuariosReview.map((userPost, index) => (
              <PostCard
                key={index}
                imgPerson={userPost.imgPerson}
                usuario={userPost.usuario}
                fecha={userPost.fecha}
                descripcion={userPost.descripcion}
                img={userPost.img}
              />
            ))}
          </div>
          <div className="flex gap-2 mt-5 justify-around flex-wrap">
            <button className="btn-blue">Ver más publicaciones</button>
          </div>
        </div>
      </section>
    </>
  );
};
export default ExpectedPlace;
