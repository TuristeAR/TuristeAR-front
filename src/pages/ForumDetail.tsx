import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';
import { CreateMessage } from '../components/Community/CreateMessage';
import { MessagesContainer } from '../components/Community/MessagesContainer';

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

  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [forum, setForum] = useState<Forum | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionResponse = await fetch('https://api-turistear.koyeb.app/session', {
          method: 'GET',
          credentials: 'include',
        });

        if (!sessionResponse.ok) {
          window.location.href = '/login';
          return;
        }

        const sessionData = await sessionResponse.json();
        setUser(sessionData.user);

        if (!id || id === 'undefined') {
          console.error('forumId is undefined or invalid');
          return;
        }

        const forumResponse = await fetch(`https://api-turistear.koyeb.app/forum/${id}`, {
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

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50 border border-gray-50 rounded-lg">
          <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
        </div>
      ) : (
        <>
          <Header containerStyles={'relative top-0 z-[60]'} />
          <div className="flex h-[100vh]">
            <LeftCommunity
              vista={'forum'}
              activeItem={'posts'}
              categorySelected={categorySelected}
              handleClick={null}
              setCategorySelected={setCategorySelected}
            />
            <div className="lg:w-[80%] w-[100%] flex flex-col overflow-scroll scrollbar-hidden">
              <div
                className={'shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] min-h-[8%] flex flex-col p-4'}
              >
                <h1 className="text-3xl">{forum?.name}</h1>
                <h3 className={'text-[#999999]'}>{forum.category.description}</h3>
              </div>
              <div className="overflow-scroll scrollbar-hidden h-[90%] lg:px-4 px-2 py-6  flex flex-col gap-y-6">
                <MessagesContainer forum={forum} user={user} />
              </div>

              <CreateMessage user={user} forum={forum} setForum={setForum} />
            </div>

          </div>
        </>
      )}
    </>
  );
};

export default ForumDetail;
