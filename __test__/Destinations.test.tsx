import { render, screen, waitFor, fireEvent } from '@testing-library/react';
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

  test('fetches and displays provinces on initial render', async () => {
    (get as jest.Mock).mockResolvedValueOnce({ data: mockProvinces });

    render(
      <BrowserRouter>
        <Destinations />
      </BrowserRouter>,
    );

    expect(get).toHaveBeenCalledWith('https://api-turistear.koyeb.app/province', {
      'Content-Type': 'application/json',
    });

    await waitFor(() => {
      expect(screen.getByText('Buenos Aires')).toBeInTheDocument();
      expect(screen.getByText('Provincia de Buenos Aires')).toBeInTheDocument();
    });
  });

  test('selects a province when clicking on a map province', async () => {
    (get as jest.Mock).mockResolvedValueOnce({ data: mockProvinces });

    render(
      <BrowserRouter>
        <Destinations />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Buenos Aires')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Buenos Aires'));

    await waitFor(() => {
      expect(screen.getByText('Buenos Aires')).toBeInTheDocument();
    });
  });

  test('navigates to selected province details on button click', async () => {
    (get as jest.Mock).mockResolvedValueOnce({ data: mockProvinces });

    render(
      <BrowserRouter>
        <Destinations />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Buenos Aires')).toBeInTheDocument();
    });

    const button = screen.getByText('Descrubí más de Buenos Aires');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/destino-esperado/Buenos Aires');
  });

  test('displays error message if fetching provinces fails', async () => {
    (get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(
      <BrowserRouter>
        <Destinations />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.queryByText('Buenos Aires')).not.toBeInTheDocument();
    });

    expect(console.error).toHaveBeenCalledWith('Error fetching provinces:', expect.any(Error));
  });
});
