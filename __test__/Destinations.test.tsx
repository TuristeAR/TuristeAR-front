import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { get } from '../src/utilities/http.util';
import Destinations from '../src/pages/Destinations';
import '@testing-library/jest-dom';
import React from 'react';

jest.mock('../src/utilities/http.util', () => ({
  get: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockProvinces = [
  {
    id: 1,
    name: 'Buenos Aires',
    description: 'Provincia de Buenos Aires',
    images: ['/assets/san-nicolas-buenos-aires.webp'],
  },
  {
    id: 2,
    name: 'Córdoba',
    description: 'Provincia de Córdoba',
    images: ['/assets/san-nicolas-buenos-aires.webp'],
  },
];

describe('Destinations Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  test('fetches provinces on initial render', async () => {
    (get as jest.Mock).mockResolvedValueOnce({ data: mockProvinces });

    render(
      <BrowserRouter>
        <Destinations />
      </BrowserRouter>,
    );

    expect(get).toHaveBeenCalledWith('http://localhost:3001/province', {
      'Content-Type': 'application/json',
    });
  });
});
