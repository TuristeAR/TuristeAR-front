import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavMobile } from '../src/components/NavMobile/NavMobile';

// Mocks para simular la respuesta de la API
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('NavMobile Component', () => {
  test('renders login link when user is not authenticated', () => {
    // Simula la respuesta de la API para un usuario no autenticado
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(
      <Router>
        <NavMobile />
      </Router>,
    );

    const loginLink = screen.getByRole('link', { name: /Login/i });
    expect(loginLink).toBeInTheDocument();

    // Verifica que los enlaces de navegación se muestren
    const destinationsLink = screen.getByText(/Destinos/i);
    const comunidadLink = screen.getByText(/Comunidad/i);
    const armatuViajeLink = screen.getByText(/Armá tu viaje/i);

    expect(destinationsLink).toBeInTheDocument();
    expect(comunidadLink).toBeInTheDocument();
    expect(armatuViajeLink).toBeInTheDocument();
  });

  test('renders user name and profile picture when user is authenticated', async () => {
    // Simula la respuesta de la API para un usuario autenticado
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user: {
          name: 'Juan Pérez',
          profilePicture: 'https://example.com/profile.jpg',
        },
      }),
    });

    render(
      <Router>
        <NavMobile />
      </Router>,
    );

    // Espera a que el componente se actualice con la información del usuario
    await waitFor(() => {
      expect(screen.getByText(/Juan Pérez/i)).toBeInTheDocument();
    });

    // Verifica que los enlaces de navegación también se muestren
    const destinationsLink = screen.getByText(/Destinos/i);
    const comunidadLink = screen.getByText(/Comunidad/i);
    const armatuViajeLink = screen.getByText(/Armá tu viaje/i);

    expect(destinationsLink).toBeInTheDocument();
    expect(comunidadLink).toBeInTheDocument();
    expect(armatuViajeLink).toBeInTheDocument();
  });
});
