import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { formatDate } from '../../utilities/formatDate';

export const ItineraryCard = (props: {
  imgProvince: string,
  province: string,
  departure: string,
  arrival: string,
  participants: any[],
  userId: number,
  id: number,
  onDelete:() =>void
}) => {
  const {imgProvince, province, departure, arrival, participants, userId, id, onDelete} = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean | null>(false);

  const deleteItinerary = async (id: number) => {
    const socket = io('http://localhost:3001');
    socket.emit('deleteItinerary', {
      itineraryId: id,
      userId: userId,
    });
    onDelete()
  }

  return (
    <>
      <div className="lg:w-[100%] lg:mb-0 mb-6 mx-auto rounded-2xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] flex lg:flex-row flex-col relative">
        <div className="lg:w-[40%]">
          <img
            src={imgProvince}
            alt=""
            className="w-[100%] h-[100%] lg:rounded-l-2xl lg:rounded-tr-none rounded-t-2xl object-cover"
          />
        </div>
        <div className="lg:w-[60%] p-4 grid grid-rows-3 items-center relative">
          <div className={'flex items-center justify-between'}>
            <h1 className="text-2xl lg:text-lg">{province}</h1>
            <img
              src={'/assets/menu.svg'}
              alt={'Menú'}
              className={'w-[28px] cursor-pointer'}
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen);
              }}
            />
          </div>
          <div className="absolute -top-6 right-6 bg-white shadow-lg rounded-lg my-3 w-44 z-50">
            <button
              onClick={() => deleteItinerary(id)}
              className={`${isDropdownOpen ? 'block' : 'hidden'} w-full text-left px-4 py-2 text-gray-700 font-medium hover:bg-primary rounded-md transition duration-200 ease-in-out`}
            >
              Eliminar
            </button>
          </div>

          <div className="flex flex-col gap-2 text-l">
            <p>
              Ida :{' '}
              {departure && typeof departure === 'string'
                ? formatDate(departure.slice(0, -14))
                : ''}
            </p>
            <p>
              Vuelta:{' '}
              {arrival && typeof arrival === 'string' ? formatDate(arrival.slice(0, -14)) : ''}
            </p>
          </div>
          <details className="">
            <summary className="font-semibold">Participantes:</summary>
            <div className={'flex gap-2 p-2'}>
              {participants.map((participant, index) => (
                <img key={index}
                  src={participant.profilePicture}
                  alt={`Imagen de ${participant.name}`}
                  className="w-[20px] h-[20px] rounded-full"
                />
              ))}
            </div>
          </details>
          <Link
            to={'/itineraryCalendar/' + id}
            className="rounded-2xl py-2 bg-primary hover:bg-primary-3 text-white text-center w-[150px]"
          >
            <p>Ver más</p>
          </Link>
        </div>
      </div>
    </>
  );
}
