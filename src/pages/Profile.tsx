import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { CreatePublications } from '../components/Community/CreatePublications';
import { PublicationCard } from '../components/Community/PublicationCard';
import { ItineraryCard } from '../components/Community/ItineraryCard';
import { useEffect, useRef, useState } from 'react';
import logoAnimado from '../assets/logoAnimado.json';
import Lottie from 'lottie-react';
import { get } from '../utilities/http.util';

const Profile = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  type User = {
    id: number;
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

  type Comment = {
    createdAt: string;
    description: string;
    user : User | null;
  }

  type Publication = {
    id: number;
    description: string;
    category: Category | null;
    createdAt: string;
    user: User | null;
    likes: User[];
    reposts: User[];
    saved: User[];
    comments: Comment[];
  };

  type Itinerary = {
    activities: any;
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const session = await get('https://api-turistear.koyeb.app/session', {
        contentType: 'application/json',
      });

      if (session.statusCode !== 200) {
        window.location.href = '/login';
        return;
      }

      setUser(session.user);

      const publications = await get(
        `https://api-turistear.koyeb.app/publications/${session.user.id}`,
        {
          contentType: 'application/json',
        },
      );

      setPublications(publications);

      const itineraries = await get(
        `https://api-turistear.koyeb.app/itinerary/byUser/${session.user.id}`,
        {
          contentType: 'application/json',
        },
      );

      setItineraries(itineraries.participants);
    };

    fetchData().then(() => setLoading(false));
  }, []);

  const [activeItem, setActiveItem] = useState('posts');

  useEffect(() => {
    if (activeItem === 'likes' && user?.id) {
      setLoading(true);
      const fetchLikedPublications = async () => {
        const likedPublications = await get(
          `https://api-turistear.koyeb.app/publications/likes/${user.id}`,
          {
            contentType: 'application/json',
          },
        );

        setLikedPublications(likedPublications);
      };

      fetchLikedPublications().then(() => setLoading(false));
    }
  }, [activeItem, user]);

  useEffect(() => {
    if (activeItem === 'saved' && user?.id) {
      const fetchSavedPublications = async () => {
        const savedPublications = await get(
          `https://api-turistear.koyeb.app/publications/saved/${user.id}`,
          {
            contentType: 'application/json',
          },
        );

        setSavedPublications(savedPublications);
      };

      fetchSavedPublications().then(() => setLoading(false));
    }
  }, [activeItem, user]);

  const handleClick = (name: string) => {
    setActiveItem(name);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const reorderDate = (dateString: string) => {
    const formatDate = (date) => {
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    };

    return formatDate(dateString);
  };

  console.log(itineraries)
  return (
    <>
      <Header containerStyles={'relative top-0 z-[60]'} />
      {loading && activeItem === 'posts' ? (
        <div className="w-[90%] md:w-full mx-auto min-h-[90vh] flex flex-col items-center justify-center">
          <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
        </div>
      ) : (
        <div className="flex justify-between h-[160vh] ">
          <LeftCommunity
            vista=""
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
            activeItem={activeItem}
            handleClick={handleClick}
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
                    <img
                      src={user?.profilePicture}
                      alt={user?.name}
                      className="w-[100%] h-[100%]"
                    />
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
              className="lg:w-[100%] w-[90%] mx-auto lg:grid lg:grid-cols-2 lg:gap-6"
              ref={contentRef}
            >
              {activeItem === 'posts' &&
                publications
                  ?.filter((publication) => {
                    return categorySelected == null || publication.category.id == categorySelected;
                  })
                  .map((publication, index) => (
                    <PublicationCard
                      key={index}
                      id={publication.id}
                      profilePicture={publication.user.profilePicture}
                      userId={publication.user.name}
                      creationDate={publication.createdAt}
                      description={publication.description}
                      images={[]}
                      likes={publication.likes.length}
                      category={publication.category.description}
                      reposts={publication.reposts.length}
                      saved={publication.saved.length}
                      comments={publication.comments.length}
                      isLiked={publication.likes.some((item) => item.id === user.id)}
                      isRepost={publication.reposts.some((item) => item.id === user.id)}
                      isSaved={publication.saved.some((item) => item.id === user.id)}
                    />
                  ))}
              {activeItem === 'itineraries' &&
                itineraries?.map((itinerary, index) => {
                  const imgProvince =
                  itinerary.activities[0]?.place?.province?.images[0] ||
                  '/assets/TuristeAR-logo.png';

                  return (
                  <ItineraryCard
                    key={index}
                    imgProvince={imgProvince}
                    province={itinerary.name}
                    departure={itinerary.fromDate}
                    arrival={itinerary.toDate}
                    participants={itinerary.participants}
                    id={itinerary.id}
                  />
                  );
                  })}

              {activeItem === 'likes' &&
                likedPublications
                  ?.filter((publication) => {
                    return categorySelected == null || publication.category.id == categorySelected;
                  })
                  .map((publication, index) => (
                    <PublicationCard
                      key={index}
                      id={publication.id}
                      profilePicture={publication.user.profilePicture}
                      userId={publication.user.name}
                      creationDate={publication.createdAt}
                      description={publication.description}
                      images={[]}
                      likes={publication.likes.length}
                      category={publication.category.description}
                      reposts={publication.reposts.length}
                      saved={publication.saved.length}
                      comments={publication.comments.length}
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
                    <PublicationCard
                      key={index}
                      id={publication.id}
                      profilePicture={publication.user.profilePicture}
                      userId={publication.user.name}
                      creationDate={publication.createdAt}
                      description={publication.description}
                      images={[]}
                      likes={publication.likes.length}
                      reposts={publication.reposts.length}
                      saved={publication.saved.length}
                      comments={publication.comments.length}
                      category={publication.category.description}
                      isLiked={publication.likes.some((item) => item.id === user.id)}
                      isRepost={publication.reposts.some((item) => item.id === user.id)}
                      isSaved={true}
                    />
                  ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
