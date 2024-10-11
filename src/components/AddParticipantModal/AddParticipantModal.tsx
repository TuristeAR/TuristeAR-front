import { useEffect, useState } from 'react';
import ParticipantTabs from './ParticipantTabs';
import userPlus from '/assets/userPlus.svg';

interface ParticipantTabsProps {
  itinerary?: number;
  tap?: number;
}
type User = {
  id: number;
  email: string;
  name: string;
  username: string;
  profilePicture: string;
};

export const AddParticipantModal: React.FC<ParticipantTabsProps> = ({ itinerary, tap }) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  let [usersOldNav, setUsersOldNav] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api-turistear.koyeb.app/itinerary/participants/${itinerary}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.status === 'success' && data.itineraryParticipants.participants) {
          setUsersOldNav(data.itineraryParticipants.participants);
        } else {
          setUsersOldNav([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setUsersOldNav([]);
      }
    };

    fetchData();
  }, [itinerary]);

  //users updated in parent
  const handleUpdateUsersOld = (updatedUsers: User[]) => {
    setUsersOldNav(updatedUsers);
    usersOldNav = updatedUsers
    console.log('Usuarios actualizados en el padre:', updatedUsers);
    console.log("UserNav new: ", usersOldNav)
  };

  return (
    <>
      {tap === 1 ? (
        <div className="flex flex-col gap-4 mt-4" onClick={openModal}>
          <h2 className="font-semibold tracking-[-0.5px] leading-none">Participantes</h2>
          <div className="w-full flex flex-col gap-2 mb-2">
            {usersOldNav.slice(0, 4).map((user) => (
              <div key={user.name} className="flex items-center w-full gap-2">
                <div className="bg-gray-50 w-8 h-8 rounded-full overflow-hidden">
                  <img src={user.profilePicture} alt="" className="w-full h-full object-cover" />
                </div>
                <p>{user.name}</p>
              </div>
            ))}
            {usersOldNav.length > 4 && (
              <div className="text-gray">+ {usersOldNav.length - 4} más</div>
            )}
          </div>
        </div>
      ) : (
        <button
          className="flex items-center gap-x-2 cursor-pointer text-sm hover:underline"
          type="button"
          onClick={openModal}
        >
          <img src={userPlus} alt="" /> Agrergar amigos
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
                 onUsersOldUpdate={handleUpdateUsersOld}
                 tap={tap}
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
