import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { CreatePost } from '../components/Community/CreatePost';
import { ItineraryCard } from '../components/ImageGallery/ItineraryCard';
import { TravelCard } from '../components/Community/TravelCard';
import { useEffect, useRef, useState } from 'react';

const options = ['Imagen', 'Itinerario', 'Categoría', 'Ubicación'];

const Profile = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
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

  type Itinerary={
    id: number,
    createdAt: string,
    name: string,
    fromDate: string,
    toDate: string,
    participants: User[],
    user:  User | null
  }

  const [user, setUser] = useState<User | null>(null);
  const [publications, setPublications] = useState<Publication[] | null>(null);
  const [itineraries, setItineraries] = useState<Itinerary[] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch de la sesión
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

        // Fetch de publicaciones
        try {
          const publicationsResponse = await fetch(
            `https://api-turistear.koyeb.app/publications/${sessionData.user.id}`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );

          if (!publicationsResponse.ok) {
            console.log('Error al obtener publicaciones:', await publicationsResponse.json());
          } else {
            const publicationsData = await publicationsResponse.json();
            setPublications(publicationsData);
          }
        } catch (err) {
          setError(err)
          console.log('Error al obtener las publicaciones:', err);
        }

        // Fetch de itinerarios (se ejecuta independientemente del resultado de publicaciones)
        const itinerariesResponse = await fetch(
          `https://api-turistear.koyeb.app/itinerary/byUser/${sessionData.user.id}`,
          {
            method: 'GET',
            credentials: 'include',
          }
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

// Inicializa content como null o un valor por defecto
  const [content, setContent] = useState<React.JSX.Element | null>(null);
  const [activeItem, setActiveItem] = useState('posts');

  const components = {
    itineries: itineraries?.map((itinerary, index) => (
      <TravelCard key={index} imgProvince={'/assets/san-nicolas-buenos-aires.webp'} province={itinerary.name}
                  departure={itinerary.fromDate} arrival={itinerary.toDate}
                  participants={itinerary.participants}  id={itinerary.id}/>
    )) ,
    posts: publications?.map((publication, index) => (
      <ItineraryCard key={index} profilePicture={user?.profilePicture} userId={user?.name}
                     creationDate={publication.creationDate} description={publication.description} images={publication.images} />
    )),
  };

  useEffect(() => {
    // Actualiza el contenido cada vez que publications cambie
    if (activeItem === 'posts' && publications) {
      // @ts-ignore
      setContent(components.posts);
    } else if (activeItem === 'itineraries') {
      // @ts-ignore
      setContent(components.itineries);
    }
  }, [publications, activeItem]); // Dependencias para que se ejecute cuando cambien

  const handleClick = (name: string) => {
    setActiveItem(name);
    // Esto se manejará en el useEffect, por lo que no necesitamos setContent aquí
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if(!isAuthenticated){
    return (<><p>User is not authenticated</p></>);
  }

  return (
    <>
      <Header containerStyles={'relative top-0 z-[60]'} />
      <div className="flex justify-between h-[160vh] ">
        <LeftCommunity vista={'publications'} />
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
                    <p>{user?.location}</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <img src="/assets/calendar.svg" alt="Calendario" className="w-6 h-6" />
                    <p>
                      {user?.birthdate && typeof user.birthdate === 'string'
                        ? user.birthdate.slice(0, -14)
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
                    href={`/editProfile/${user?.id}`}
                    className="lg:btn-blue px-4 py-2 bg-primary hover:bg-primary-3 text-white rounded-2xl"
                  >
                    Editar perfil
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* Publicaciones */}
          <div className="border-b border-black grid grid-cols-2 lg:text-2xl text-xl lg:ml-0 ml-4 font-semibold">
            <h2
              className={`hover:cursor-pointer text-center py-2 rounded-t-xl ${activeItem === 'posts' ? 'bg-[#c0daeb]' : ''}`}
              onClick={() => handleClick('posts')}
            >
              Mis publicaciones
            </h2>
            <h2
              className={`hover:cursor-pointer text-center py-2 rounded-t-xl ${activeItem === 'itineraries' ? 'bg-[#c0daeb]' : ''}`}
              onClick={() => handleClick('itineraries')}
            >
              Mis itinerarios
            </h2>
          </div>
          <div
            className={`rounded-xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] lg:w-[100%] w-[90%] mx-auto ${activeItem === 'itineraries' ? 'hidden' : ''}`}
          >
            <CreatePost options={options} profilePicture={user?.profilePicture} />
          </div>
          {/* Content */}
          <div
            className="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:w-[100%] w-[90%] mx-auto"
            ref={contentRef}
          >
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
