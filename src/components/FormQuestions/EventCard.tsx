import React from 'react';

interface EventCardProps {
  fromDate: Date;
  toDate: Date;
  name: string;
  locality: string;
  description: string;
  image: string;
}

export const EventCard: React.FC<EventCardProps> = (event: {
  fromDate: Date;
  toDate: Date;
  name: string;
  locality: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="h-[470px] max-w-xs m-auto bg-white border border-primary-3 rounded-lg shadow relative group overflow-hidden transform transition-transform duration-300  hover:shadow-sm hover:shadow-gray hover:-translate-y-1.5 mt-2">
      <div className="relative z-30">
        <div className="h-[200px] overflow-hidden">
          <img
            className="rounded-t-lg h-full w-full object-cover transition-all duration-300 group-hover:scale-125 "
            src={event.image}
            alt={event.name}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between h-[270px] relative z-20 p-5">
        <div>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{event.name}</h5>
          <p className="italic text-md mt-auto font-light">{event.locality}</p>
        </div>
        <div className="my-2">
          <p className="text-sm text-gray-700">
            {event.description.length > 140
              ? event.description.substring(0, 137) + '...'
              : event.description}
          </p>
        </div>
        <div className="my-2">
          <p className="text-sm text-gray-700 font-semibold">
            {new Date(event.fromDate).toLocaleDateString('es-ES')} -{' '}
            {new Date(event.toDate).toLocaleDateString('es-ES')}
          </p>
        </div>
      </div>
    </div>
  );
};
