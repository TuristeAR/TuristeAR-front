import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { useState } from 'react';
import useFetchItinerary from '../utilities/useFetchItinerary';

export const ItineraryDetail = () => {
  const { itineraryId } = useParams();

  const { itinerary, activities } = useFetchItinerary(itineraryId || null);

  const [showedInfo, setShowedInfo] = useState<boolean[]>([]);

  const toggleInfo = (index: number) => {
    setShowedInfo((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  const imgs = [
    {
      img: [
        { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
        { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
        { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
      ],
    },
  ];

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const options = { hour: '2-digit', minute: '2-digit', hour12: false } as const;
    return date.toLocaleTimeString([], options);
  };

  const activitiesByDay = activities.reduce((acc: any, activity: any) => {
    const date = new Date(activity.fromDate).toISOString().split('T')[0]; // Obtener solo la fecha
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {});

  return (
    <>
      <Header />
      <section>
        <div className="container mx-auto max-w-[980px] flex flex-col justify-center z-30 relative p-4">
          <div className="w-full my-8">
            {imgs.map((img, index) => {
              return <ImageGallery key={index} images={img.img} height={70} />;
            })}
          </div>

          <div className="w-full  my-2">
            <div className="flex flex-col md:flex-row gap-y-3 md:gap-x-12 border-b pb-4 border-gray-50 ">
              {/* Informacion general */}
              <div className="md:max-w-[650px] flex-1">
                <div className="border-b pb-2 border-gray-50 ">
                  <h2 className="text-xl font-bold text-primary-3">{itinerary?.name}</h2>
                </div>
                <div>
                  <h2 className="font-semibold text-md my-2">Información general</h2>
                  <p className="ml-4 text-sm">
                    Me quede un buen rato recorriendo las calles empedradas y mirando las ferias de
                    antiguedades, hasta me compre un par de cosas. Me encanto la arquitectura de la
                    iglesia y la plaza, muy lindo todo.
                  </p>
                </div>
              </div>
              {/* Calendario, Participantes */}
              <div className="flex flex-col gap-y-4">
                <div className="bg-primary/40 rounded-sm flex justify-center py-1">
                  <Link
                    to={`/ItineraryCalendar/${itineraryId}`}
                    className="text-primary-4 text-sm font-semibold"
                  >
                    Ir a calendario
                  </Link>
                </div>
                <div className="flex flex-col gap-y-2">
                  <p className="font-semibold text-md">Participantes</p>
                  <div className="flex gap-x-2">
                    <div className="bg-gray rounded-full w-9 h-9"></div>
                    <div className="bg-gray rounded-full w-9 h-9"></div>
                    <div className="bg-gray rounded-full w-9 h-9"></div>
                    <div className="bg-gray rounded-full w-9 h-9"></div>
                  </div>
                </div>
              </div>
            </div>
            {/*Itinerario */}
            <div className="mb-10">
              <h2 className="font-semibold text-md my-2">Itinerario de viaje</h2>
              {/* Días */}
              {activities.map((item: any, index: number) => {
                const dateKey = new Date(item.fromDate).toISOString().split('T')[0]; // Obtener la fecha para este día

                return (
                  <div key={index}>
                    <button
                      className="btn-drop-down-blue-itinerary"
                      onClick={() => toggleInfo(index)} // Asumir que toggleInfo actualiza el estado correspondiente a este índice
                    >
                      <h3 className="text-sm sm:text-md font-semibold flex items-center rounded-md">
                        Dia: {index + 1}
                        <div className="icons">
                          <svg
                            className={`${!showedInfo[index] ? 'block' : 'hidden'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            height="30px"
                            viewBox="0 -960 960 960"
                            width="50px"
                            fill="#FFFFFF"
                          >
                            <path d="M480-360 280-560h400L480-360Z" />
                          </svg>
                          <svg
                            className={`${showedInfo[index] ? 'block' : 'hidden'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            height="30px"
                            viewBox="0 -960 960 960"
                            width="50px"
                            fill="#FFFFFF"
                          >
                            <path d="m280-400 200-200 200 200H280Z" />
                          </svg>
                        </div>
                      </h3>
                    </button>

                    {/* Info */}
                    <div className={`${showedInfo[index] ? 'block' : 'hidden'}`}>
                      <div className="relative px-1 sm:px-0 flex flex-col gap-2 my-2 flex-wrap">
                        {/* Título del día */}
                        <h3 className="font-semibold text-sm px-10">
                          {new Date(dateKey).toLocaleDateString()}
                        </h3>

                        {/* Mostrar actividades del día */}
                        {activitiesByDay[dateKey]?.map((activity: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 px-4 sm:px-8"
                          >
                            <div className="bg-gray-50 rounded-lg px-4 py-2 flex justify-center items-center">
                              <span className="text-sm">
                                {formatTime(activity.fromDate)} - {formatTime(activity.toDate)}
                              </span>
                            </div>
                            <div className="flex-1 border-l border-gray-200 pl-4 sm:pl-2">
                              <p className="font-semibold text-sm sm:text-base">
                                {activity.name?.split(' - ')[0]}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
