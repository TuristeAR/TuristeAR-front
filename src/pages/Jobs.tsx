import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';

import { CreatePublications } from '../components/Community/CreatePublications';
import { ItineraryCard } from '../components/ImageGallery/ItineraryCard';
const itineraries = [
  {
    imgPerson: '/assets/person.svg',
    usuario: 'Pablo Ramirez',
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
    usuario: 'Victor Gonzalez',
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

export const Jobs = () => {
  return (
    <>
      <Header containerStyles={' relative top-0 z-[60]'} />
      <div className="flex justify-between h-[160vh] ">
        <LeftCommunity vista={'jobs'} activeItem={'posts'} categorySelected={null} handleClick={null} setCategorySelected={null} />
        <div className="lg:w-[80%] pt-10 pb-10 overflow-scroll scrollbar-hidden ">
          <div className="lg:w-[80%] w-[90%] mx-auto rounded-xl mb-10 shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] ">
            <CreatePublications />
          </div>
          <div className="flex flex-col gap-6 lg:w-[80%] w-[90%] mx-auto" >
            {itineraries.map((userPost, index) => (
              <ItineraryCard
                key={index}
                profilePicture={userPost.imgPerson}
                userId={userPost.usuario}
                creationDate={userPost.fecha}
                description={userPost.descripcion}
                images={[userPost.img[0].src]}
                likes={0} reposts={0} saved={0}/>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
