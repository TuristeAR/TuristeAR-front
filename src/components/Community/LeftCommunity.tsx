import { CommunityFilters } from './CommunityFilters';
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

export const LeftCommunity = () => {
  return (
    <>
      <div className="flex flex-col w-[18%] p-6 gap-6">
        <div className="flex flex-col gap-4 text-l font-semibold">
          <div className="flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl">
            <img src="/assets/home.svg" alt="Publicaciones" className="w-[25px]" />
            <a href="/publications">Publicaciones</a>
          </div>
          <div className="flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl">
            <img src="/assets/message.svg" alt="Foro y preguntas" className="w-[25px]" />
            <a href="/forum">Foro y preguntas</a>
          </div>
          <div className="flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl">
            <img src="/assets/personBlue.svg" alt="Ofertas de trabajo" className="w-[25px]" />
            <a href="/jobs">Ofertas de trabajo</a>
          </div>
        </div>
        <hr className="border border-[#999999]"></hr>
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
