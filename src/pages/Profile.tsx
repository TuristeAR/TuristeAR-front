import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { CreatePost } from '../components/Community/CreatePost';
import { ItineraryCard } from '../components/ImageGallery/ItineraryCard';
import { TravelCard } from '../components/Community/TravelCard';
import { useEffect, useRef, useState } from 'react';

const itineraries = [
  {
    imgPerson: '/assets/person.svg',
    usuario: 'Manuel López',
    fecha: '26 Sep 2024',
    descripcion:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
  },
  {
    imgPerson: '/assets/person.svg',
    usuario: 'Manuel López',
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
const travels =[
  {
    imgProvince: '/assets/san-nicolas-buenos-aires.webp',
    province: 'Buenos Aires',
    departure: '09-12-2018',
    arrival: '04-11-2023',
    participants:[
      {
        imgPerson: '/assets/person.svg',
        user: 'Germán Cano',
      },
      {
        imgPerson: '/assets/person.svg',
        user: 'John Kennedy',
      },
      {
        imgPerson: '/assets/person.svg',
        user: 'Fernando Diniz',
      },
    ]
  },
  {
    imgProvince: '/assets/san-nicolas-buenos-aires.webp',
    province: 'Catamarca',
    departure: '25-02-2023',
    arrival: '04-03-2023',
    participants:[
      {
        imgPerson: '/assets/person.svg',
        user: 'Germán Cano',
      }
    ]
  },
]
const components={
  travels : travels.map((travel, index) => (
      <TravelCard key={index} imgProvince={travel.imgProvince} province={travel.province}
                  departure={travel.departure} arrival={travel.arrival}
                  participants={travel.participants}  />
    )),
  posts : itineraries.map((itinerarie, index) => (
    <ItineraryCard key={index} imgPerson={itinerarie.imgPerson} usuario={itinerarie.usuario}
                   fecha={itinerarie.fecha} descripcion={itinerarie.descripcion} img={itinerarie.img} />
  ))
}
const options = ['Imagen', 'Itinerario', 'Categoría', 'Ubicación'];

const Profile = () => {
  // @ts-ignore
  const [content, setContent] = useState<React.JSX.Element | null>(components.posts);
  const [activeItem, setActiveItem] = useState('posts');
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

  const handleClick = (name: string) => {
    setActiveItem(name)
    // @ts-ignore
    setContent(components[name]);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api-turistear.koyeb.app/session', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          window.location.href = '/login';
        }
        return response.json();
      })
      .then((data) => {
        setIsAuthenticated(true);
        setUser(data.user);
        setError('');
      })
      .catch((err) => {
        setError('Error al obtener el usuario!');
        setIsAuthenticated(false);
      });
  }, []);

  if(!isAuthenticated){
    return (<><p>User is not authenticated</p></>);
  }

  // @ts-ignore
  return (
    <>
      <Header containerStyles={'relative top-0 z-[60]'} />
      <div className="flex justify-between h-[160vh] ">
        <LeftCommunity />
        <div className="lg:w-[80%] w-[100%] lg:p-10 lg:pt-0 flex flex-col gap-10 overflow-scroll scrollbar-hidden">
          {/* Portada */}
          <div className="">
            <div className="h-[200px]">
              <img src={user?.coverPicture} alt={'Foto de portada'} className={'w-[100%] h-[100%]'}/>
            </div>
            <div className="flex text-l relative pl-2">
              <div className="lg:w-[78%] w-[90%] pt-4">
                <div className="lg:flex items-center lg:flex-row flex-col gap-x-4">
                  <h1 className="lg:text-3xl text-xl tracking-[.1em] text-[#215a9d]">
                    {user?.name}
                  </h1>
                  <h3 className="text-xl text-[#a2c8de]">{'@'+user?.username}</h3>
                </div>
                <p className="mt-4">
                  {user?.description}
                </p>
                <div className="flex gap-4 lg:text-[14px] text-[10px] mt-2 text-[#999999]">
                  <div className="flex items-center gap-x-2">
                    <img src="/assets/location.svg" alt="Ubicación" className="w-6 h-6" />
                    <p>{user?.location}</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <img src="/assets/calendar.svg" alt="Calendario" className="w-6 h-6" />
                    <p>{user?.birthdate.slice(0,-14)}</p>
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
              className={`hover:cursor-pointer text-center pb-2 rounded-t-xl ${activeItem === 'posts' ? 'bg-[#c0daeb]' : ''}`}
              onClick={() => handleClick('posts')}
            >
              Mis publicaciones
            </h2>
            <h2
              className={`hover:cursor-pointer text-center pb-2 rounded-t-xl ${activeItem === 'travels' ? 'bg-[#c0daeb]' : ''}`}
              onClick={() => handleClick('travels')}
            >
              Mis viajes
            </h2>
          </div>
          <div
            className={`rounded-xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] lg:w-[100%] w-[90%] mx-auto ${activeItem === 'travels' ? 'hidden' : ''}`}
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
