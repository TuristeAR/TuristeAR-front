import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';

const socket = io('https://api-turistear.koyeb.app'); // URL del servidor con socket.io

type Place = {
  name: string;
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
  place: Place | null;
  messages: Message[];
};

const ForumDetail = () => {
  const { id } = useParams();

  const [categorySelected, setCategorySelected] = useState<number | null>(null);
  const [forum, setForum] = useState<Forum | null>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage]=useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
        setSelectedImage(reader.result);
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
      const imageUrl = await uploadImage(selectedImage);
      socket.emit('createMessage', {
        content: message,
        images: imageUrl,
        userId: user.id,
        forumId: forumId,
      });
      setMessage('');
    }
  };

  return (
    <>
      {loading ? (
          <div className="fixed inset-0 flex items-center justify-center bg-white z-50 border border-gray-50 rounded-lg">
            <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
          </div>
        ) :
        (<>
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
              <div className={'shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] h-[8%] flex items-center p-4'}>
                <h1 className="text-3xl">{forum?.name}</h1>
              </div>
              <div className="overflow-scroll scrollbar-hidden h-[90%] px-4 py-6 flex flex-col gap-y-6">
                {forum?.messages.map((message, index) => (
                  <div className={`flex ${user.id == message.user.id ? 'justify-end' : 'justify-start'}`} key={index}>
                    <div
                      className={
                        'shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] p-6 rounded-2xl gap-4 flex flex-col w-auto max-w-[65%]'
                      }
                    >
                      <div className="flex justify-between items-center gap-20 ">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full  border border-1 border-black">
                            <img
                              className="w-8 h-8 rounded-full"
                              src={message.user.profilePicture}
                              alt="person"
                            />
                          </div>
                          <div className={'flex flex-col'}>
                            <p className={'font-semibold '}>{message.user.name}</p>
                          </div>
                        </div>
                        <p>{message.createdAt.slice(11).slice(0,5)}</p>
                      </div>
                      <div>
                        <p>{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={'h-[8%] border-t border-[#999999] p-10 flex justify-around items-center'}>
                <div className="flex flex-col items-center w-[6%]">
                  <label className="cursor-pointer">
                    <img
                      src={selectedImage || '/assets/addImage.svg'}
                      alt="Agregar imagen"
                      className={`object-cover ${selectedImage ? 'rounded-full w-[50px] h-[50px]' : 'w-[40px] h-[40px]'}`}
                    />
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
                    value={message}
                    className={'border border-[#999999] w-[90%] h-[40px] rounded-2xl pl-2'}
                    placeholder={'Escribe tu mensaje...'}
                  />
                  <img onClick={()=>{
                    createMessage(Number(id))
                  }} src={'/assets/send.svg'} className={'w-[60px] cursor-pointer'}  alt={'Enviar'}/>
                </div>
              </div>
            </div>
          </div>
        </>)
      }
    </>
  );
};

export default ForumDetail;
