import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';
import { CreateForums } from '../components/Community/CreateForums';

const Forum = () => {

  type Category = {
    id: number,
    description: string
  };

  type Forum = {
    id: number;
    name: string;
    description: string;
    category: Category | null;
  };

  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [forums, setForums] = useState<Forum[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true)

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
        setIsLoading(false)
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ?
        <div className="w-[90%] md:w-full mx-auto min-h-[90vh] flex flex-col items-center justify-center">
          <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
        </div>
        :
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
            <div className="lg:w-[80%] w-[100%] lg:p-10 p-4 flex flex-col gap-10 overflow-scroll scrollbar-hidden">

              <CreateForums />

              <div className={'grid lg:grid-cols-2 grid-cols-1 gap-6'}>
                {forums?.filter((forum)=> {
                  return categorySelected == null || forum.category.id == categorySelected;
                } ).map((forum, index) => (
                  <div
                    key={index}
                    className="w-[100%] mx-auto p-4 rounded-2xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] flex flex-col gap-4"
                  >
                    <h1 className={'text-2xl'}>{forum.name}</h1>
                    <p>{forum.description}</p>
                    <div className={'flex justify-end'}>
                      <div
                        className="lg:btn-blue px-4 py-2 bg-primary hover:bg-primary-3 text-white rounded-2xl flex items-center justify-center">
                        <a href={`/forum/${forum.id}`}>
                          Ingresar
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>}
    </>
  );
};

export default Forum;
