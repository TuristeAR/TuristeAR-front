import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { LeftCommunity } from '../src/components/Community/LeftCommunity';

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

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Left Community', () => {
  test('render menu with navigation links', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <LeftCommunity vista={'jobs'}  activeItem={''} categorySelected={1} handleClick={null} setCategorySelected={null}/>
        </BrowserRouter>,
      );
    })

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
          {infoCategories.map((category, index) => (
            <div className="space-y-4" key={index}>
              <div className="flex justify-between items-center">
                <button
                  className={
                    `flex gap-2 items-center hover:bg-[#d9d9d9] rounded-xl w-[100%] py-2 px-4`
                  }
                >
                  <div className="flex items-center">
                    <p className="">{category.categories[1].user}</p>
                  </div>
                </button>
              </div>
            </div>
          ))}
        </BrowserRouter>,
      );
    });

    const bsAs = screen.getByText('Buenos Aires');
    expect(bsAs).toBeInTheDocument();
  });
});
