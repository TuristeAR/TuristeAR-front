import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';
import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { CreatePublications } from '../components/Community/CreatePublications';
import { CommentDetail } from '../components/Community/CommentDetail';
import { PublicationDetailCard } from '../components/Community/PublicationDetailCard';
import io from 'socket.io-client';


type User={
  id: number;
  name: string,
  profilePicture: string,
  description: string,
  birthdate: string,
  coverPicture: string,
  location: string
}

type Comment = {
  createdAt: string;
  description: string;
  user : User | null;
}

type Category = {
  id: number;
  description: string;
  image: string;
};

type Place = {
  id: number,
  name: string,
  googleId: string,
};

type Activity = {
  id: number,
  name: string,
  place: Place
  images: string[]
};

type Publication = {
  id: number;
  description: string;
  category: Category | null;
  createdAt: string;
  user: User | null;
  likes : User[]
  reposts : User[]
  saved : User[]
  comments : Comment[]
  activities: Activity[]
};
const PublicationDetail = () => {
  const { publicationId } = useParams();

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [publication, setPublication] = useState<Publication | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionResponse = await fetch('http://localhost:3001/session', {
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
          `http://localhost:3001/publication/${publicationId}`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );

        if (!publicationsResponse.ok) {
          return;
        }
        const publicationsData = await publicationsResponse.json();
        setPublication(publicationsData);

        const socket = io('http://localhost:3001');
        socket.on('receiveDelete', () => {
          window.location.href = '/publications';
        });

        setIsLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, []);

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
            <LeftCommunity
              vista={'publications'}
              categorySelected={categorySelected}
              setCategorySelected={setCategorySelected}
              activeItem={null}
              handleClick={handleClick}
            />
            <div className="lg:w-[80%] w-[100%] pt-10 pb-10 flex flex-col gap-10 overflow-scroll scrollbar-hidden">
              {/* Create posts */}
              <CreatePublications />
              <div
                className={'w-[95%] mx-auto rounded-2xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] '}
              >
                <PublicationDetailCard
                  publication={publication}
                  user={user}
                  onDelete={() => { window.location.href = '/publications'}}
                />
                <CommentDetail publication={publication} user={user} key={publication.id} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PublicationDetail;
