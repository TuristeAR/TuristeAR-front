import '@testing-library/jest-dom';
import { render, screen, waitFor, act } from '@testing-library/react';
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
  test('renders login link when user is not authenticated', async () => {
    // Simula la respuesta de la API para un usuario no autenticado
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await act(async () => {
      render(
        <Router>
          <NavMobile />
        </Router>,
      );
    });

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

  test('handles fetch error correctly', async () => {
    // Simula un error en la solicitud de la API
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

    await act(async () => {
      render(
        <Router>
          <NavMobile />
        </Router>,
      );
    });

    // Verifica que el enlace de inicio de sesión está en el documento
    await waitFor(() => {
      const loginLink = screen.getByRole('link', { name: /Login/i });
      expect(loginLink).toBeInTheDocument();
    });

    // Asegúrate de que no se muestra el nombre de usuario
    expect(screen.queryByText(/Juan Pérez/i)).not.toBeInTheDocument();
  });
});
