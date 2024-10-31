interface EventCardProps {
  fromDate: Date;
  toDate: Date;
  name: string;
  locality: string;
  description: string;
  image: string;
  id: number;
  isSelected: boolean;
  onSelect: (id: number, locality: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  fromDate,
  toDate,
  name,
  locality,
  description,
  image,
  id,
  isSelected,
  onSelect,
}) => {
  return (
    <div className="h-[500px] max-w-xs m-auto bg-white border border-primary-3 rounded-lg shadow relative group overflow-hidden transform transition-transform duration-300  hover:shadow-sm hover:shadow-gray hover:-translate-y-1.5 mt-2">
      <div className="relative z-30">
        <div className="h-[180px] overflow-hidden">
          <img
            className="rounded-t-lg h-full w-full object-cover transition-all duration-300 group-hover:scale-125 "
            src={image}
            alt={name}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between h-[320px] relative z-20 p-5">
        <div>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{name}</h5>
          <p className="italic text-md mt-auto font-light">{locality}</p>
        </div>
        <div className="my-2">
          <p className="text-sm text-gray-700">
            {description.length > 120 ? description.substring(0, 117) + '...' : description}
          </p>
        </div>
        <div className="my-2">
          <p className="text-sm text-gray-700 font-semibold">
            {fromDate && toDate && fromDate !== toDate ? (
              <>
                {new Date(fromDate).toLocaleDateString('es-ES')} -{' '}
                {new Date(toDate).toLocaleDateString('es-ES')}
              </>
            ) : (
              new Date(fromDate).toLocaleDateString('es-ES')
            )}
          </p>
        </div>
        <div className="my-2">
          <button
            type="button"
            className={`w-full text-center bg-primary-3 text-white py-2 px-4 rounded-lg font-semibold ${isSelected ? 'bg-[#ff8c00] bg-opacity-70' : ''}`}
            onClick={() => onSelect(id, locality)}
          >
            {isSelected ? (
              <>
                <span>Evento agregado</span>
                <span className="absolute ml-10 font-bold">X</span>
              </>
            ) : (
              <span>Quiero ir</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
