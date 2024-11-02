import React from 'react';
import { Link } from 'react-router-dom';

type User={
  id: number;
  name: string,
  profilePicture: string,
  description: string,
  birthdate: string,
  coverPicture: string,
  location: string
}

type TravelData={
  id: number,
  imgProvince: string;
  province: string;
  departure: string;
  arrival: string;
  participants: User[] | [];
}

export const ItineraryCard : React.FC<TravelData> = ({imgProvince,province,departure,arrival,participants,id}) => {
  const reorderDate = (dateString : string ) => {
    const formatDate = (date) => {
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    };

    return formatDate(dateString)
  };

  return (
    <>
      <div className="lg:w-[100%] lg:mb-0 mb-6 mx-auto rounded-2xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] flex lg:flex-row flex-col">
        <div className="lg:w-[40%]">
          <img
            src={imgProvince}
            alt=""
            className="w-[100%] h-[100%] lg:rounded-l-2xl lg:rounded-tr-none rounded-t-2xl object-cover"
          />
        </div>
        <div className="lg:w-[60%] p-4 flex flex-col gap-2">
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
          <Link to={'/itineraryCalendar/'+id} className="rounded-2xl py-2 bg-primary hover:bg-primary-3 text-white text-center w-[150px]">
            <p>Ver más</p>
          </Link>
        </div>
      </div>
    </>
  );
}
