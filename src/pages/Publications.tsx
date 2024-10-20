import { Header } from '../components/Header/Header';
import { ItineraryCard } from '../components/ImageGallery/ItineraryCard';
import React, { useEffect, useRef, useState } from 'react';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { CreatePublications } from '../components/Community/CreatePublications';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';

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

  type Category = {
    id: number;
    description: string;
    image: string;
  };
  type Publication = {
    id: number;
    description: string;
    category: Category | null;
    creationDate: string;
    images: string[];
    user: User | null;
    likes : User[]
    reposts : User[]
    saved : User[]
  };

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [publications, setPublications] = useState<Publication[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true)


  const handleClick = (name: string) => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        setIsLoading(false)
      } catch (error) {
        setError('Error en la comunicación con el servidor');
      }
    };

    fetchData();
  }, []);


  return (
    <>
      {isLoading ?
        <div className="w-[90%] md:w-full mx-auto min-h-[90vh] flex flex-col items-center justify-center">
          <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
        </div>
        :
        <>
          <Header containerStyles={'relative top-0 z-[60]'} />
          <div className="flex justify-between h-[160vh] ">
            <LeftCommunity vista={'publications'}
                           categorySelected={categorySelected}
                           setCategorySelected={setCategorySelected}
                           activeItem={null}
                           handleClick={handleClick} />
            <div className="lg:w-[80%] w-[100%] pt-10 pb-10 flex flex-col gap-10 overflow-scroll scrollbar-hidden">
              {/* Create posts */}
              <CreatePublications />
              {/* Posts */}
              <div className="flex flex-col gap-6 lg:w-[80%] w-[90%] mx-auto">
                {publications?.filter((publication) => {
                  return categorySelected == null || publication.category.id == categorySelected;
                }).map((publication, index) => (
                  <ItineraryCard
                    key={index}
                    id={publication.id}
                    profilePicture={publication.user?.profilePicture}
                    userId={publication.user?.name}
                    creationDate={publication.creationDate}
                    description={publication.description}
                    images={publication.images}
                    likes={publication.likes.length}
                    reposts={publication.reposts.length}
                    saved={publication.saved.length}
                    isLiked={publication.likes.some(item => item.id === user.id)}
                    isRepost={publication.reposts.some(item => item.id === user.id)}
                    isSaved={publication.saved.some(item => item.id === user.id)}
                    category={publication.category.description} />
                ))}
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default Publications;
