import { CommunityFilters } from './CommunityFilters';
import { useState } from 'react';
const infoCategories = [
  {
    title: 'Filtrar por categoría',
    categories: [
      { imgPerson: '/assets/person.svg', user: 'General' },
      { imgPerson: '/assets/person.svg', user: 'Buenos Aires' },
      { imgPerson: '/assets/person.svg', user: 'Salta' },
      { imgPerson: '/assets/person.svg', user: 'Córdoba' },
      { imgPerson: '/assets/person.svg', user: 'Santa Fe' },
      { imgPerson: '/assets/person.svg', user: 'San Luis' },
    ],
    link: 'categories',
  },
];



export const LeftCommunity = (props:{vista : string}) => {
  const {vista}=props;
  return (
    <>
      <div className="flex flex-col lg:w-[20%] w-[100%] lg:block hidden p-6 gap-6 border-r border-[#999999]">
        <div className="flex flex-col gap-4 text-l font-semibold">
          <div className={`flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl py-2 px-4 ${(vista=='publications') ? 'bg-[#c0daeb]' : ''}`}>
            <img src="/assets/home.svg" alt="Publicaciones" className="w-[25px]" />
            <a href="/publications">Publicaciones</a>
          </div>
          <div className={`flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl  py-2 px-4 ${(vista=='forum') ? 'bg-[#c0daeb]' : ''}`}>
            <img src="/assets/message.svg" alt="Foro y preguntas" className="w-[25px]" />
            <a href="/forum">Foro y preguntas</a>
          </div>
          <div className={`flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl  py-2 px-4 ${(vista=='jobs') ? 'bg-[#c0daeb]' : ''}`}>
            <img src="/assets/personBlue.svg" alt="Ofertas de trabajo" className="w-[25px]" />
            <a href="/jobs">Ofertas de trabajo</a>
          </div>
        </div>
        <hr className="border border-[#999999] my-4"></hr>
        <div className="flex flex-col gap-y-4">
          {infoCategories.map((category, index) => (
            <CommunityFilters
              key={index}
              title={category.title}
              users={category.categories}
              link={category.link}
            />
          ))}
        </div>
      </div>
    </>
  );
};
