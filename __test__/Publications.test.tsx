import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { LeftCommunity } from '../src/components/Community/LeftCommunity';
import { CommunityFilters } from '../src/components/Community/CommunityFilters';
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

// Mocks para simular la respuesta de la API
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});



describe('Publications', () => {
  test('render menu with navigation links', () => {
    render(
      <BrowserRouter>
        <LeftCommunity vista={'jobs'} />
      </BrowserRouter>,
    );

    const publicationsLink = screen.getByText('Publicaciones');
    const forumLink = screen.getByText('Foro y preguntas');
    const jobsLink = screen.getByText('Ofertas de trabajo');

    expect(publicationsLink).toBeInTheDocument();
    expect(forumLink).toBeInTheDocument();
    expect(jobsLink).toBeInTheDocument();
  });


  test('render community filters',async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
    });

    await act(async () => {
      render(
        <BrowserRouter>
          {infoCategories.map((item, index) => (
            <CommunityFilters
              key={index}
              description={item.categories[1].user}
              image={item.title}
            />
          ))}
        </BrowserRouter>,
      );
    });

    const bsAs = screen.getByText('Buenos Aires');
    expect(bsAs).toBeInTheDocument();
  });
});
