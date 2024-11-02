import React from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

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

  const reorderDate = (dateString : string ) => {
    const formatDate = (date) => {
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    };

    return formatDate(dateString)
  };

  const deleteItinerary = async (id: number) => {
    const socket = io('https://api-turistear.koyeb.app');
    socket.emit('deleteItinerary', {
      itineraryId: id,
      userId: userId,
    });
    onDelete()
  }

  return (
    <>
      <div
        className="lg:w-[100%] lg:mb-0 mb-6 mx-auto rounded-2xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] flex lg:flex-row flex-col relative">
        <div className="lg:w-[40%]">
          <img
            src={imgProvince}
            alt=""
            className="w-[100%] h-[100%] lg:rounded-l-2xl lg:rounded-tr-none rounded-t-2xl object-cover"
          />
        </div>
        <div className="lg:w-[60%] p-4 flex flex-col gap-2 relative">
          <button onClick={()=> deleteItinerary(id)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="text-2xl lg:text-lg">{province}</h1>
          <div className="flex flex-col gap-2 text-l">
            <p>Ida : {departure && typeof departure === 'string' ? reorderDate(departure.slice(0, -14)) : ''}</p>
            <p>Vuelta: {arrival && typeof arrival === 'string' ? reorderDate(arrival.slice(0, -14)) : ''}</p>
          </div>
          <details>
            <summary className="font-semibold">Participantes:</summary>
            {participants.map((participant, index) => (
              <div key={index} className="flex items-center gap-2 mt-2">
                <img
                  src={participant.profilePicture}
                  alt={`Imagen de ${participant.name}`}
                  className="w-[20px] h-[20px] rounded-full"
                />
                <p>{participant.name}</p>
              </div>
            ))}
          </details>
          <Link to={'/itineraryCalendar/' + id}
                className="rounded-2xl py-2 bg-primary hover:bg-primary-3 text-white text-center w-[150px]">
            <p>Ver más</p>
          </Link>
        </div>
      </div>
    </>
  );
}
