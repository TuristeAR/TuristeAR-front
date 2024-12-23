import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';
import { CreateMessage } from '../components/Community/CreateMessage';
import { MessagesContainer } from '../components/Community/MessagesContainer';
import { UseFetchSession } from '../utilities/useFetchSession';

type Category = {
  id: number;
  description: string;
};

type User = {
  id: number;
  name: string;
  profilePicture: string;
  description: string;
  birthdate: string;
  coverPicture: string;
  location: string;
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
  messages: Message[];
};

const ForumDetail = () => {
  const { id } = useParams();

  const { user } = UseFetchSession();
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [forum, setForum] = useState<Forum | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id || id === 'undefined') {
          console.error('forumId is undefined or invalid');
          return;
        }

        const forumResponse = await fetch(`${process.env.VITE_API_URL}/forum/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!forumResponse.ok) {
          console.log('Error al obtener el foro:', await forumResponse.json());
        } else {
          const forumData = await forumResponse.json();
          setForum(forumData);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching forum data:', error);
      }
    };

    fetchData();
  }, [id]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50 border border-gray-50 rounded-lg">
          <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
        </div>
      ) : (
        <>
          <Header containerStyles={'relative top-0 z-[60]'} />
          <div
            className={`flex justify-between h-[100vh] relative ${isOpen ? 'overflow-hidden' : ''}`}
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
            <div className="absolute md:static lg:w-[80%] w-[100%] flex flex-col overflow-scroll scrollbar-hidden">
              <div
                className={
                  'shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] min-h-[8%] flex flex-col lg:p-6 p-4 lg:pt-6 pt-10 lg:pb-6 pb-3 gap-2'
                }
              >
                <div className={'flex items-center justify-between'}>
                  <h1 className="lg:text-3xl text-2xl">{forum?.name}</h1>
                  <h3 className={'text-[#999999] lg:text-sm text-[12px]'}>
                    {forum.category.description}
                  </h3>
                </div>
                <div className={''}>
                  <p className={'lg:text-sm text-[10px] text-[#484b56]'}>{forum.description}</p>
                </div>
              </div>

              {user && (
                <>
                  <div className="overflow-scroll scrollbar-hidden h-[75%] lg:px-4 px-2 py-6  flex flex-col gap-y-6">
                    <MessagesContainer forum={forum} user={user} />
                  </div>
                  <CreateMessage user={user} forum={forum} setForum={setForum} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForumDetail;
