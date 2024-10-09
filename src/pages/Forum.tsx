import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { RightCommunity } from '../components/Community/RightCommunity';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { CreatePost } from '../components/Community/CreatePost';

const infoComments = [
  {
    user: 'Camila Ibarra',
    day: '25 sep 2024',
    comment:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus' +
      ' ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    imgPerson: '/assets/person.svg',
    imgs: [],
  },
  {
    user: 'Abigail Suriani',
    day: '25 sep 2024',
    comment:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus' +
      ' ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    imgPerson: '/assets/person.svg',
    imgs: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
  },
  {
    user: 'Abigail Suriani',
    day: '25 sep 2024',
    comment:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus' +
      ' ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    imgPerson: '/assets/person.svg',
    imgs: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
  },
];
const options = ['Imagen', 'Archivo', 'Itinerario'];

const Forum = () => {
  return (
    <>
      <Header containerStyles={'relative top-0 z-[60]'} />
      <div className="flex justify-between lg:h-[160vh] ">
        <LeftCommunity vista={'forum'} />
        <div className="lg:w-[80%] w-[100%] pt-10 overflow-scroll scrollbar-hidden">
          <div className="flex flex-col gap-y-6 lg:w-[80%] w-[100%] mx-auto  overflow-scroll scrollbar-hidden">
            {infoComments.map((info, index) => {
              return (
                <>
                  <div key={index} className="flex p-4">
                    <div className="w-[10%]">
                      <img src={info.imgPerson} alt="Person" />
                    </div>
                    <div className="w-[90%] flex flex-col gap-4">
                      <div className="flex justify-between items-center text-[#999999]">
                        <p className="text-xl">{info.user}</p>
                        <p className="text-l">{info.day}</p>
                      </div>
                      <p>{info.comment}</p>
                      <ImageGallery images={info.imgs} />
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="bg-[#009fe3] bg-opacity-10">
            <CreatePost options={options} profilePicture={'/assets/person.svg'}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forum;
