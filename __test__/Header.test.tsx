import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../src/components/Header/Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  test('renders the logo', () => {
    render(
      <BrowserRouter>
        <Header containerStyles={''} />
      </BrowserRouter>,
    );
    const logoElement = screen.getByAltText('Logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders the navigation links', () => {
    render(
      <BrowserRouter>
        <Header containerStyles={''} />
      </BrowserRouter>,
    );
    const destinosLink = screen.getByText('Destinos');
    const comunidadLink = screen.getByText('Comunidad');
    const armaTuViajeLink = screen.getByText('Armá tu viaje');
    expect(destinosLink).toBeInTheDocument();
    expect(comunidadLink).toBeInTheDocument();
    expect(armaTuViajeLink).toBeInTheDocument();
  });

  test('renders the login button with correct text', () => {
    render(
      <BrowserRouter>
        <Header containerStyles={''} />
      </BrowserRouter>,
    );
    const loginLink = screen.getByRole('link', { name: /Iniciá sesión/i });
    expect(loginLink).toBeInTheDocument();
  });
});
