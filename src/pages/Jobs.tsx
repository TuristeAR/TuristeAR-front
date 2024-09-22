import { Header } from '../components/Header';
import LeftCommunity from '../components/LeftCommunity';
import RightCommunity from '../components/RightCommunity';
import React from 'react';
import CreatePost from '../components/CreatePost';
import ItineraryCard from '../components/ItineraryCard';
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
  }
];


const Jobs = () => {
  return (
    <>
      <Header containerStyles={'bg-primary relative top-0 z-[60]'} />
      <div className="flex justify-between h-[160vh] ">
        <LeftCommunity />
        <div className="w-[64%] p-10 overflow-scroll scrollbar-hidden ">
          <div className="rounded-xl mb-10 shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] ">
            <CreatePost />
          </div>
          <div className="flex flex-col gap-6" >
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
        <RightCommunity />
      </div>
    </>
  );
};

export default Jobs;
