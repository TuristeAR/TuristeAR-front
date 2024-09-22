import ArticleCard from '../components/ArticleCard';
import { Header } from '../components/Header';
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
            { id: 1, src: 'https://lh3.googleusercontent.com/p/AF1QipMbsuZz6kbPn72mv7yy3ke_FYQLLerGGMG6cNYw=s1360-w1360-h1020' },
            { id: 2, src: 'https://lh3.googleusercontent.com/proxy/RzvZmax6FkJW02jRnra0v_DkFPHjvaEpq2yTm4pBsxJYGzFSiD-eebSHHdECO1iMjb5xhqPNvjTmFgvA4Jsm3Joad-sZA9I2SJBY_Oinhk8KAOVPWOMaf_IkaMhciMTGOiZDDAPMlKEir9VaWRxdkLt_g2Ys1JA=s1360-w1360-h1020' },
            { id: 3, src: 'https://lh3.googleusercontent.com/p/AF1QipPCirEx8vGCnVxPkuF9wuz12RLI4LeoIa2HMi1C=s1360-w1360-h1020' },
            { id: 4, src: 'https://lh3.googleusercontent.com/p/AF1QipOCDtixR66cLv2kEp4gIdFlh8xs5wAoA2t7VTzg=s1360-w1360-h1020',},
            { id: 5, src: 'https://lh3.googleusercontent.com/p/AF1QipOAgC47KMUSvkUfLD8g2D4JInDES9pH0SDulT9y=s1360-w1360-h1020' },
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
                    <ImageGallery images={infoHotel[0].img}></ImageGallery>
                    {infoHotel.map((item, index) => {
                        return (
                            <div key={index} className="px-2 sm:px-0 flex flex-col gap-y-4">
                                <h1 className="text-center">{item.place}</h1>
                                <p className="font-light text-gray-500 text-sm md:text-base lg:text-lg text-center">
                                    {item.descripcion}
                                </p>
                            </div>
                        );
                    })}
                    <div className="flex flex-wrap justify-center gap-6 mt-3">
                        <div className="p-2 cursor-pointer">
                            <svg
                                className="bg-gray-50 hover:bg-primary hover:fill-white rounded-full p-2 m-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                height="100px"
                                viewBox="0 -960 960 960"
                                width="100px"
                                fill="#000000"
                            >
                                <path d="M280-240h40v-60h320v60h40v-160q0-33-23.5-56.5T600-480H460v140H320v-180h-40v280Zm110-120q21 0 35.5-14.5T440-410q0-21-14.5-35.5T390-460q-21 0-35.5 14.5T340-410q0 21 14.5 35.5T390-360ZM160-120v-480l320-240 320 240v480H160Zm60-60h520v-394L480-763 220-574v394Zm260-292Z" />
                            </svg>
                            <h3 className="text-xl font-medium text-center mx-auto">Alojamiento</h3>
                        </div>
                        <div className="p-2 cursor-pointer">
                            <svg
                                className="bg-gray-50 hover:bg-primary hover:fill-white rounded-full p-2 m-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                height="100px"
                                viewBox="0 -960 960 960"
                                width="100px"
                                fill="#000"
                            >
                                <path d="M480-283q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm0-167q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm0-167q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm340 457H140q-24.75 0-42.37-17.63Q80-195.25 80-220v-153q37-8 61.5-37.5T166-480q0-40-24.5-70T80-587v-153q0-24.75 17.63-42.38Q115.25-800 140-800h680q24.75 0 42.38 17.62Q880-764.75 880-740v153q-37 7-61.5 37T794-480q0 40 24.5 69.5T880-373v153q0 24.75-17.62 42.37Q844.75-160 820-160Zm0-60v-109q-38-26-62-65t-24-86q0-47 24-86t62-65v-109H140v109q39 26 62.5 65t23.5 86q0 47-23.5 86T140-329v109h680ZM480-480Z" />
                            </svg>
                            <h3 className="text-xl font-medium text-center">Atracciones</h3>
                        </div>
                        <div className="p-2 cursor-pointer">
                            <svg
                                className="bg-gray-50 hover:bg-primary hover:fill-white rounded-full p-2 m-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                height="100px"
                                viewBox="0 -960 960 960"
                                width="100px"
                                fill="#000000"
                            >
                                <path d="M120-120v-558h247v-92l113-110 113 110v258h247v392H120Zm60-60h106v-106H180v106Zm0-166h106v-106H180v106Zm0-166h106v-106H180v106Zm247 332h106v-106H427v106Zm0-166h106v-106H427v106Zm0-166h106v-106H427v106Zm0-166h106v-106H427v106Zm247 498h106v-106H674v106Zm0-166h106v-106H674v106Z" />
                            </svg>
                            <h3 className="text-xl font-medium text-center">Ciudad</h3>
                        </div>
                        <div className="p-2 cursor-pointer">
                            <svg
                                className="bg-gray-50 hover:bg-primary hover:fill-white rounded-full p-2 m-auto"
                                xmlns="http://www.w3.org/2000/svg"
                                height="100px"
                                viewBox="0 -960 960 960"
                                width="100px"
                                fill="#000000"
                            >
                                <path d="M285-80v-368q-52-11-88.5-52.5T160-600v-280h60v280h65v-280h60v280h65v-280h60v280q0 58-36.5 99.5T345-448v368h-60Zm415 0v-320H585v-305q0-79 48-127t127-48v800h-60Z" />
                            </svg>
                            <h3 className="text-xl font-medium text-center">Restaurant</h3>
                        </div>
                    </div>
                </div>
            </section>


            {/* Posts Usuarios */}
            < section >
                <div className="sm:w-10/12 m-auto mt-20">
                    <h3 className="text-4xl pl-1 sm:pl-0 font-bold">Puntos de interes</h3>
                    <hr />
                    <div className="relative px-1 sm:px-0 flex gap-2 mt-5 justify-around flex-wrap">
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            spaceBetween={5}
                            slidesPerView={4}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}

                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                            breakpoints={{
                                // cuando el ancho de la ventana es >= 320px
                                320: {
                                    slidesPerView: 1, // Mostrar 1 diapositiva
                                    spaceBetween: 10,
                                },
                                // cuando el ancho de la ventana es >= 480px
                                480: {
                                    slidesPerView: 2, // Mostrar 2 diapositivas
                                    spaceBetween: 10,
                                },
                                // cuando el ancho de la ventana es >= 768px
                                768: {
                                    slidesPerView: 3, // Mostrar 3 diapositivas
                                    spaceBetween: 10,
                                },
                                // cuando el ancho de la ventana es >= 1024px
                                1024: {
                                    slidesPerView: 4, // Mostrar 4 diapositivas
                                    spaceBetween: 10,
                                },
                            }}
                        >
                            {puntosDeInteres.map((article, index) => (
                                <SwiperSlide>
                                    <ArticleCard
                                        key={index}
                                        title={article.title}
                                        images={article.img}
                                        description={article.description}
                                        link={article.link}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="swiper-button-prev hidden"></div>
                        <div className="hidden swiper-button-next"></div>
                    </div>
                    <div className="text-center mt-10">
                        <button className="btn-blue">Ver Puntos de interes</button>
                    </div>
                </div>
            </section >

            {/* Como Llegar */}
            < section >
                <div className="sm:w-10/12 m-auto mt-20">
                    <h3 className="text-4xl font-bold pl-1 sm:pl-0">Descubre lo que cuentan nuestros usuarios</h3>
                    <hr />
                    <div className="flex gap-2 mt-5 justify-around flex-wrap">
                        <button className="btn-blue">Ver más publicaciones</button>
                    </div>
                </div>
            </section >
        </>
    );
};
export default ExpectedPlace;

