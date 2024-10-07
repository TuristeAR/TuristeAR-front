import { Header } from '../components/Header/Header';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { useState } from 'react';

export const ItineraryDetail = () => {
  const [showedInfo, setShowedInfo] = useState(false);

  const imgs = [
    {
      img: [
        { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
        { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
        { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
      ],
    },
  ];

  const itinerario = [
    {
      date: '10:00 - 12:00',
      title: 'Museo Nacional de Bellas artes',
      info: 'Aqui podras ver una gran cantidad de obras de arte de distintas epocas. Muy recomendado para los amantes del arte.',
    },
  ];

  return (
    <>
      <Header containerStyles="bg-primary" />

      <section>
        <div className="container mx-auto max-w-[980px] flex flex-col justify-center z-30 relative">
          <div className="w-full my-8 ">
            {imgs.map((img, index) => {
              return <ImageGallery key={index} images={img.img} height={70} />;
            })}
          </div>

          <div className="w-full m-auto my-2">
            <div className="flex gap-x-12 border-b pb-4 border-gray-50 ">
              {/* Informacion general */}
              <div className="md:max-w-[650px] flex-1">
                <div className="border-b pb-2 border-gray-50 ">
                  <h2 className="text-xl font-bold text-primary-3">
                    Viaje a Buenos Aires - 4 Días
                  </h2>
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
                  <button className="text-primary-4 text-sm font-semibold">Ir a calendario</button>
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

            <div className="mb-10">
              {/*Itinerario */}
              <h2 className="font-semibold text-md my-2">Itinerario de viaje</h2>
              <button className="btn-drop-down-blue-itinerary ">
                <h3
                  onClick={() => setShowedInfo(!showedInfo)}
                  className="text-sm sm:text-md font-semibold flex items-center rounded-md"
                >
                  Día 1 - Recoleta
                  <div className="icons">
                    <svg
                      className={`${!showedInfo ? 'block' : 'hidden'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      height="30px"
                      viewBox="0 -960 960 960"
                      width="50px"
                      fill="#FFFFFF"
                    >
                      <path d="M480-360 280-560h400L480-360Z" />
                    </svg>
                    <svg
                      className={`${showedInfo ? 'block' : 'hidden'}`}
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
              <div className={`${showedInfo ? 'block' : 'hidden'}`}>
                <div className="relative px-1 sm:px-0 flex gap-2 mt-5  flex-wrap">
                  {itinerario.map((item, index) => (
                    <div key={index} className="flex justify-center items-center px-8">
                      <div className="bg-gray-50 rounded-lg w-[115px] h-[35px] flex justify-center items-center ">
                        <span className='text-sm'>{item.date}</span>
                      </div>
                      <div className="flex border-l border-gray-50 ml-4 pl-1">
                        <p className="font-semibold">
                          {item.title}: <span className='font-normal'>{item.info}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
