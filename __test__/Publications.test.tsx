import { render, screen } from '@testing-library/react';
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

  test('renders the search input', () => {
    render(
      <BrowserRouter>
        <CommunityFilters
          key={infoCategories[0].link}
          description={infoCategories[0].title}
          image={infoCategories[0].title}
        />
      </BrowserRouter>,
    );

    const searchInput = screen.getByPlaceholderText('Buscar');
    expect(searchInput).toBeInTheDocument();
  });

  test('render community filters', () => {
    render(
      <BrowserRouter>
        {infoCategories.map((item, index) => (
          <CommunityFilters
            key={index}
            description={item.title}
            image={item.title}
          />
        ))}
      </BrowserRouter>,
    );

    const pabloReview = screen.getByText('General');
    const victorReview = screen.getByText('Buenos Aires');
    const belenReview = screen.getByText('Salta');
    const malenaReview = screen.getByText('Córdoba');
    const santaFeReview = screen.getByText('Santa Fe');
    const sanLuisReview = screen.getByText('San Luis');

    expect(pabloReview).toBeInTheDocument();
    expect(victorReview).toBeInTheDocument();
    expect(malenaReview).toBeInTheDocument();
    expect(belenReview).toBeInTheDocument();
    expect(santaFeReview).toBeInTheDocument();
    expect(sanLuisReview).toBeInTheDocument();
  });
});
