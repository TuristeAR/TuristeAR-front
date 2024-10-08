import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../src/pages/Profile';

// Mocks para simular la respuesta de la API
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});


describe("Profile",()=>{
  test('renders user is not authenticated when not authenticated', async () => {

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 401,
    });

    await act(async () => {
      render(
        <Router>
          <Profile />
        </Router>
      );
    });

    const userIsNotAuthenticated = screen.getByText(/User is not authenticated/i);

    expect(userIsNotAuthenticated).toBeInTheDocument();
  });

  test('renders data of user when is authenticated', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user: {
          id: 1,
          name: 'Paolo Aleman',
          profilePicture: 'paoloAleman.jpg'
        }
      }),
    });

    await act(async () => {
      render(
        <Router>
          <Profile />
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/Paolo Aleman/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Paolo Aleman/i)).toHaveAttribute('src', 'paoloAleman.jpg');
    });
  });


})