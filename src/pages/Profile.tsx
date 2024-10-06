import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { RightCommunity } from '../components/Community/RightCommunity';
import { CreatePost } from '../components/Community/CreatePost';
import { ItineraryCard } from '../components/ImageGallery/ItineraryCard';

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
const options = ['Imagen', 'Itinerario', 'Categoría', 'Ubicación'];

const Profile = () => {
  return (
    <>
      <Header containerStyles={'bg-primary relative top-0 z-[60]'} />
      <div className="flex justify-between h-[160vh] ">
        <LeftCommunity />
        <div className="lg:w-[64%] w-[100%] lg:p-10 lg:pt-0 flex flex-col gap-10 overflow-scroll scrollbar-hidden">
          {/* Portada */}
          <div className="">
            <div className="h-[200px] bg-black"></div>
            <div className="flex text-l relative pl-2">
              <div className="lg:w-[78%] w-[90%] pt-4">
                <div className="lg:flex items-center lg:flex-row flex-col gap-x-4">
                  <h1 className="lg:text-3xl text-xl tracking-[.1em] text-[#215a9d]">Manuel López</h1>
                  <h3 className="text-xl text-[#a2c8de]">@Manu10</h3>
                </div>
                <p className="mt-4">
                  Explorador apasionado de nuevas culturas y destinos. Compartiendo experiencias
                  únicas de viajes, consejos útiles y las mejores rutas para descubrir Argentina,
                  ¡Acompáñame en esta aventura!
                </p>
                <div className="flex gap-4 lg:text-[14px] text-[10px] mt-2 text-[#999999]">
                  <div className="flex items-center gap-x-2">
                    <img src="/assets/location.svg" alt="Ubicación" className="w-6 h-6" />
                    <p>Argentina, Buenos Aires</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <img src="/assets/calendar.svg" alt="Calendario" className="w-6 h-6"  />
                    <p>22 de enero del 2000</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6 items-center absolute right-0 -top-20 ">
                <div className="lg:w-[150px] w-[100px] lg:h-[150px] h-[100px] bg-gray border-white border-4"></div>
                <button className="lg:btn-blue px-4 py-2 bg-primary hover:bg-primary-3 text-white rounded-2xl">Editar perfil</button>
              </div>
            </div>
          </div>
          {/* Publicaciones */}
          <div className="border-b border-black pb-2">
            <h2 className="lg:text-2xl text-xl lg:ml-0 ml-4 font-semibold">Mis publicaciones</h2>
          </div>
          <div className="rounded-xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] lg:w-[100%] w-[90%] mx-auto ">
            <CreatePost options={options} />
          </div>
          {/* Posts */}
          <div className="flex flex-col gap-6 lg:w-[100%] w-[90%] mx-auto">
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
