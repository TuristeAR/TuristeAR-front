import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { formatDate } from '../../utilities/formatDate';
type User = {
  id: number;
  name: string;
  profilePicture: string;
  description: string;
  birthdate: string;
  coverPicture: string;
  location: string;
};

type Itinerary = {
  activities: any;
  id: number;
  createdAt: string;
  name: string;
  fromDate: string;
  toDate: string;
  participants: User[];
  user: User | null;
};

export const ItineraryCard = (props: {
  itinerary: Itinerary;
  userId: number;
  onDelete: () => void;
}) => {

  const { itinerary, userId, onDelete } = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean | null>(false);

  const deleteItinerary = async (id: number) => {
    const socket = io('https://api-turistear.koyeb.app');
    socket.emit('deleteItinerary', {
      itineraryId: id,
      userId: userId,
    });
    setIsDropdownOpen(false);
    onDelete();
  };

  const formatDepartureAndArrivalDate = (date: string) => {
    const dateFormatted = new Date(date);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    return dateFormatted.toLocaleDateString('es-ES', options);
  };

  return (
    <>
      <div className="lg:w-[100%] lg:mb-0 mb-6 mx-auto rounded-2xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] flex lg:flex-row flex-col relative">
        <div className="lg:w-[40%]">
          <img
            src={itinerary.activities[0]?.place?.province?.images[0] ||
              '/assets/TuristeAR-logo.png'}
            alt=""
            className="w-[100%] h-[100%] lg:rounded-l-2xl lg:rounded-tr-none rounded-t-2xl object-cover"
          />
        </div>
        <div className="lg:w-[60%] p-4 grid grid-rows-3 items-center relative">
          <div className={'flex items-center justify-between'}>
            <h1 className="text-2xl lg:text-lg">{itinerary.name}</h1>
            {userId == itinerary.user.id && (
              <img
                src={'/assets/menu.svg'}
                alt={'Menú'}
                className={'w-[28px] cursor-pointer'}
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              />
            )}
          </div>
          <div className="absolute -top-6 right-6 bg-white shadow-lg rounded-lg my-3 w-44 z-50">
            <button
              onClick={() => deleteItinerary(itinerary.id)}
              className={`${isDropdownOpen ? 'block' : 'hidden'} w-full text-left px-4 py-2 text-gray-700 font-medium hover:bg-primary rounded-md transition duration-200 ease-in-out`}
            >
              Eliminar
            </button>
          </div>
          <div className="flex flex-col gap-2 text-l">
            <p className="italic">Ida: {itinerary.fromDate && formatDepartureAndArrivalDate(itinerary.fromDate)}</p>
            <p className="italic">Vuelta: {itinerary.toDate && formatDepartureAndArrivalDate(itinerary.toDate)}</p>
          </div>
          <details className="">
            <summary className="font-semibold">Participantes:</summary>
            <div className={'flex gap-2 p-2'}>
              {itinerary.participants.map((participant, index) => (
                <img
                  key={index}
                  src={participant.profilePicture}
                  alt={`Imagen de ${participant.name}`}
                  className="w-[20px] h-[20px] rounded-full"
                />
              ))}
            </div>
          </details>
          <Link
            to={'/itineraryCalendar/' + itinerary.id}
            className="rounded-2xl py-2 bg-primary hover:bg-primary-3 text-white text-center w-[150px]"
          >
            <p>Ver más</p>
          </Link>
        </div>
      </div>
    </>
  );
};
