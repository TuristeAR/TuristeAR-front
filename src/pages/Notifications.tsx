import { get } from '../utilities/http.util';
import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';
import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { Link, useNavigate } from 'react-router-dom';

type ParticipationRequest = {
  id: number;
  itinerary: Itinerary;
  participant: User;
  sender: User;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
};
type User = {
  id: number;
  name: string;
  profilePicture: string;
  description: string;
  birthdate: string;
  coverPicture: string;
  location: string;
};

type Comment = {
  createdAt: string;
  description: string;
  user: User | null;
};

type Publication = {
  id: number;
  description: string;
  user: User | null;
  likes: User[];
  reposts: User[];
  saved: User[];
  comments: Comment[];
};

type Itinerary = {
  id: number;
  createdAt: string;
  name: string;
  fromDate: string;
  toDate: string;
  user: User | null;
};

type Notification = {
  id: number;
  isRead: boolean;
  description: string;
  publication: Publication;
  itinerary: Itinerary;
  participationRequest: ParticipationRequest;
  user: User;
};

const Notifications = () => {
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [user, setUser] = useState<{ name: string; profilePicture: string } | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const getNotificationImages = (notification) => {
    const { description, publication } = notification;
    let users = [];

    if (description.includes('me gusta')) {
      users = publication.likes.slice(0, 3);
    } else if (description.includes('guardado')) {
      users = publication.saved.slice(0, 3);
    } else {
      users = publication.reposts.slice(0, 3);
    }

    return users.map((user, index) => (
      <img
        key={index}
        src={user.profilePicture}
        alt={user.name}
        className="w-[25px] h-[25px] rounded-full"
      />
    ));
  };

  const handleClick = (name: string) => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fetchUser = async () => {
    const response = await get('https://api-turistear.koyeb.app/session', {
      'Content-Type': 'application/json',
    });

    if (response.statusCode === 200) {
      setUser(response.user);
    } else {
      window.location.href = '/login';
    }
  };

  const updateNotifications = async () => {
    await fetch('https://api-turistear.koyeb.app/markNotificationsAsRead', {
      method: 'PUT',
      credentials: 'include',
    });
  };

  const rejectParticipationRequest = async (participationRequestId: number) => {
    try {
      const response = await fetch('https://api-turistear.koyeb.app/participation-request/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ requestId: participationRequestId }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Participation request rejected successfully:', data);
  
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notification) => notification.participationRequest.id !== participationRequestId
          )
        );
      } else {
        console.error('Error rejecting participation request');
      }
    } catch (error) {
      console.error('Error making the request:', error);
    }
  };
  

  const acceptParticipationRequest = async (itineraryId, participantId, participationRequestId) => {
    try {
      const response = await fetch('https://api-turistear.koyeb.app/itinerary/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          itineraryId,
          participantId,
          participationRequestId,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        console.log('User successfully added to the itinerary', data);
        navigate(`/itineraryCalendar/${itineraryId}`);
      } else {
        console.error('Error adding user to itinerary');
      }
    } catch (error) {
      console.error('Error making the request:', error);
    }
  };
  const fetchNotifications = async () => {
    const response = await get('https://api-turistear.koyeb.app/notifications-detail/byUser', {
      'Content-Type': 'application/json',
      credentials: 'include',
    });
    console.log(response);
    setNotifications(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
    fetchNotifications();
    updateNotifications();
  }, []);

  function handleParticipationResponse(id: number, arg1: boolean): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      {isLoading ? (
        <div className="w-[90%] md:w-full mx-auto min-h-[90vh] flex flex-col items-center justify-center">
          <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
        </div>
      ) : (
        <>
          <Header containerStyles={'relative top-0 z-[60]'} />
          <div
            className={`flex justify-between min-h-[88.8vh] relative ${isOpen ? 'overflow-hidden' : ''}`}
          >
            <LeftCommunity
              vista={'publications'}
              categorySelected={categorySelected}
              setCategorySelected={setCategorySelected}
              activeItem={null}
              handleClick={handleClick}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />

            <div className="absolute md:static lg:w-[80%] w-[100%] pt-10 pb-10 flex flex-col gap-10 overflow-scroll scrollbar-hidden">
              <div className={`flex flex-col gap-6 w-[97%] mx-auto`}>
                {notifications.map((notification, index) => (
                  <Link
                    to={
                      notification.publication
                        ? `/publication/${notification.publication.id}`
                        : notification.itinerary
                          ? `/itineraryCalendar/${notification.itinerary.id}`
                          : ''
                    }
                    key={index}
                    className={
                      `lg:w-auto lg:mb-0 mb-6 p-4 rounded-2xl ${notification.isRead ? 'bg-white hover:bg-[#d9d9d9]' : 'bg-[#c0daeb] hover:bg-[#009fe3]'} ` +
                      'shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] flex flex-col relative transition-transform duration-300 hover:-translate-y-1.5 '
                    }
                  >
                    {notification.publication ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-x-2 items-center">
                          {getNotificationImages(notification)}
                          <h1 className="font-bold text-[18px]">{notification.description}</h1>
                        </div>
                        <p className={`text-l ${notification.isRead ? 'text-[#484b56]' : ''}`}>
                          {notification.publication.description.slice(0, 100)}
                        </p>
                      </div>
                    ) : notification.itinerary ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-x-2 items-center">
                          <img
                            src={notification.itinerary.user.profilePicture}
                            alt={notification.itinerary.user.name}
                            className="w-[25px] h-[25px] rounded-full"
                          />
                          <h1 className="font-bold text-[18px]">{notification.description}</h1>
                        </div>
                        <p className={`text-l ${notification.isRead ? 'text-[#484b56]' : ''}`}>
                          {notification.itinerary.name}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-x-2 items-center">
                          <img
                            src={notification.participationRequest.sender.profilePicture}
                            alt={notification.participationRequest.sender.name}
                            className="w-[25px] h-[25px] rounded-full"
                          />
                          <h1 className="font-bold text-[18px]">{notification.description}</h1>
                        </div>
                        <p className={`text-l ${notification.isRead ? 'text-[#484b56]' : ''}`}>
                          {notification.participationRequest.itinerary.name}
                        </p>
                        {notification.participationRequest.status != 'accepted' ? (
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() =>
                                acceptParticipationRequest(
                                  notification.participationRequest.itinerary.id,
                                  notification.user.id,
                                  notification.participationRequest.id,
                                )
                              }
                              className="bg-primary text-white px-4 py-1 rounded-lg"
                            >
                              Aceptar
                            </button>
                            <button
                              onClick={() =>
                                rejectParticipationRequest(
                                  notification.participationRequest!.id
                                )
                              }
                              className="bg-[#f00] text-white px-4 py-1 rounded-lg"
                            >
                              Rechazar
                            </button>
                          </div>
                        ) : (
                          <p>📅 ✅ Aceptaste la invitación para unirte al itinerario 🤝🎉</p>
                        )}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Notifications;