import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { CreatePublications } from '../components/Community/CreatePublications';
import { ItineraryCard } from '../components/ImageGallery/ItineraryCard';
import { TravelCard } from '../components/Community/TravelCard';
import { useEffect, useRef, useState } from 'react';
import logoAnimado from '../assets/logoAnimado.json';

const Profile = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);

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
    likes: User[];
    reposts: User[];
    saved: User[];
  };

  type Itinerary = {
    id: number;
    createdAt: string;
    name: string;
    fromDate: string;
    toDate: string;
    participants: User[];
    user: User | null;
  };

  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [publications, setPublications] = useState<Publication[] | null>(null);
  const [likedPublications, setLikedPublications] = useState<Publication[] | null>(null);
  const [savedPublications, setSavedPublications] = useState<Publication[] | null>(null);
  const [itineraries, setItineraries] = useState<Itinerary[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionResponse = await fetch('https://api-turistear.koyeb.app/session', {
          method: 'GET',
          credentials: 'include',
        });

        if (!sessionResponse.ok) {
          setIsAuthenticated(false);
          window.location.href = '/login';
          return;
        }

        const sessionData = await sessionResponse.json();
        setUser(sessionData.user);
        setIsAuthenticated(true);
        setError('');

        try {
          const publicationsResponse = await fetch(
            `https://api-turistear.koyeb.app/publications/${sessionData.user.id}`,
            {
              method: 'GET',
              credentials: 'include',
            },
          );

          if (!publicationsResponse.ok) {
            console.log('Error al obtener publicaciones:', await publicationsResponse.json());
          } else {
            const publicationsData = await publicationsResponse.json();
            setPublications(publicationsData);
          }
        } catch (err) {
          setError(err);
          console.log('Error al obtener las publicaciones:', err);
        }

        const itinerariesResponse = await fetch(
          `https://api-turistear.koyeb.app/itinerary/byUser/${sessionData.user.id}`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );

        if (!itinerariesResponse.ok) {
          setError('Error al obtener los itinerarios');
          return;
        }

        const itinerariesData = await itinerariesResponse.json();
        setItineraries(itinerariesData.participants);
        setError('');

      } catch (error) {
        setError('Error en la comunicación con el servidor');
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, []);

  const [activeItem, setActiveItem] = useState('posts');

  useEffect(() => {
    if (activeItem === 'likes' && user?.id) {
      const fetchLikedPublications = async () => {
        try {
          const likedPublicationsResponse = await fetch(
            `https://api-turistear.koyeb.app/publications/likes/${user.id}`,
            {
              method: 'GET',
              credentials: 'include',
            },
          );

          if (!likedPublicationsResponse.ok) {
            setError('Error al obtener las publicaciones likeadas');
            return;
          }

          const likedPublicationsData = await likedPublicationsResponse.json();
          setLikedPublications(likedPublicationsData);
          setError('');
        } catch (err) {
          setError('Error al obtener las publicaciones likeadas');
        }
      };

      fetchLikedPublications();
    }
  }, [activeItem, user]);

  useEffect(() => {
    if (activeItem === 'saved' && user?.id) {
      const fetchSavedPublications = async () => {
        try {
          const savedPublicationsResponse = await fetch(
            `https://api-turistear.koyeb.app/publications/saved/${user.id}`,
            {
              method: 'GET',
              credentials: 'include',
            },
          );

          if (!savedPublicationsResponse.ok) {
            setError('Error al obtener las publicaciones guardadas');
            return;
          }

          const savedPublicationsData = await savedPublicationsResponse.json();
          setSavedPublications(savedPublicationsData);
          setError('');
        } catch (err) {
          setError('Error al obtener las publicaciones likeadas');
        }
      };

      fetchSavedPublications();
    }
  }, [activeItem, user]);

  const handleClick = (name: string) => {
    setActiveItem(name);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const reorderDate = (dateString : string ) => {
    const formatDate = (date) => {
      const [year, month, day] = date.split('-'); // Divide la fecha en año, mes, día
      return `${day}-${month}-${year}`; // Reordena en formato 'dd-mm-yyyy'
    };

    return formatDate(dateString)
  };

  if (!isAuthenticated) return <p>User is not authenticated</p>;

  return (
    <>
      <Header containerStyles={'relative top-0 z-[60]'} />
      <div className="flex justify-between h-[160vh] ">
        <LeftCommunity
          vista=""
          activeItem={activeItem}
          categorySelected={categorySelected}
          handleClick={handleClick}
          setCategorySelected={setCategorySelected}
        />
        <div className="lg:w-[80%] w-[100%] lg:p-10 lg:pt-0 flex flex-col gap-10 overflow-scroll scrollbar-hidden">
          {/* Portada */}
          <div className="">
            <div className="h-[200px]">
              <img
                src={user?.coverPicture}
                alt={'Foto de portada'}
                className={'w-[100%] h-[100%]'}
              />
            </div>
            <div className="flex text-l relative pl-2">
              <div className="lg:w-[78%] w-[90%] pt-4">
                <div className="lg:flex items-center lg:flex-row flex-col gap-x-4">
                  <h1 className="lg:text-3xl text-xl tracking-[.1em] text-[#215a9d]">
                    {user?.name}
                  </h1>
                  <h3 className="text-xl text-[#a2c8de]">{'@' + user?.username}</h3>
                </div>
                <p className="mt-4">{user?.description}</p>
                <div className="flex gap-4 lg:text-[14px] text-[10px] mt-2 text-[#999999]">
                  <div className="flex items-center gap-x-2">
                    <img src="/assets/location.svg" alt="Ubicación" className="w-6 h-6" />
                    <p>{user?.location}, Argentina</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <img src="/assets/calendar.svg" alt="Calendario" className="w-6 h-6" />
                    <p>
                      {user?.birthdate && typeof user.birthdate === 'string'
                        ? reorderDate(user.birthdate.slice(0, -14))
                        : ''}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 items-center absolute right-0 -top-20 ">
                <div
                  className={`lg:w-[150px] w-[100px] lg:h-[150px] h-[100px] bg-gray border-white border-4`}
                >
                  <img src={user?.profilePicture} alt={user?.name} className="w-[100%]" />
                </div>
                <div>
                  <a
                    href={`/editProfile`}
                    className="lg:btn-blue px-4 py-2 bg-primary hover:bg-primary-3 text-white rounded-2xl"
                  >
                    Editar perfil
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-black grid lg:grid-cols-4 lg:grid-rows-1 grid-cols-2 grid-rows-2 lg:text-2xl text-xl lg:ml-0 ml-4 font-semibold">
            <h2
              className={`hover:cursor-pointer text-center py-2 rounded-t-xl ${activeItem === 'posts' ? 'bg-[#c0daeb]' : ''}`}
              onClick={() => {
                handleClick('posts');
              }}
            >
              Publicaciones
            </h2>
            <h2
              className={`hover:cursor-pointer text-center py-2 rounded-t-xl ${activeItem === 'itineraries' ? 'bg-[#c0daeb]' : ''}`}
              onClick={() => handleClick('itineraries')}
            >
              Itinerarios
            </h2>
            <h2
              className={`hover:cursor-pointer text-center py-2 rounded-t-xl ${activeItem === 'likes' ? 'bg-[#c0daeb]' : ''}`}
              onClick={() => {
                handleClick('likes');
              }}
            >
              Likes
            </h2>
            <h2
              className={`hover:cursor-pointer text-center py-2 rounded-t-xl ${activeItem === 'saved' ? 'bg-[#c0daeb]' : ''}`}
              onClick={() => handleClick('saved')}
            >
              Guardados
            </h2>
          </div>

          <CreatePublications />

          {/* Content */}
          <div
            className="lg:w-[100%] w-[90%] mx-auto lg:grid lg:grid-cols-2 lg:gap-6 gap-20"
            ref={contentRef}
          >
            {activeItem === 'posts' &&
              publications
                ?.filter((publication) => {
                  return categorySelected == null || publication.category.id == categorySelected;
                })
                .map((publication, index) => (
                  <ItineraryCard
                    key={index}
                    id={publication.id}
                    profilePicture={publication.user.profilePicture}
                    userId={publication.user.name}
                    creationDate={publication.creationDate}
                    description={publication.description}
                    images={publication.images}
                    likes={publication.likes.length}
                    category={publication.category.description}
                    reposts={publication.reposts.length}
                    saved={publication.saved.length}
                    isLiked={publication.likes.some((item) => item.id === user.id)}
                    isRepost={publication.reposts.some((item) => item.id === user.id)}
                    isSaved={publication.saved.some((item) => item.id === user.id)}
                  />
                ))}
            {activeItem === 'itineraries' &&
              itineraries?.map((itinerary, index) => (
                <TravelCard
                  key={index}
                  imgProvince={'/assets/san-nicolas-buenos-aires.webp'}
                  province={itinerary.name}
                  departure={itinerary.fromDate}
                  arrival={itinerary.toDate}
                  participants={itinerary.participants}
                  id={itinerary.id}
                />
              ))}

            {activeItem === 'likes' &&
              likedPublications
                ?.filter((publication) => {
                  return categorySelected == null || publication.category.id == categorySelected;
                })
                .map((publication, index) => (
                  <ItineraryCard
                    key={index}
                    id={publication.id}
                    profilePicture={publication.user.profilePicture}
                    userId={publication.user.name}
                    creationDate={publication.creationDate}
                    description={publication.description}
                    images={publication.images}
                    likes={publication.likes.length}
                    category={publication.category.description}
                    reposts={publication.reposts.length}
                    saved={publication.saved.length}
                    isLiked={true}
                    isRepost={publication.reposts.some((item) => item.id === user.id)}
                    isSaved={publication.saved.some((item) => item.id === user.id)}
                  />
                ))}
            {activeItem === 'saved' &&
              savedPublications
                ?.filter((publication) => {
                  return categorySelected == null || publication.category.id == categorySelected;
                })
                .map((publication, index) => (
                  <ItineraryCard
                    key={index}
                    id={publication.id}
                    profilePicture={publication.user.profilePicture}
                    userId={publication.user.name}
                    creationDate={publication.creationDate}
                    description={publication.description}
                    images={publication.images}
                    likes={publication.likes.length}
                    reposts={publication.reposts.length}
                    saved={publication.saved.length}
                    category={publication.category.description}
                    isLiked={publication.likes.some((item) => item.id === user.id)}
                    isRepost={publication.reposts.some((item) => item.id === user.id)}
                    isSaved={true}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
