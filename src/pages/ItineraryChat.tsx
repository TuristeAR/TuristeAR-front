import { Header } from '../components/Header/Header';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
};

const ItineraryChat = () => {
  const { itineraryId } = useParams();

  const [forum, setForum] = useState<Forum | null>(null);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = UseFetchSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!itineraryId || itineraryId === 'undefined') {
          console.error('forumId is undefined or invalid');
          return;
        }

        const itineraryResponse = await fetch(
          `${process.env.VITE_API_URL}/itinerary/${itineraryId}`,
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
                <Link to={`/itineraryCalendar/${itineraryId}`} className="md:mr-10 md:pl-10">
                  <img src={'/assets/arrow-prev.svg'} alt={'Regresar'} className={'w-[50px]'} />
                </Link>
                <h1 className="text-3xl">{itinerary?.name}</h1>
              </div>
              <div className="overflow-scroll scrollbar-hidden h-[81%] lg:px-4 px-2 py-6  flex flex-col gap-y-6">
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
