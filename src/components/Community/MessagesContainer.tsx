import React, { useEffect, useRef } from 'react';

type Category = {
  id: number;
  description: string;
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

export const MessagesContainer = (props: { forum : Forum, user: User }) => {
  const { forum, user } = props;
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [forum?.messages]);

  const isToday = (date: string) => {
    const messageDate = new Date(date);
    const today = new Date();
    return (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <>
      {forum?.messages.map((message, index) => (
        message ? (
          <div
            className={`flex ${user.id == message.user.id ? 'justify-end' : 'justify-start'}`}
            key={index}
            ref={index === forum.messages.length - 1 ? lastMessageRef : null}
          >
            <div
              className={
                `${user.id === message.user.id ? 'bg-[#c0daeb]' : 'bg-white'} shadow-[0_10px_25px_-10px_rgba(0,0,0,4)] lg:p-4 p-4 rounded-2xl lg:gap- gap-2 flex flex-col w-auto lg:max-w-[65%] max-w-[80%]`
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
                <p className={'lg:text-[16px] text-[12px] text-[#484b56]'}>
                  {!isToday(message.createdAt)
                    ? message.createdAt.slice(0,-14)
                    : new Date(new Date(message.createdAt).getTime() - 3 * 60 * 60 * 1000)
                      .toISOString()
                      .slice(11, 16)}
                </p>
              </div>
              <div>
                <p className={'lg:text-[16px] text-sm'}>{message.content}</p>
              </div>
              {message.images ? (
                <div>
                  {Array.isArray(message.images) ? (
                    message.images.map((image, index) => <img key={index} src={image} alt="Imagen" />)
                  ) : (
                    <img src={message.images} alt={'Imagen'} />
                  )}
                </div>
              ) : (
                <></>
              )}

                {!isToday(message.createdAt) &&
                  (
                    <div className="flex justify-end text-[#484b56]">
                      {new Date(new Date(message.createdAt).getTime() - 3 * 60 * 60 * 1000)
                        .toISOString()
                        .slice(11, 16)}
                    </div>
                  )}
              </div>
          </div>
        ) : (<></>)
      ))}
    </>
  );
};