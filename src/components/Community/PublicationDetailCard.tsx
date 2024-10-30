import { ImageGallery } from '../ImageGallery/ImageGallery';
import { useState } from 'react';
import { post } from '../../utilities/http.util';

export function PublicationDetailCard(props: {
  id: number;
  profilePicture: string | undefined;
  userId: string | undefined;
  creationDate: string;
  description: string;
  images: string[];
  likes: number;
  reposts: number;
  saved: number;
  category: string;
  isLiked: boolean;
  isSaved: boolean;
  isRepost: boolean;
}) {
  let {
    profilePicture,
    userId,
    creationDate,
    description,
    images,
    category,
    id,
  } = props;

  const [isLike, setIsLike] = useState<boolean | undefined>(props.isLiked);
  const [isSave, setIsSave] = useState<boolean | null>(props.isSaved);
  const [isRepost, setIsRepost] = useState<boolean | null>(props.isRepost);
  const [likes, setLikes] = useState<number | null>(props.likes);
  const [saved, setSaved] = useState<number | null>(props.saved);
  const [reposts, setReposts] = useState<number | null>(props.reposts);

  const handleLike = async (idPublication: number) => {
    setLikes(!isLike ? likes + 1 : likes - 1);
    setIsLike(!isLike);
    await post(`https://api-turistear.koyeb.app/handleLike/${idPublication}`, {
      'Content-Type': 'application/json',
    });
  };

  const handleSaved = async (idPublication: number) => {
    setSaved(!isSave ? saved + 1 : saved - 1);
    setIsSave(!isSave);
    await post(`https://api-turistear.koyeb.app/handleSaved/${idPublication}`, {
      'Content-Type': 'application/json',
    });
  };

  const handleRepost = async (idPublication: number) => {
    setReposts(!isRepost ? reposts + 1 : reposts - 1);
    setIsRepost(!isRepost);
    await post(`https://api-turistear.koyeb.app/handleReposts/${idPublication}`, {
      'Content-Type': 'application/json',
    });
  };

  const reorderDate = (dateString: string) => {
    const formatDate = (date) => {
      const [year, month, day] = date.split('-');
      return `${day}-${month}-${year}`;
    };

    return formatDate(dateString);
  };

  return (
    <>
      <div className="w-full h-fit p-4 rounded-l-2xl border-r border-[#999999]">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="rounded-full  border border-1 border-black">
              <img className="w-8 h-8 rounded-full" src={profilePicture} alt="person" />
            </div>
            <div className={'flex flex-col'}>
              <p className={'font-semibold '}>{userId}</p>
              <p className={'text-[12px]'}>{category}</p>
            </div>
          </div>
          <p>{reorderDate(creationDate.slice(0, -14))}</p>
        </div>
        <p className="font-light py-4 text-gray-500 text-sm md:text-base lg:text-lg text-start">
          {description}
        </p>
        <ImageGallery images={images} />
        <div>
          <div className="text-gray-500 dark:text-gray-400 flex mt-3 justify-around">
            <div className="flex items-center mr-6">
              <svg
                className="cursor-pointer"
                onClick={() => {
                  handleLike(id);
                }}
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"
                    fill={isLike ? '#ff9900' : '#ffffff'}
                    stroke="#000000"
                    strokeWidth="1.4"
                  ></path>
                </g>
              </svg>
              <span className="ml-3">{likes}</span>
            </div>
            <div className="flex items-center mr-6">
              <a href={`/publication/${id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  viewBox="0 -960 960 960"
                  width="20px"
                  fill="#000000"
                >
                  <path d="M480-80 376-237H140q-24.75 0-42.37-17.63Q80-272.25 80-297v-523q0-24.75 17.63-42.38Q115.25-880 140-880h680q24.75 0 42.38 17.62Q880-844.75 880-820v523q0 24.75-17.62 42.37Q844.75-237 820-237H584L480-80Zm0-108 72-109h268v-523H140v523h268l72 109Zm0-371Z" />
                </svg>
              </a>
              <span className="ml-3">0</span>
            </div>
            <div className="flex items-center mr-6">
              <svg
                onClick={() => {
                  handleRepost(id);
                }}
                xmlns="http://www.w3.org/2000/svg"
                height="25px"
                viewBox="0 -960 960 960"
                width="25px"
                fill={isRepost ? '#ff9900' : '#000000'}
              >
                <path d="M686-80q-47.5 0-80.75-33.25T572-194q0-8 5-34L278-403q-16.28 17.34-37.64 27.17Q219-366 194-366q-47.5 0-80.75-33.25T80-480q0-47.5 33.25-80.75T194-594q24 0 45 9.3 21 9.29 37 25.7l301-173q-2-8-3.5-16.5T572-766q0-47.5 33.25-80.75T686-880q47.5 0 80.75 33.25T800-766q0 47.5-33.25 80.75T686-652q-23.27 0-43.64-9Q622-670 606-685L302-516q3 8 4.5 17.5t1.5 18q0 8.5-1 16t-3 15.5l303 173q16-15 36.09-23.5 20.1-8.5 43.07-8.5Q734-308 767-274.75T800-194q0 47.5-33.25 80.75T686-80Zm.04-60q22.96 0 38.46-15.54 15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5Zm-492-286q22.96 0 38.46-15.54 15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5Zm492-286q22.96 0 38.46-15.54 15.5-15.53 15.5-38.5 0-22.96-15.54-38.46-15.53-15.5-38.5-15.5-22.96 0-38.46 15.54-15.5 15.53-15.5 38.5 0 22.96 15.54 38.46 15.53 15.5 38.5 15.5ZM686-194ZM194-480Zm492-286Z" />
              </svg>
              <span className="ml-3">{reposts}</span>
            </div>
            <div className="flex items-center mr-6">
              <svg
                className="cursor-pointer"
                onClick={() => {
                  handleSaved(id);
                }}
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M18.5 18.8637V8.07579C18.5 5.99472 17.0378 4.20351 15.0077 3.7977C13.022 3.40077 10.978 3.40077 8.99225 3.7977C6.96219 4.20351 5.5 5.99472 5.5 8.07579V18.8637C5.5 20.1258 6.8627 20.9113 7.94601 20.2737L10.9053 18.5317C11.5814 18.1337 12.4186 18.1337 13.0947 18.5317L16.054 20.2737C17.1373 20.9113 18.5 20.1258 18.5 18.8637Z"
                    fill={isSave ? '#ff9900' : '#ffffff'}
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </g>
              </svg>
              <span className="ml-3">{saved}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
