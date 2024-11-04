import { useEffect, Dispatch, SetStateAction } from 'react';
import io from 'socket.io-client';

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

type Itinerary = {
  id: number;
  name: string;
};

type Forum = {
  id: number;
  name: string;
  description: string;
  category: Category | null;
  messages: Message[];
  itinerary: Itinerary;
};

type UseReceiveMessageProps = {
  setForum: Dispatch<SetStateAction<Forum | null>>;
};

export const useReceiveMessage = ({ setForum }: UseReceiveMessageProps) => {
  useEffect(() => {
    const socket = io('https://api-turistear.koyeb.app');

    socket.on('receiveMessage', (newMessage: Message) => {
      setForum((prevForum) => {
        if (!prevForum) return null;
        return {
          ...prevForum,
          messages: [...prevForum.messages, newMessage],
        };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [setForum]);
};
