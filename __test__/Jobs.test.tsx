import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ItineraryCard } from '../src/components/ImageGallery/ItineraryCard';

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
            <ItineraryCard
              key={index}
              usuario={item.usuario}
              fecha={item.fecha}
              descripcion={item.descripcion}
              img={item.img}
              imgPerson={item.imgPerson}
            />
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
