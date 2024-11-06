import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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

type Itinerary = {
  id: number;
  name: string;
};

type Forum = {
  id: number;
  name: string;
  description: string;
  category: Category | null;
  messages: Message[];
  itinerary: Itinerary;
};

const ItineraryChat = () => {
  const { itineraryId } = useParams();

  const [forum, setForum] = useState<Forum | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
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

        if (!itineraryId || itineraryId === 'undefined') {
          console.error('forumId is undefined or invalid');
          return;
        }

        const itineraryResponse = await fetch(
          `https://api-turistear.koyeb.app/itinerary/${itineraryId}`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );

        if (!itineraryResponse.ok) {
          console.log('Error al obtener el chat del itinerario:', await itineraryResponse.json());
        } else {
          const chatData = await itineraryResponse.json();
          setForum(chatData.data.itinerary.forum);
          setItinerary(chatData.data.itinerary);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching forum data:', error);
      }
    };
    fetchData();
  }, [itineraryId]);

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
            <div className="lg:w-[100%] w-[100%] flex flex-col overflow-scroll scrollbar-hidden">
              <div
                className={
                  'shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] min-h-[8%] flex items-center p-4'
                }
              >
                <Link to={`/itineraryCalendar/${itineraryId}`}>
                  <img src={'/assets/arrow-prev.svg'} alt={'Regresar'} className={'w-[40px]'} />
                </Link>
                <h1 className="text-3xl">{itinerary?.name}</h1>
              </div>
              <div className="overflow-scroll scrollbar-hidden lg:px-4 px-2 py-6 h-[86%]  flex flex-col gap-y-6">
                <MessagesContainer forum={forum} user={user} />
              </div>
              <div className="flex justify-center">
                <CreateMessage user={user} forum={forum} setForum={setForum} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ItineraryChat;
