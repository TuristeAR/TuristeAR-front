import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Nav } from '../src/components/Nav/Nav';

// Mocks para simular la respuesta de la API
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Nav Component', () => {
  test('renders login link when user is not authenticated', async () => {
    // Simula la respuesta de la API para un usuario no autenticado
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: null }), // No hay usuario
    });

    render(
      <Router>
        <Nav />
      </Router>
    );

    // Verifica que el enlace de inicio de sesión está en el documento
    const loginLink = screen.getByText(/Iniciá sesión/i);
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
        <Nav />
      </Router>
    );

    // Espera a que el componente se actualice con la información del usuario
    await waitFor(() => {
      expect(screen.getByText(/Juan Pérez/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Foto de perfil/i)).toHaveAttribute('src', 'https://example.com/profile.jpg');
    });

    // Verifica que los enlaces de navegación también se muestren
    const destinationsLink = screen.getByText(/Destinos/i);
    const comunidadLink = screen.getByText(/Comunidad/i);
    const armatuViajeLink = screen.getByText(/Armá tu viaje/i);

    expect(destinationsLink).toBeInTheDocument();
    expect(comunidadLink).toBeInTheDocument();
    expect(armatuViajeLink).toBeInTheDocument();
  });

  test('sets error state correctly on fetch error', async () => {
    // Simula un error en la solicitud de la API
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

    render(
      <Router>
        <Nav />
      </Router>
    );

    // Verifica que el enlace de inicio de sesión está en el documento
    await waitFor(() => {
      const loginLink = screen.getByText(/Iniciá sesión/i);
      expect(loginLink).toBeInTheDocument();
    });

    // Asegúrate de que no se muestra el nombre de usuario
    expect(screen.queryByText(/Juan Pérez/i)).not.toBeInTheDocument();
  });
});
