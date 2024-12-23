import formatEventDate from '../../utilities/formatEventDate';
import { Locality } from '../../pages/FormQuestions';

interface EventCardProps {
  fromDate: Date;
  toDate: Date;
  name: string;
  locality: Locality;
  description: string;
  image: string;
  id: number;
  isSelected: boolean;
  onSelect: (id: number, locality: Locality) => void;
  isLoading?: boolean;
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
  isLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <div className="h-[350px] sm:max-h-[450px] max-w-[90%] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[950px] m-auto bg-white border border-primary-3 rounded-lg shadow relative group overflow-hidden transform transition-transform duration-300 hover:shadow-sm hover:shadow-gray hover:-translate-y-1.5 mt-6 flex flex-col md:flex-row">
          {/* Img */}
          <div className="relative z-30 w-full md:w-1/2">
            <div className="h-[80px] sm:h-full max-w-full w-full overflow-hidden">
              <img
                className="rounded-t-lg md:rounded-l-lg md:rounded-tr-none h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                src={image}
                alt={name}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between p-4 sm:p-5 max-h-[350px] h-full md:h-[320px] w-full md:w-1/2 relative z-20">
            <div>
              <h5 className="mb-2 text-base sm:text-xl font-bold tracking-tight text-gray-900">
                {name}
              </h5>
              <p className="italic text-sm sm:text-md font-light">{locality?.name}</p>
            </div>
            <div className="my-2">
              <p className="text-xs sm:text-lg text-gray-700">{description}</p>
            </div>
            <div className="my-2">
              <p className="text-xs sm:text-sm text-gray-700 font-semibold">
                {formatEventDate(
                  fromDate instanceof Date
                    ? fromDate.toISOString()
                    : new Date(fromDate).toISOString(),
                  toDate instanceof Date ? toDate.toISOString() : new Date(toDate).toISOString(),
                )}
              </p>
            </div>
          </div>
        </div>
      ) : (
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
              <p className="italic text-md mt-auto font-light">{locality?.name}</p>
            </div>
            <div className="my-2">
              <p className="text-sm text-gray-700">
                {description?.length > 120 ? description.substring(0, 117) + '...' : description}
              </p>
            </div>
            <div className="my-2">
              <p className="text-sm text-gray-700 font-semibold">
                {formatEventDate(
                  fromDate instanceof Date
                    ? fromDate.toISOString()
                    : new Date(fromDate).toISOString(),
                  toDate instanceof Date ? toDate.toISOString() : new Date(toDate).toISOString(),
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
      )}
    </>
  );
};
