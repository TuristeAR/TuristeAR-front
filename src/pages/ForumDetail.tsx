import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';

const socket = io('https://api-turistear.koyeb.app');

type Category = {
  id: number,
  description: string
};

type User = {
  id: number;
  username: string;
  name: string;
  profilePicture: string;
  description: string;
  birthdate: string;
  coverPicture: string;
  location: string;
};

type Message = {
  content: string;
  images: string[];
  user: User;
  createdAt: string;
};

type Forum = {
  name: string;
  description: string;
  category: Category | null;
  messages: Message[];
};

const ForumDetail = () => {
  const { id } = useParams();

  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [forum, setForum] = useState<Forum | null>(null);
  const [selectedImage, setSelectedImage] = useState(null as File);
  const [message, setMessage]=useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [wasSent, setWasSent] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionResponse = await fetch('https://api-turistear.koyeb.app/session', {
          method: 'GET',
          credentials: 'include',
        });

        if (!sessionResponse.ok) {
          window.location.href = '/login';
          return;
        }

        const sessionData = await sessionResponse.json();
        setUser(sessionData.user);

        if (!id || id === 'undefined') {
          console.error('forumId is undefined or invalid');
          return;
        }

        const forumResponse = await fetch(`https://api-turistear.koyeb.app/forum/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!forumResponse.ok) {
          console.log('Error al obtener el foro:', await forumResponse.json());
        } else {
          const forumData = await forumResponse.json();
          setForum(forumData);
        }
        setLoading(false)
      } catch (error) {

      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      setForum((prevForum) => {
        if (!prevForum) return null;

        return {
          ...prevForum,
          messages: [...prevForum.messages, newMessage as Message],
        };
      });
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    const url = 'https://api.imgur.com/3/image';
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID 523c9b5cf859dce',
      },
      body: formData,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error de respuesta:', errorData);
        throw new Error(errorData.data.error || 'Error al cargar la imagen');
      }
      const result = await response.json();
      console.log('Imagen subida:', result);
      return result.data.link; // Retorna el enlace de la imagen
    } catch (error) {
      console.error('Error en la carga de la imagen:', error);
      throw error; // Lanza el error para manejarlo en createPublications
    }
  };

  const createMessage = async (forumId : number) => {
    if (message && forumId && user) {
      setWasSent(true)
      const imageUrl = selectedImage ? await uploadImage(selectedImage) : null;
      socket.emit('createMessage', {
        content: message,
        images: imageUrl,
        userId: user.id,
        forumId: forumId,
      });
      setWasSent(false)
      setSelectedImage(null)
      setMessage('');
    }
  };

  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50 border border-gray-50 rounded-lg">
          <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
        </div>
      ) : (
        <>
          <Header containerStyles={'relative top-0 z-[60]'} />
          <div className="flex h-[100vh]">
            <LeftCommunity
              vista={'forum'}
              activeItem={'posts'}
              categorySelected={categorySelected}
              handleClick={null}
              setCategorySelected={setCategorySelected}
            />
            <div className="lg:w-[80%] w-[100%] flex flex-col overflow-scroll scrollbar-hidden">
              <div
                className={'shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] min-h-[8%] flex flex-col p-4'}
              >
                <h1 className="text-3xl">{forum?.name}</h1>
                <h3>{forum.category.description}</h3>
              </div>
              <div className="overflow-scroll scrollbar-hidden h-[90%] lg:px-4 px-2 py-6  flex flex-col gap-y-6">
                {forum?.messages.map((message, index) => (
                  <div
                    className={`flex ${user.id == message.user.id ? 'justify-end' : 'justify-start'}`}
                    key={index}
                  >
                    <div
                      className={
                        'shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] lg:p-6 p-4 rounded-2xl lg:gap-4 gap-2 flex flex-col w-auto lg:max-w-[65%] max-w-[80%]'
                      }
                    >
                      <div className="flex justify-between items-center lg:gap-20 gap-6 ">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full border border-1 border-black">
                            <img
                              className="lg:w-8 lg:h-8 w-6 h-6 rounded-full"
                              src={message.user.profilePicture}
                              alt="person"
                            />
                          </div>
                          <div className={'flex flex-col'}>
                            <p className={'font-semibold lg:text-[17px] text-[14px] '}>{message.user.name}</p>
                          </div>
                        </div>
                        <p className={'lg:text-[16px] text-[12px]'}>{message.createdAt.slice(11).slice(0, 5)}</p>
                      </div>
                      <div>
                        <p className={'lg:text-[16px] text-sm'}>{message.content}</p>
                      </div>
                      {message.images ?
                        <div>
                          {Array.isArray(message.images) ?
                            message.images.map((image, index) => (
                            <img key={index} src={image} alt="Imagen" />
                            ))
                            : <img src={message.images} alt={'Imagen'} />
                          }
                        </div>
                        : <></>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <div
                className={'h-[8%] border-t border-[#999999] py-10 flex justify-around items-center'}
              >
                <div className="flex flex-col items-center w-[6%]">
                  <label className="cursor-pointer">
                    <svg
                      className={'lg:w-[35px] lg:h-[35px] w-[27px] h-[27px]'}
                      fill={`${selectedImage ? '#ff8c00' : '#009fe3'} `}
                      viewBox="-0.52 0 15.07 15.07"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <g id="Layer_2" data-name="Layer 2">
                          <g id="Layer_1-2" data-name="Layer 1">
                            <path d="M3,15.07A4,4,0,0,1,.15,13.89a.5.5,0,0,1,0-.71.5.5,0,0,1,.7,0,3,3,0,0,0,4.3,0l7-7a3,3,0,0,0,0-4.29,3.11,3.11,0,0,0-4.3,0L2.1,7.64A1.27,1.27,0,1,0,3.9,9.43L9.65,3.68a.5.5,0,0,1,.7,0,.5.5,0,0,1,0,.71L4.6,10.14a2.31,2.31,0,0,1-3.2,0,2.26,2.26,0,0,1,0-3.21L7.15,1.18A4,4,0,0,1,14,4a4,4,0,0,1-1.19,2.85l-7,7A4,4,0,0,1,3,15.07Z"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <div className={'flex w-[80%] items-center'}>
                  <input
                    onInput={(e) => {
                      //@ts-ignore
                      setMessage(e.target.value);
                    }}
                    type={'text'}
                    value={message || ''}
                    className={'border border-[#999999] w-[90%] lg:h-[40px] h-[35px] rounded-2xl pl-2'}
                    placeholder={'Escribe tu mensaje...'}
                  />
                  <svg
                    className={'cursor-pointer lg:w-[57px] lg:h-[57px] w-[40px] h-[40px]'}
                    onClick={() => {createMessage(Number(id))}}
                    viewBox="0 0 25.00 25.00"
                    fill={'none'}
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#009fe3"
                    strokeWidth="0.00025"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      stroke="#CCCCCC"
                      strokeWidth="0.15"
                    />

                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M19.1168 12.1484C19.474 12.3581 19.9336 12.2384 20.1432 11.8811C20.3528 11.5238 20.2331 11.0643 19.8758 10.8547L19.1168 12.1484ZM6.94331 4.13656L6.55624 4.77902L6.56378 4.78344L6.94331 4.13656ZM5.92408 4.1598L5.50816 3.5357L5.50816 3.5357L5.92408 4.1598ZM5.51031 5.09156L4.76841 5.20151C4.77575 5.25101 4.78802 5.29965 4.80505 5.34671L5.51031 5.09156ZM7.12405 11.7567C7.26496 12.1462 7.69495 12.3477 8.08446 12.2068C8.47397 12.0659 8.67549 11.6359 8.53458 11.2464L7.12405 11.7567ZM19.8758 12.1484C20.2331 11.9388 20.3528 11.4793 20.1432 11.122C19.9336 10.7648 19.474 10.6451 19.1168 10.8547L19.8758 12.1484ZM6.94331 18.8666L6.56375 18.2196L6.55627 18.2241L6.94331 18.8666ZM5.92408 18.8433L5.50815 19.4674H5.50815L5.92408 18.8433ZM5.51031 17.9116L4.80505 17.6564C4.78802 17.7035 4.77575 17.7521 4.76841 17.8016L5.51031 17.9116ZM8.53458 11.7567C8.67549 11.3672 8.47397 10.9372 8.08446 10.7963C7.69495 10.6554 7.26496 10.8569 7.12405 11.2464L8.53458 11.7567ZM19.4963 12.2516C19.9105 12.2516 20.2463 11.9158 20.2463 11.5016C20.2463 11.0873 19.9105 10.7516 19.4963 10.7516V12.2516ZM7.82931 10.7516C7.4151 10.7516 7.07931 11.0873 7.07931 11.5016C7.07931 11.9158 7.4151 12.2516 7.82931 12.2516V10.7516ZM19.8758 10.8547L7.32284 3.48968L6.56378 4.78344L19.1168 12.1484L19.8758 10.8547ZM7.33035 3.49414C6.76609 3.15419 6.05633 3.17038 5.50816 3.5357L6.34 4.78391C6.40506 4.74055 6.4893 4.73863 6.55627 4.77898L7.33035 3.49414ZM5.50816 3.5357C4.95998 3.90102 4.67184 4.54987 4.76841 5.20151L6.25221 4.98161C6.24075 4.90427 6.27494 4.82727 6.34 4.78391L5.50816 3.5357ZM4.80505 5.34671L7.12405 11.7567L8.53458 11.2464L6.21558 4.83641L4.80505 5.34671ZM19.1168 10.8547L6.56378 18.2197L7.32284 19.5134L19.8758 12.1484L19.1168 10.8547ZM6.55627 18.2241C6.4893 18.2645 6.40506 18.2626 6.34 18.2192L5.50815 19.4674C6.05633 19.8327 6.76609 19.8489 7.33035 19.509L6.55627 18.2241ZM6.34 18.2192C6.27494 18.1759 6.24075 18.0988 6.25221 18.0215L4.76841 17.8016C4.67184 18.4532 4.95998 19.1021 5.50815 19.4674L6.34 18.2192ZM6.21558 18.1667L8.53458 11.7567L7.12405 11.2464L4.80505 17.6564L6.21558 18.1667ZM19.4963 10.7516H7.82931V12.2516H19.4963V10.7516Z"
                        fill={`${wasSent ? '#ff8c00' : '#009fe3'}`}
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForumDetail;