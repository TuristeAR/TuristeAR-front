import { useEffect, useState } from 'react';

type User = {
  id: number;
  email: string;
  name: string;
  username: string;
  profilePicture: string;
  description: string;
  coverPicture: string;
  location: string;
  birthdate: string;
  googleId: string;
};

interface ParticipantTabsProps {
  itinerary: number;
}
const ParticipantTabs: React.FC<ParticipantTabsProps> = ({ itinerary }) => {
  const [openTab, setOpenTab] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [usersOld, setUsersOld] = useState<User[]>([]);

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    if (showModal) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [showModal]);

  useEffect(() => {
    if (searchTerm) {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/users/search?name=${searchTerm}&itineraryId=${itinerary}`);
          const data = await response.json();
          setUsers(data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setUsers([]);
        }
      };
      fetchData();
    }
  }, [searchTerm]);


  /* Participants */
  useEffect(() => {
    const fetchData = async () => {
        try {
            console.log("itinerary:", itinerary);
            const response = await fetch(`http://localhost:3001/itinerary/paticipants/${itinerary}`); // Asegúrate que la URL es correcta
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.status === "success" && data.participants) {
                setUsersOld(data.participants.participants); 
            } else {
                setUsersOld([]); 
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setUsersOld([]); 
        }
    };

    fetchData();
}, [itinerary]);


  //Add user
  const handleAddUser = async (participantId) => {
    try {
      const response = await fetch('http://localhost:3001/itinerary/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itineraryId: itinerary, participantId }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json(); 
  
      if (data.status === 'success') {
        setUsersOld(data.data.participants);
        handleRemoveUser(participantId);

        console.log('Participantes actualizados:', data.data.participants);
      } else {
        console.error('Error al agregar el usuario:', data.message);
      }
    } catch (error) {
      console.error('Error in handleAddUser:', error);
    }
  };
  
  const handleRemoveUser = (userId: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row " role="tablist">
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-xl px-5 py-3 shadow-lg  block leading-normal ' +
                  (openTab === 1
                    ? 'text-black font-bold border-b-2 '
                    : 'text-gray bg-white border-b')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Participantes
              </a>
            </li>
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-xl px-5 py-3 shadow-lg  block leading-normal ' +
                  (openTab === 2
                    ? 'text-black font-bold border-b-2 '
                    : 'text-gray bg-white border-b')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Agregar
              </a>
            </li>
          </ul>
          <div className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
            <input
              type="text"
              name="email"
              id="users-search"
              className="bg-slate-50 border border-gray text-black sm:text-sm rounded-lg focus:ring-slate-50 focus:border-primary block w-full p-2.5"
              placeholder="Buscar participantes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 ">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
                  <div className="max-h-56 overflow-y-auto">
                    {usersOld &&
                      usersOld.map((user) => (
                        <div className="flex justify-between" key={user.id}>
                          <div className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.profilePicture}
                              alt={user.name}
                            />
                            <div className="text-sm font-normal text-gray-500">
                              <div className="text-base font-semibold text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                          <div className="p-4 whitespace-nowrap space-x-2">
                            <button
                              type="button"
                              data-modal-toggle="add-user-modal"
                              className="w-1/2 text-white bg-[#ff0000] hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                            >
                              <svg
                                className="-ml-1 mr-2 h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Quitar
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
                  <div className="max-h-56 overflow-y-auto">
                    {users &&
                      users.map((user) => (
                        <div className="flex justify-between" key={user.id}>
                          <div className="p-4 flex items-center whitespace-nowrap space-x-6 mr-12 lg:mr-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.profilePicture}
                              alt={user.name}
                            />
                            <div className="text-sm font-normal text-gray-500">
                              <div className="text-base font-semibold text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                          <div className="p-4 whitespace-nowrap space-x-2">
                            <button
                              type="button"
                              onClick={() => handleAddUser(user.id)} 
                              data-modal-toggle="add-user-modal"
                              className="w-1/2 text-white bg-primary hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto"
                            >
                              <svg
                                className="-ml-1 mr-2 h-6 w-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                              Agregar
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantTabs;
