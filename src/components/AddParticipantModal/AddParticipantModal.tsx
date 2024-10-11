import { useState } from 'react';
import ParticipantTabs from './ParticipantTabs';

interface ParticipantTabsProps {
    itinerary?: number;
  }
export const AddParticipantModal: React.FC<ParticipantTabsProps> = ({ itinerary }) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  return (
    <>
      <button
        className="bg-primary text-white active:bg-pink-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Agrergar Participantes
      </button>
      {showModal && (
        <>
        
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none">
          <div
            className="fixed inset-0 bg-black opacity-25"
            onClick={closeModal}
          ></div>
            <div className="relative w-auto my-6 mx-auto max-w-3xl z-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5  rounded-t">
                  <div className="flex flex-col mx-auto">
                    <h3 className="text-3xl font-bold text-center">Participantes</h3>
                    <p>
                      Compartí tu itinerario y permití que tus compañeros de viaje colaboren en la
                      planificación
                    </p>
                  </div>

                  <button
                    className="absolute top-0 right-0 p-1 bg-transparent border-0 text-black hover:text-gray-700 text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={closeModal}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block">
                      ×
                    </span>
                  </button>
                </div>
                {/*buttons */}
                <ParticipantTabs itinerary={itinerary}/>    
                            
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) }
    </>
  );
};
