import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { CreateForums } from '../src/components/Community/CreateForums';

jest.mock('lottie-react', () => {
  return () => <div></div>;
});

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

const mockCategories = [
  { id: 1, description: 'Categoría 1' },
  { id: 2, description: 'Categoría 2' },
];

describe('Create Forums', () => {

  test('renders CreateForums component', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCategories,
    });

    await act(async () => {
      render(
        <BrowserRouter>
          <CreateForums/>
        </BrowserRouter>,
      );
    });

    fireEvent.click(screen.getByRole('button', { name: /Abrir pop up para crear foro/i }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Ingrese el nombre')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ingrese la descripción')).toBeInTheDocument();
    });
  });

  test('shows error message when fields are empty', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCategories,
    });

    await act(async () => {
      render(
        <BrowserRouter>
          <CreateForums />
        </BrowserRouter>,
      );
    });
    fireEvent.click(screen.getByRole('button', { name: /Abrir pop up para crear foro/i }));
    fireEvent.click(screen.getByRole('button', { name: 'Crear foro' }));

    expect(await screen.findByText('Ingrese una descripción!')).toBeInTheDocument();
  });

  test('shows error message when category is not selected', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCategories,
    });

    await act(async () => {
      render(
        <BrowserRouter>
          <CreateForums />
        </BrowserRouter>,
      );
    });

    fireEvent.click(screen.getByRole('button', { name: /Abrir pop up para crear foro/i }));
    fireEvent.input(screen.getByPlaceholderText('Ingrese el nombre'), { target: { value: 'Nombre del foro' } });
    fireEvent.input(screen.getByPlaceholderText('Ingrese la descripción'), { target: { value: 'Descripción del foro' } });
    fireEvent.click(screen.getByRole('button', { name: 'Crear foro' }));

    expect(await screen.findByText('Seleccione una categoría!')).toBeInTheDocument();
  });

});
