import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PublicationCard } from '../src/components/Community/PublicationCard';

const itineraries = [
  {
    imgPerson: '/assets/person.svg',
    usuario: 'Pablo Ramirez',
    fecha: '26 Sep 2024',
    descripcion:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
  },
  {
    imgPerson: '/assets/person.svg',
    usuario: 'Victor Gonzalez',
    fecha: '26 Sep 2024',
    descripcion:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse corrupti laborum possimus ad eligendi iusto, perferendis atque accusantium consequatur facere.',
    img: [
      { id: 1, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 2, src: '/assets/san-nicolas-buenos-aires.webp' },
      { id: 3, src: '/assets/san-nicolas-buenos-aires.webp' },
    ],
  },
];

describe('Jobs', () => {
    test('render itineraries cards correctly', () => {
    render(
      <BrowserRouter>
        {itineraries.map((item, index) => {
          return (
            <PublicationCard
              key={index}
              id={1}
              userId={item.usuario}
              creationDate={item.fecha}
              description={item.descripcion}
              images={[item.img[0].src]}
              profilePicture={item.imgPerson}
             likes={0} reposts={0} saved={0}
            isLiked={false} isSaved={false} isRepost={false} category={''}/>
          );
        })}
      </BrowserRouter>,
    );

    const firstUser = screen.getByText('Pablo Ramirez');
    const secondUser = screen.getByText('Victor Gonzalez');

    expect(firstUser).toBeInTheDocument();
    expect(secondUser).toBeInTheDocument();
  });
});
