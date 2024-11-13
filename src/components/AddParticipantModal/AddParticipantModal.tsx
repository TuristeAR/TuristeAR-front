import { useEffect, useState } from 'react';
import ParticipantTabs from './ParticipantTabs';
import userPlus from '/assets/userPlus.svg';

interface ParticipantTabsProps {
  itinerary?: number;
  tap?: number;
  usersOldNav: User[];
  onUsersOldUpdate: (users: User[]) => void;
}
type User = {
  id: number;
  email: string;
  name: string;
  profilePicture: string;
};

export const AddParticipantModal: React.FC<ParticipantTabsProps> = ({
  itinerary,
  tap,
  usersOldNav,
  onUsersOldUpdate,
}) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setCurrentUser(parsedUser);
    }
  }, []);
  return (
    <>
      {tap === 1 ? (
        <div className="flex flex-col gap-4 mt-4" onClick={openModal}>
          <h2 className="font-semibold tracking-[-0.5px] leading-none">Participantes</h2>
          <div className="w-full flex lg:flex-row flex-col gap-2 mb-2 px-2">
            {Array.isArray(usersOldNav) &&
              usersOldNav.length > 0 &&
              usersOldNav.slice(0, 3).map((user) => (
                <div key={user.name} className="flex flex-row md:flex-col items-center gap-2">
                  <div className="bg-gray-50 w-8 h-8 rounded-full overflow-hidden">
                    <img src={user.profilePicture} alt="" className="w-full h-full object-cover" />
                  </div>
                  <p className="text-center">{user.name}</p>
                </div>
              ))}
            {Array.isArray(usersOldNav) && usersOldNav.length > 3 && (
              <div className="text-gray">+ {usersOldNav.length - 3} más</div>
            )}
          </div>
        </div>
      ) : (
        <button
          className="flex items-center gap-x-2 cursor-pointer text-sm  hover:underline px-2 option-card w-full hover:-translate-y-1.5 hover:shadow-lg"
          type="button"
          onClick={openModal}
        >
          <img src={userPlus} alt="" /> Agregar amigos
        </button>
      )}

      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none">
            <div className="fixed inset-0 bg-black opacity-25" onClick={closeModal}></div>
            <div className="relative w-auto my-6 mx-auto max-w-3xl z-auto">
              {/* content */}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/* header */}
                <div className="flex items-start justify-between p-5 rounded-t">
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
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block">×</span>
                  </button>
                </div>
                {/* buttons */}
                <ParticipantTabs
                  itinerary={itinerary}
                  usersOldNav={usersOldNav}
                  onUsersOldUpdate={onUsersOldUpdate}
                  tap={tap}
                  currentUser={currentUser.id}
                />
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};
