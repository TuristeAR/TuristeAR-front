import React from 'react';
import Carousel from './Carousel';

interface ArticleCardProps {
  title: string;
  images: string[];
  description: string;
  rating: number;
  types: string[];
  address: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  images,
  description,
  rating,
  types,
  address,
}) => {
  return (
    <div className="max-w-xs m-auto bg-white border  border-primary-3 rounded-lg shadow relative group overflow-hidden transform transition-transform duration-300  hover:shadow-sm hover:shadow-gray hover:-translate-y-1.5 mt-2">
   <span className="absolute inset-0 z-10 bg-pink transition-all duration-300 ease-out transform translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0"></span> 
      <div className="relative z-30">
        <Carousel>
          {images.length > 0 ? (
            images.map((item, index) => (
              <div className="h-[200px] overflow-hidden" key={index}>
                <img className="rounded-t-lg h-full w-full object-cover transition-all duration-300 group-hover:scale-125 " src={item} alt={title} />
              </div>
            ))
          ) : (
            <div className="h-[200px] flex items-center justify-center bg-primary-5">
              <svg className='group-hover:scale-125 ' xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#e8eaed"><path d="m880-195-80-80v-405H638l-73-80H395l-38 42-57-57 60-65h240l74 80h126q33 0 56.5 23.5T880-680v485Zm-720 75q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h41l80 80H160v480h601l80 80H160Zm466-215q-25 34-62.5 54.5T480-260q-75 0-127.5-52.5T300-440q0-46 20.5-83.5T375-586l58 58q-24 13-38.5 36T380-440q0 42 29 71t71 29q29 0 52-14.5t36-38.5l58 58Zm-18-233q25 24 38.5 57t13.5 71v12q0 6-1 12L456-619q6-1 12-1h12q38 0 71 13.5t57 38.5ZM819-28 27-820l57-57L876-85l-57 57ZM407-440Zm171-57Z"/></svg>
            </div>
          )}
        </Carousel>
      </div>
      <div className="relative z-20 p-5">
        <div>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900  group-hover:text-white ">{title}</h5>
        </div>
        <p className="mb-3 font-normal text-gray-700  group-hover:text-white ">{address}</p>
        <div className="flex flex-wrap gap-1">
          <div className="flex gap-1">
            {types.slice(0, 3).map((type) => (
              <div
                key={type}
                className="border group-hover:text-white inline-flex items-center px-1 py-1 text-[10px] font-medium text-center text-primary bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                {type}
              </div>
            ))}
          </div>
          <div className="flex   ">
            <svg
              className="items-end ml-auto group-hover:fill-white"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#49A2EC"
            >
              <path d="m223-107 68-292L64-596l300-25 116-276 117 276 299 25-227 197 68 292-257-155-257 155Z" />
            </svg>
            <span className="text-primary font-medium  group-hover:text-white ">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
