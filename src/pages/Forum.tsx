import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';
import { CreateForums } from '../components/Community/CreateForums';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EditForum } from '../components/Community/EditForum';
import { UseFetchSession } from '../utilities/useFetchSession';

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
};

type Message = {
  content: string;
  images: string[];
  user: User;
  createdAt: string;
};

type Forum = {
  id: number;
  name: string;
  description: string;
  category: Category | null;
  user: User;
  messages: Message[];
};

const Forum = () => {
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [forums, setForums] = useState<Forum[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [description, setDescription] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = UseFetchSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const forumsResponse = await fetch(`${process.env.VITE_API_URL}/forums`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!forumsResponse.ok) {
          console.log('Error al obtener publicaciones:', await forumsResponse.json());
        } else {
          const forumsData = await forumsResponse.json();
          setForums(forumsData);
        }
        setIsLoading(false);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-[90%] md:w-full mx-auto min-h-[90vh] flex flex-col items-center justify-center">
          <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
        </div>
      ) : (
        <>
          <Header containerStyles={'relative top-0 z-[60]'} />
          <div
            className={`flex justify-between min-h-[88.8vh] relative ${isOpen ? 'overflow-hidden' : ''}`}
          >
            <LeftCommunity
              vista={'forum'}
              activeItem={'posts'}
              categorySelected={categorySelected}
              handleClick={null}
              setCategorySelected={setCategorySelected}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <div
              className="absolute md:static lg:w-[80%] w-[100%] pb-10 pt-6 flex flex-col gap-10 ${
                scrollbar-hidden"
            >
              <div className={'lg:w-[97%] w-[90%] mx-auto flex lg:flex-row flex-col lg:gap-4'}>
                <h2 className="my-4 md:my-1 text-2xl font-bold">Buscar foro</h2>
                <form className="flex flex-col gap-4">
                  <input
                    type="text"
                    onInput={(e) =>
                      setDescription(
                        //@ts-ignore
                        e.target.value,
                      )
                    }
                    className="border border-[#999999] rounded p-2 w-full lg:min-w-[800px] focus:outline-none"
                    placeholder="Buscar foro..."
                    autoComplete="off"
                  />
                </form>
              </div>
              <CreateForums />
              <div className={'grid lg:grid-cols-2 grid-cols-1 mx-4 gap-6'}>
                {forums?.filter((forum) => {
                  return (
                    (categorySelected == null || forum.category.id == categorySelected) &&
                    (description == null ||
                      forum.description.toLowerCase().includes(description.toLowerCase()) ||
                      forum.name.toLowerCase().includes(description.toLowerCase()))
                  );
                }).length > 0 ? (
                  forums
                    ?.filter((forum) => {
                      return (
                        (categorySelected == null || forum.category.id == categorySelected) &&
                        (description == null ||
                          forum.description.toLowerCase().includes(description.toLowerCase()) ||
                          forum.name.toLowerCase().includes(description.toLowerCase()))
                      );
                    })
                    .map((forum, index) => (
                      <div
                        key={index}
                        className="w-[100%] mx-auto h-fit p-4 rounded-2xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] flex flex-col gap-4"
                      >
                        <div className={'flex justify-between items-center'}>
                          <h1 className={'text-2xl'}>{forum.name}</h1>
                          {user && user.id == forum.user.id && forum.messages.length < 1 && (
                            <EditForum forum={forum} />
                          )}
                        </div>
                        <p>{forum.description}</p>
                        <div className={'flex justify-between items-center h-full'}>
                          <div className="flex items-center gap-2">
                            <MapPin name="info" />
                            <span className="text-sm text-gray">{forum.category.description}</span>
                          </div>
                          <Link
                            to={`/foro/${forum.id}`}
                            className="lg:btn-blue px-4 py-2 bg-primary hover:bg-primary-3 text-white rounded-2xl flex items-center justify-center"
                          >
                            Ingresar
                          </Link>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className={'p-4 bg-[#c0daeb] rounded-2xl col-span-2'}>
                    <p className={'text-3xl font-bold'}>No se encontraron foros!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Forum;
