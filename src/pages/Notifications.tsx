import { get } from '../utilities/http.util';
import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';
import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { Link } from 'react-router-dom';

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

type Notification={
  id: number
  isRead: boolean
  description: string;
  publication: Publication
  itinerary: Itinerary
}

const Notifications = () => {
  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [user, setUser] = useState<{ name: string; profilePicture: string } | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (name: string) => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fetchUser = async () => {
    const response = await get(' https://api-turistear.koyeb.app/session', {
      'Content-Type': 'application/json',
    });

    if (response.statusCode === 200) {
      setUser(response.user);
    } else {
      window.location.href = '/login';
    }
  };

  const fetchNotifications = async () => {
    const response = await get('https://api-turistear.koyeb.app/notifications-detail/byUser', {
      'Content-Type': 'application/json',
      credentials: 'include',
    });
    setNotifications(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
    fetchNotifications();
  }, []);

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
                        : `/itineraryCalendar/${notification.itinerary.id}`
                    }
                    key={index}
                    className={
                      `lg:w-auto lg:mb-0 mb-6 p-4 rounded-2xl ${notification.isRead ? 'bg-white hover:bg-[#d9d9d9]' : 'bg-[#c0daeb] hover:bg-[#009fe3]'} ` +
                      'shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] flex flex-col relative transition-transform duration-300 hover:-translate-y-1.5 '
                    }
                  >
                    {notification.publication ? (
                      <div className={'flex flex-col gap-2'}>
                        <div className={'flex gap-x-2 items-center'}>
                          {notification.publication.likes.slice(0, 3).map((like, index) => (
                            <img
                              key={index}
                              src={like.profilePicture}
                              alt={like.name}
                              className="w-[25px] h-[25px] rounded-full"
                            />
                          ))}
                          <h1 className={'font-bold text-[18px]'}>{notification.description}</h1>
                        </div>
                        <p className={`text-l ${notification.isRead && 'text-[#999999]'}`}>
                          {notification.publication.description.slice(0, 100)}
                        </p>
                      </div>
                    ) : (
                      <div className={'flex flex-col gap-2'}>
                        <div className={'flex gap-x-2 items-center'}>
                          <img
                            key={index}
                            src={notification.itinerary.user.profilePicture}
                            alt={notification.itinerary.user.name}
                            className="w-[25px] h-[25px] rounded-full"
                          />
                          <h1 className={'font-bold text-[18px]'}>{notification.description}</h1>
                        </div>
                        <p className={`text-l ${notification.isRead && 'text-[#999999]'}`}>
                          {notification.itinerary.name}
                        </p>
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