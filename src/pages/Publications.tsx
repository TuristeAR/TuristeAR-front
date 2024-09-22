import {Header} from "../components/Header";
import logo from "/assets/logo.svg";
import ItineraryCard from '../components/ItineraryCard';
import CommunityFilters from '../components/CommunityFilters';
import MenuCommunity from '../components/MenuCommunity';
import React from 'react';
import LeftCommunity from '../components/LeftCommunity';
import RightCommunity from '../components/RightCommunity';
import CreatePost from '../components/CreatePost';

const userStories = [
    {
        imgPerson: '/assets/person.svg',
        user: 'Pablo Ramirez',
        imgStory : '/assets/logo.svg',
    },
    {
        imgPerson: '/assets/person.svg',
        user: 'Patricia Gonzalez',
        imgStory : '/assets/logo.svg',
    },
    {
        imgPerson: '/assets/person.svg',
        user: 'Diana Morales',
        imgStory : '/assets/logo.svg',
    },
    {
        imgPerson: '/assets/person.svg',
        user: 'Luis Hernandez',
        imgStory : '/assets/logo.svg',
    },
];

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

const Publications = () => {
    return (
      <>
        <Header containerStyles={'bg-primary relative top-0 z-[60]'} />
        <div className="flex justify-between h-[160vh] ">
          <LeftCommunity />
          <div className="w-[64%] p-10 flex flex-col gap-10 overflow-scroll scrollbar-hidden ">
            {/* Stories */}
            <div className="flex gap-2">
              <div
                className={`bg-black bg-cover bg-center h-[230px] w-full border border-black rounded-2xl flex items-center justify-between p-2`}
              >
                <img src="/assets/addWhite.svg" alt="Add White" />
              </div>
              {userStories.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`bg-[url(${item.imgStory})] bg-cover bg-center h-[230px] w-full border border-black rounded-2xl flex flex-col justify-between p-2`}
                  >
                    <div className="rounded-full border border-black w-[35px] h-[35px] flex items-center justify-center">
                      <img src={item.imgPerson} alt="Imagen" className="h-8 w-8 object-cover" />
                    </div>
                    <h2 className="text-center font-semibold">{item.user}</h2>
                  </div>
                );
              })}
            </div>
            {/* Create posts */}
            <div className="rounded-xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] ">
              <CreatePost />
            </div>

            {/* Posts */}
            <div className="flex flex-col gap-6">
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

export default Publications;
