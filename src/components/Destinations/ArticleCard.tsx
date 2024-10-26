import React from 'react';

interface ArticleCardProps {
  title: string;
  image: string;
  rating: number;
  address: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ title, image, rating, address }) => {
  return (
    <div className="h-[400px] max-w-xs m-auto bg-white border border-primary-3 rounded-lg shadow relative group overflow-hidden transform transition-transform duration-300  hover:shadow-sm hover:shadow-gray hover:-translate-y-1.5 mt-2">
      <span className="absolute inset-0 z-10 bg-orange transition-all duration-300 ease-out transform translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0"></span>
      <div className="relative z-30">
        <div className="h-[200px] overflow-hidden">
          <img
            className="rounded-t-lg h-full w-full object-cover transition-all duration-300 group-hover:scale-125 "
            src={image}
            alt={title}
          />
        </div>
      </div>
      <div className="flex flex-col justify-between h-[200px] relative z-20 p-5">
        <div>
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 group-hover:text-white ">
            {title}
          </h5>
          <p className="italic text-md mt-auto font-light">{address}</p>
        </div>
        <div className="flex flex-nowrap max-w-fit justify-around gap-1 relative z-20">
          {[...Array(Math.round(rating))].map((_, index) => (
            <svg
              key={index}
              className="items-end ml-auto size-5 group-hover:fill-white"
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#49A2EC"
            >
              <path d="m223-107 68-292L64-596l300-25 116-276 117 276 299 25-227 197 68 292-257-155-257 155Z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
};
