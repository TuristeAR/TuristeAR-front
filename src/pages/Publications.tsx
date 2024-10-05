import { Header } from '../components/Header';
import ItineraryCard from '../components/ItineraryCard';
import React from 'react';
import LeftCommunity from '../components/LeftCommunity';
import CreatePost from '../components/CreatePost';

const itineraries = [
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
    ]
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
];
const options = ['Imagen', 'Itinerario', 'Categoría', 'Ubicación'];

const Publications = () => {
    return (
      <>
        <Header containerStyles={'bg-primary relative top-0 z-[60]'} />
        <div className="flex justify-between h-[160vh] ">
          <LeftCommunity />
          <div className="lg:w-[80%] w-[100%] pt-10 pb-10 flex flex-col gap-10 overflow-scroll scrollbar-hidden">
            {/* Create posts */}
            <div className="rounded-xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] lg:w-[80%] w-[90%] mx-auto ">
              <CreatePost options={options} />
            </div>
            {/* Posts */}
            <div className="flex flex-col gap-6 lg:w-[80%] w-[90%] mx-auto">
            {itineraries.map((userPost, index) => (
              <ItineraryCard
                key={index}
                imgPerson={userPost.imgPerson}
                usuario={userPost.usuario}
                fecha={userPost.fecha}
                descripcion={userPost.descripcion}
                img={userPost.img}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Publications;
