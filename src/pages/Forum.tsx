import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { useEffect, useState } from 'react';

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
     '/assets/san-nicolas-buenos-aires.webp' ,
     '/assets/san-nicolas-buenos-aires.webp' ,
     '/assets/san-nicolas-buenos-aires.webp' ,
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
      '/assets/san-nicolas-buenos-aires.webp' ,
      '/assets/san-nicolas-buenos-aires.webp' ,
      '/assets/san-nicolas-buenos-aires.webp' ,
    ],
  },
];

const Forum = () => {
  type Place = {
    name: string;
  };

  type Forum = {
    id: number;
    name: string;
    description: string;
    place: Place | null;
  };

  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [forums, setForums] = useState<Forum[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forumsResponse = await fetch(`https://api-turistear.koyeb.app/forums`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!forumsResponse.ok) {
          console.log('Error al obtener publicaciones:', await forumsResponse.json());
        } else {
          const forumsData = await forumsResponse.json();
          setForums(forumsData);
        }
      } catch (error) {}
    };

    fetchData();
  }, []);

  const enterTheForum = () => {};

  return (
    <>
      <Header containerStyles={'relative top-0 z-[60]'} />
      <div className="flex">
        <LeftCommunity
          vista={'forum'}
          activeItem={'posts'}
          categorySelected={categorySelected}
          handleClick={null}
          setCategorySelected={setCategorySelected}
        />
        <div className="lg:w-[80%] w-[100%] p-10 flex flex-col gap-10 overflow-scroll scrollbar-hidden">
          <div className={'grid grid-cols-2 gap-6'}>
            {forums?.map((forum, index) => (
              <div
                key={index}
                className="w-[100%] mx-auto p-4 rounded-2xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] flex flex-col gap-4"
              >
                <h1 className={'text-2xl'}>{forum.name}</h1>
                <p>{forum.description}</p>
                <div className={'flex justify-end'}>
                  <div className="lg:btn-blue px-4 py-2 bg-primary hover:bg-primary-3 text-white rounded-2xl flex items-center justify-center">
                    <a href={`/forum/${forum.id}`} onClick={enterTheForum}>
                      Ingresar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Forum;
