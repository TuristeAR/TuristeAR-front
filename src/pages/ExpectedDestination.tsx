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

const info = [
    {
        place: 'Buenos Aires',
        descripcion:
            'Conocido a menudo como el Microcentro, San Nicolás es el centro neurálgico comercial y aras del mundo, bordea el elevado Obelisco, un punto de referencia nacional y un popular lugar de selfies. Venerada por su acústica, la fastuosa ópera del Teatro Colón también ofrece visitas guiadas por sus bastidores. En la avenida Corrientes, se pueden encontrar teatros de estilo art déco iluminados con neón, restaurantes de pizza informales y librerías nocturnas.',
        img: [
            { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
            { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
            { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
            {
                id: 4,
                src: 'data:image/png;base64,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',
            },
            { id: 5, src: '/assets/san-nicolas-buenos-aires.webp' },
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

const ExpectedDestination = () => {
    return (
        <>
            <Header containerStyles="bg-primary" />

            <section className="w-full mb-5">
                <div className="sm:w-10/12 m-auto">
                    <ImageGallery images={info[0].img}></ImageGallery>
                    {info.map((item, index) => {
                        return (
                            <div  className="px-2 sm:px-0 flex flex-col gap-y-4">
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

            {/* Posts usuarios */}
            < section >
                <div className="sm:w-10/12 m-auto mt-20">
                    <h3 className="text-4xl font-bold pl-1 sm:pl-0">Descubre lo que cuentan nuestros usuarios</h3>
                    <hr />
                    <div className="flex gap-2 mt-5 justify-around flex-wrap">
                        {usuariosReview.map((userPost, index) => (
                            <PostCard
                                imgPerson={userPost.imgPerson}
                                usuario={userPost.usuario}
                                fecha={userPost.fecha}
                                descripcion={userPost.descripcion}
                                img={userPost.img}
                            />
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <button className="btn-blue">Ver más publicaciones</button>
                    </div>
                </div>
            </section >

            {/* Puntos de interes */}
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

            {/* Cultura y tradiciones*/}
            <section>
                <div className="sm:w-10/12 m-auto mt-20">
                    <h3 className="text-4xl pl-1 sm:pl-0 font-bold">Cultura y tradiciones</h3>
                    <hr />
                    <div className="flex gap-2 mt-5 justify-around flex-wrap">
                        <div className="mx-auto grid max-w-screen-xl rounded-lg bg-gray-2 lg:grid-cols-12 lg:gap-8 xl:gap-16">
                            <div className="lg:col-span-5 lg:mt-0">
                                <a href="#">
                                    <img className="mb-4 mx-auto h-56 w-56 sm:h-96 sm:w-96 md:h-full md:w-full" src={swipper[0].src} alt="peripherals" />
                                </a>
                            </div>
                            <div className="me-auto place-self-center lg:col-span-7 md:p-8 lg:p-16 p-4">
                                <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
                                    Idioma, religión y población
                                </h1>
                                <p className="mb-6 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, excepturi architecto? Magnam voluptatem aut aliquid et vitae reprehenderit natus nemo recusandae deserunt! Maxime molestias atque a ratione exercitationem. Magni, impedit. Reserve your new Apple iMac 27” today and enjoy exclusive savings with qualified activation. Pre-order now to secure your discount.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-5 justify-around flex-wrap">
                        <div className="mx-auto grid max-w-screen-xl rounded-lg bg-gray-2 lg:grid-cols-12 lg:gap-8 xl:gap-16">
                            <div className="lg:col-span-5 lg:mt-0">
                                <a href="#">
                                    <img className="mb-4 mx-auto h-56 w-56 sm:h-96 sm:w-96 md:h-full md:w-full" src={swipper[0].src} alt="peripherals" />
                                </a>
                            </div>
                            <div className="me-auto place-self-center lg:col-span-7 md:p-8 lg:p-16 p-4">
                                <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">
                                    Idioma, religión y población
                                </h1>
                                <p className="mb-6 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, excepturi architecto? Magnam voluptatem aut aliquid et vitae reprehenderit natus nemo recusandae deserunt! Maxime molestias atque a ratione exercitationem. Magni, impedit. Reserve your new Apple iMac 27” today and enjoy exclusive savings with qualified activation. Pre-order now to secure your discount.</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-10">
                        <button className="btn-blue">Ver más información</button>
                    </div>
                </div>
            </section>

            {/* Gastronomía */}
            < section >
                <div className="sm:w-10/12 m-auto mt-20">
                    <h3 className="text-4xl pl-1 sm:pl-0 font-bold">Gastronomía</h3>
                    <hr />
                    <div className="relative px-2 sm:px-0 flex gap-2 mt-5 justify-around flex-wrap">
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
                                        title={article.title}
                                        images={article.img}
                                        description={article.description}
                                        link={article.link}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>

                    </div>
                    <div className="text-center mt-10">
                        <button className="btn-blue">Ver Puntos de interes</button>
                    </div>
                </div>
            </section >
        </>
    );
};
export default ExpectedDestination;

