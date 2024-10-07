import React from 'react';

interface Participant {
  imgPerson: string;
  user: string;
}

interface TravelData{
  imgProvince: string;
  province: string;
  departure: string;
  arrival: string;
  participants: Participant[];
}

export const TravelCard : React.FC<TravelData> = ({imgProvince,province,departure,arrival,participants}) => {
  return (
    <>
      <div className="lg:w-[100%] mx-auto rounded-2xl shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] flex lg:flex-row flex-col">
        <div className="lg:w-[40%]">
          <img
            src={imgProvince}
            alt=""
            className="w-[100%] h-[100%] lg:rounded-l-2xl lg:rounded-tr-none rounded-t-2xl"
          />
        </div>
        <div className="lg:w-[60%] p-4 flex flex-col gap-2">
          <h1 className="text-2xl">{province}</h1>
          <div className="flex flex-col gap-2">
            <p className="text-l">Ida: {departure}  </p>
            <p className="text-l">Vuelta: {arrival}</p>
          </div>
          <details>
            <summary className="font-semibold">Participantes:</summary>
            {participants.map((participant, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <img
                  src={participant.imgPerson}
                  alt={`Imagen de ${participant.user}`}
                  className="w-[20px]"
                />
                <p className="text-l">{participant.user}</p>
              </div>
            ))}
          </details>
          <div className="rounded-2xl py-2 bg-primary hover:bg-primary-3 text-white text-center w-[150px]">
            <a href="/destinations">Ver más</a>
          </div>
        </div>
      </div>
    </>
  );
}
