import { Header } from '../components/Header/Header';
import { LeftCommunity } from '../components/Community/LeftCommunity';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
  const [user, setUser] = useState<User | null>(null);
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
  const createMessage = async (forumId: number)=>{
    try {
      const response = await fetch(`http://localhost:3001/createMessage/${forumId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          content: message,
          images: selectedImage
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
    } catch (err: any) {
      console.log('No funciona')
    }
  }

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

        const forumResponse = await fetch(`http://localhost:3001/forum/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!forumResponse.ok) {
          console.log('Error al obtener el foro:', await forumResponse.json());
        } else {
          const forumData = await forumResponse.json();
          setForum(forumData);
        }

      } catch (error) {

      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header containerStyles={'relative top-0 z-[60]'} />
      <div className="flex">
        <LeftCommunity
          vista={'forum'}
          activeItem={'posts'}
          categorySelected={categorySelected}
          handleClick={null}
          setCategorySelected={setCategorySelected}
        />
        <div className="lg:w-[80%] w-[100%] flex flex-col gap-10 overflow-scroll scrollbar-hidden">
          <div className={'shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] h-[8%] flex items-center p-4'}>
            <h1 className="text-3xl">{forum?.name}</h1>
          </div>
          <div className="overflow-scroll scrollbar-hidden h-[75%] px-4 flex flex-col gap-6">
            {forum?.messages.map((message, index) => (
              <div className={`flex ${user.id == message.user.id ? 'justify-end' : 'justify-start'}`} key={index}>
                <div
                  className={
                    'shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] p-6 rounded-2xl gap-4 flex flex-col w-auto'
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
                    <p>{message.createdAt.slice(14).slice(0, 5)}</p>
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
                  className={`w-[60px] h-[60px] object-cover ${selectedImage ? 'rounded-full' : ''}`}
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
    </>
  );
};

export default ForumDetail;
