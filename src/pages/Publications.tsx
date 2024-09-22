import {Header} from "../components/Header";
import logo from "/assets/logo.svg";
import ItineraryCard from '../components/ItineraryCard';
import CommunityFilters from '../components/CommunityFilters';
import MenuCommunity from '../components/MenuCommunity';
import React from 'react';

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

const infoCategories=[
  {
    title: "Filtrar por categoría",
    categories : [
      { imgPerson: '/assets/person.svg', user : 'General' },
      { imgPerson: '/assets/person.svg', user : 'Buenos Aires' },
      { imgPerson: '/assets/person.svg', user : 'Salta' },
      { imgPerson: '/assets/person.svg', user : 'Córdoba' },
      { imgPerson: '/assets/person.svg', user : 'Santa Fe' },
      { imgPerson: '/assets/person.svg', user : 'San Luis' },
    ],
    link: "categories"
  }
]

const infoTrips=[
  {
    title : "Mis viajes",
    users: [
      { imgPerson: '/assets/person.svg', user : 'Buenos Aires - 9 días'},
      { imgPerson: '/assets/person.svg', user : 'Córdoba - 12 días'},
      { imgPerson: '/assets/person.svg', user : 'Salta - 18 días'},
      { imgPerson: '/assets/person.svg', user : 'San Luis - 4 días'},
      { imgPerson: '/assets/person.svg', user : 'Formosa - 11 días'},
      { imgPerson: '/assets/person.svg', user : 'Santa Fe - 23 días'},
    ],
    link: "viajes"
  }
]

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

const infoFriends=[
  {
    title: "Mis amigos",
    users:[
      { imgPerson: '/assets/person.svg', user: 'Lucas Ramirez', },
      { imgPerson: '/assets/person.svg', user: 'Carlos Morales', },
      { imgPerson: '/assets/person.svg', user: 'Juanfer Fernandez', },
      { imgPerson: '/assets/person.svg', user: 'Gonzalo Martinez', },
      { imgPerson: '/assets/person.svg', user: 'Germán Gonzalez', },
      { imgPerson: '/assets/person.svg', user: 'John Hernandez', }
    ],
    link: "friends"
  }
]

const Publications = () => {
    return (
      <>
        <Header containerStyles={'bg-primary relative top-0 z-[60]'} />
        <div className="flex justify-between h-[140vh] ">
          <div className="flex flex-col w-[18%] p-6 gap-6">
            <MenuCommunity />
            <hr className="border border-[#999999]"></hr>
            <div className="flex flex-col gap-y-4">
                {infoCategories.map((category, index) => (
                  <CommunityFilters
                    key={index}
                    title={category.title}
                    users={category.categories}
                    link={category.link}
                  />
                ))}
            </div>
          </div>
          <div className="w-[64%] p-10 flex flex-col gap-10 overflow-scroll ">
            {/* Stories */}
            <div className="flex gap-2">
              <div
                className={`bg-cover bg-center h-[230px] w-full border border-black rounded-2xl flex flex-col justify-between p-2`}
              ></div>
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
            <div className="border border-black rounded-xl">
              <div className="flex justify-around items-center p-2 pt-4 pb-4">
                <div className="w-[20%]">
                  <img src={logo} alt="logo" className="h-8 w-8 object-cover mx-auto" />
                </div>
                <input
                  type="text"
                  className="border border-black w-[60%] p-4 rounded-3xl"
                  placeholder="Escribe tu experiencia"
                />
                <div className="w-[20%]">
                  <img src={logo} alt="logo" className="h-8 w-8 object-cover mx-auto" />
                </div>
              </div>
              <div className="grid grid-cols-4 p-4 border-t border-black">
                <div className="flex gap-2 items-center mx-auto">
                  <img src={logo} alt="logo" className="h-8 w-8 object-cover" />
                  <p className="">Imagen</p>
                </div>
                <div className="flex gap-2 items-center mx-auto">
                  <img src={logo} alt="logo" className="h-8 w-8 object-cover" />
                  <p className="">Itinerario</p>
                </div>
                <div className="flex gap-2 items-center mx-auto">
                  <img src={logo} alt="logo" className="h-8 w-8 object-cover" />
                  <p className="">Categoría</p>
                </div>
                <div className="flex gap-2 items-center mx-auto">
                  <img src={logo} alt="logo" className="h-8 w-8 object-cover" />
                  <p className="">Ubicación</p>
                </div>
              </div>
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
          <div className="w-[18%] p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-y-4">
                      {infoTrips.map((trip, index) => (
                        <CommunityFilters
                          key={index}
                          title={trip.title}
                          users={trip.users}
                          link={trip.link}
                        />
                      ))}
                    </div>
                </div>
                <div className="flex flex-col gap-y-4">
                      {infoFriends.map((friend, index) => (
                        <CommunityFilters
                          key={index}
                          title={friend.title}
                          users={friend.users}
                          link={friend.link}
                        />
                      ))}
                </div>
            </div>
        </div>
      </>
    );
};

export default Publications;
