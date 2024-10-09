import { Header } from '../components/Header/Header';
import { ItineraryCard } from '../components/ImageGallery/ItineraryCard';
import React, { useEffect, useState } from 'react';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { RightCommunity } from '../components/Community/RightCommunity';
import { CreatePost } from '../components/Community/CreatePost';
import { useLocation } from 'react-router-dom';

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

  type User={
    id: number;
    username: string,
    name: string,
    profilePicture: string,
    description: string,
    birthdate: string,
    coverPicture: string,
    location: string
  }

  type Publication={
    id: number,
    description: string,
    creationDate: string,
    images: string[],
    user:  User | null
  }
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [publications, setPublications] = useState<Publication[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Primer fetch - Obtener la sesión y el usuario
        const sessionResponse = await fetch('https://api-turistear.koyeb.app/session', {
          method: 'GET',
          credentials: 'include',
        });

        if (!sessionResponse.ok) {
          window.location.href = '/login';
          return;
        }

        const sessionData = await sessionResponse.json();
        setUser(sessionData.user);

        // Segundo fetch - Obtener las publicaciones solo si se obtuvo el usuario
        const publicationsResponse = await fetch(
          `https://api-turistear.koyeb.app/publications`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!publicationsResponse.ok) {
          setError('Error al obtener las publicaciones');
          return;
        }
        const publicationsData = await publicationsResponse.json();
        setPublications(publicationsData.data);
        setError('');
      } catch (error) {
        setError('Error en la comunicación con el servidor');
      }
    };

    fetchData();
  }, []);


  return (
      <>
        <Header containerStyles={'relative top-0 z-[60]'} />
        <div className="flex justify-between h-[160vh] ">
          <LeftCommunity vista={'publications'} />
          <div className="lg:w-[80%] w-[100%] pt-10 pb-10 flex flex-col gap-10 overflow-scroll scrollbar-hidden">
            {/* Create posts */}
            <div className="rounded-xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] lg:w-[80%] w-[90%] mx-auto ">
              <CreatePost options={options} profilePicture={user?.profilePicture} />
            </div>
            {/* Posts */}
            <div className="flex flex-col gap-6 lg:w-[80%] w-[90%] mx-auto">
            {publications?.map((publication, index) => (
              <ItineraryCard
                key={index}
                profilePicture={publication.user?.profilePicture}
                userId={publication.user?.name}
                creationDate={publication.creationDate}
                description={publication.description}
                images={publication.images}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Publications;
