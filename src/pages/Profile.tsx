import { Header } from '../components/Header';
import LeftCommunity from '../components/LeftCommunity';
import RightCommunity from '../components/RightCommunity';
import CreatePost from '../components/CreatePost';
import ItineraryCard from '../components/ItineraryCard';

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
    ]
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
  }
];
const options=[ "Imagen", "Itinerario", "Categoría", "Ubicación" ]

const Profile = () => {
  return (
    <>
      <Header containerStyles={'bg-primary relative top-0 z-[60]'} />
      <div className="flex justify-between h-[160vh] ">
        <LeftCommunity />
        <div className="w-[64%] p-10 pt-0 flex flex-col gap-10 overflow-scroll scrollbar-hidden">
          {/* Portada */}
          <div className="">
            <div className="h-[200px] bg-black"></div>
            <div className="flex text-l relative">
              <div className="w-[78%] pt-4">
                <div className="flex items-center gap-x-4">
                  <h1 className="text-3xl tracking-[.1em] text-[#215a9d]">Manuel López</h1>
                  <h3 className="text-xl text-[#a2c8de]">@Manu10</h3>
                </div>
                <p>
                  Explorador apasionado de nuevas culturas y destinos. Compartiendo experiencias
                  únicas de viajes, consejos útiles y las mejores rutas para descubrir Argentina,
                  ¡Acompáñame en esta aventura!
                </p>
                <div className="flex gap-4 text-[14px] mt-2 text-[#999999]">
                  <div className="flex items-center gap-x-2">
                    <img src="/assets/location.svg" alt="Ubicación" className="w-6 h-6" />
                    <p>Ubicación: Argentina, Buenos Aires</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <img src="/assets/calendar.svg" alt="Calendario" className="w-6 h-6"  />
                    <p>Fecha de Nacimiento: 22 de enero del 2000</p>
                  </div>
                </div>
              </div>
              <div className="w-[22%] flex flex-col gap-6 items-center absolute right-0 -top-20 ">
                <div className="w-[150px] h-[150px] bg-gray border border-white border-4"></div>
                <button className="btn-blue rounded-2xl">Editar perfil</button>
              </div>
            </div>
          </div>
          {/* Publicaciones */}
          <div className="border-b border-black pb-2">
            <h2 className="text-2xl font-semibold">Mis publicaciones</h2>
          </div>
          <div className="border border-black rounded-xl">
            <CreatePost options={options} />
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
        <RightCommunity />
      </div>
    </>
  );
};

export default Profile;