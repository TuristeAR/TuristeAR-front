import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';
import { Header } from '../components/Header/Header';
import { ItineraryCard } from '../components/ImageGallery/ItineraryCard';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { CreatePublications } from '../components/Community/CreatePublications';

type User = {
  id: number;
  username: string;
  name: string;
  profilePicture: string;
  description: string;
  birthdate: string;
  coverPicture: string;
  location: string;
};

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

const PublicationDetail = () => {
  const { publicationId } = useParams();

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [publication, setPublication] = useState<Publication | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(()=>{
    const fetchData = async () => {
      try {
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

        const publicationResponse = await fetch(`http://localhost:3001/publication/${publicationId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!publicationResponse.ok) {
          console.log('Error al obtener el chat del itinerario:', await publicationResponse.json());
        } else {
          const publicationData = await publicationResponse.json();
          setPublication(publicationData);
        }
        setIsLoading(false);
      }catch (e){
        console.log(e)
      }
    }
    fetchData()
  })

  const handleClick = (name: string) => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50 border border-gray-50 rounded-lg">
          <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
        </div>
      ) : (
        <>
          <Header containerStyles={'relative top-0 z-[60]'} />
          <div className="flex justify-between h-[88.8vh] ">
            <LeftCommunity vista={'publications'}
                           categorySelected={categorySelected}
                           setCategorySelected={setCategorySelected}
                           activeItem={null}
                           handleClick={handleClick} />
            <div className="lg:w-[80%] w-[100%] pt-10 pb-10 flex flex-col gap-10 overflow-scroll scrollbar-hidden">
              {/* Create posts */}
              <CreatePublications />
              <div className={'grid grid-cols-2 px-10'}>
                <ItineraryCard
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
                <div>

                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default PublicationDetail;