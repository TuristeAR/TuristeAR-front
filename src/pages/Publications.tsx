import { Header } from '../components/Header/Header';
import { PublicationCard } from '../components/Community/PublicationCard';
import { useEffect, useRef, useState } from 'react';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { CreatePublications } from '../components/Community/CreatePublications';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';
import io from 'socket.io-client';
import { UseFetchSession } from '../utilities/useFetchSession';

type User = {
  id: number;
  name: string;
  profilePicture: string;
  description: string;
  birthdate: string;
  coverPicture: string;
  location: string;
};

type Comment = {
  createdAt: string;
  description: string;
  user: User | null;
};

type Category = {
  id: number;
  description: string;
  image: string;
};

type Place = {
  id: number;
  name: string;
  googleId: string;
};

type Activity = {
  id: number;
  name: string;
  place: Place;
  images: string[];
};

type Publication = {
  id: number;
  description: string;
  categories: Category[];
  createdAt: string;
  user: User | null;
  likes: User[];
  reposts: User[];
  saved: User[];
  comments: Comment[];
  activities: Activity[];
};

const Publications = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const { user } = UseFetchSession();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [publications, setPublications] = useState<Publication[] | null>(null);

  const handleClick = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const publicationsResponse = await fetch(`${process.env.VITE_API_URL}/publications`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!publicationsResponse.ok) {
          setError('Error al obtener las publicaciones');
          return;
        }
        const publicationsData = await publicationsResponse.json();
        setPublications(publicationsData.data);
        setError('');
        setIsLoading(false);

        const socket = io(process.env.VITE_API_URL);
        socket.on('receiveDelete', (publicationId) => {
          setPublications((prevPublications) =>
            prevPublications.filter((pub) => pub.id !== publicationId),
          );
        });

        return () => {
          socket.disconnect();
        };
      } catch (error) {
        setError('Error en la comunicación con el servidor');
      }
    };

    fetchData();
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {isLoading ? (
        <div className="w-[90%] md:w-full mx-auto min-h-[90vh] flex flex-col items-center justify-center">
          <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
        </div>
      ) : (
        <>
          <Header containerStyles={'relative top-0 z-[60]'} />
          <div
            className={`flex justify-between min-h-[88.8vh] relative ${isOpen ? 'overflow-hidden' : ''}`}
          >
            <LeftCommunity
              vista={'publications'}
              categorySelected={categorySelected}
              setCategorySelected={setCategorySelected}
              activeItem={null}
              handleClick={handleClick}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <div className="absolute md:static lg:w-[80%] w-[100%] pt-10 pb-10 flex flex-col gap-10 overflow-scroll scrollbar-hidden">
              {' '}
              {/* Create posts */}
              <CreatePublications />
              <div className="flex flex-col gap-6 lg:w-[80%] w-[90%] mx-auto">
                {user &&
                publications?.filter((publication) => {
                  return categorySelected == null || publication.categories.some(category => category.id === categorySelected);
                }).length > 0 ? (
                  publications
                    ?.filter((publication) => {
                      return (
                        categorySelected == null || publication.categories.some(category => category.id === categorySelected)
                      );
                    })
                    .map((publication, index) => (
                      <PublicationCard
                        key={index}
                        publication={publication}
                        user={user}
                        onDelete={() =>
                          setPublications((prev) => prev.filter((p) => p.id !== publication.id))
                        }
                      />
                    ))
                ) : (
                  <div className={'p-4 bg-[#c0daeb] rounded-2xl'}>
                    <p className={'text-3xl font-bold'}>No hay publicaciones!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Publications;