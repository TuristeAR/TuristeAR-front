import MenuCommunity from './MenuCommunity';
import CommunityFilters from './CommunityFilters';
import React from 'react';
const infoCategories=[
  {
    title: "Filtrar por categoría",
    categories : [
      { imgPerson: '/assets/person.svg', user : 'General' },
      { imgPerson: '/assets/person.svg', user : 'Buenos Aires' },
      { imgPerson: '/assets/person.svg', user : 'Salta' },
      { imgPerson: '/assets/person.svg', user : 'Córdoba' },
      { imgPerson: '/assets/person.svg', user : 'Santa Fe' },
      { imgPerson: '/assets/person.svg', user : 'San Luis' },
    ],
    link: "categories"
  }
]

function LeftCommunity() {
  return (
    <>
      <div className="flex flex-col w-[18%] p-6 gap-6">
        <MenuCommunity />
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
}

export default LeftCommunity;
