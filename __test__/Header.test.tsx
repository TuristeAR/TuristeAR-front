import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../src/components/Header';

describe('Header', () => {
  test('renders the logo', () => {
    render(<Header containerStyles={''} />);
    const logoElement = screen.getByAltText('Logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders the navigation links', () => {
    render(<Header containerStyles={''} />);
    const destinosLink = screen.getByText('Destinos');
    const comunidadLink = screen.getByText('Comunidad');
    const armaTuViajeLink = screen.getByText('Armá tu viaje');
    expect(destinosLink).toBeInTheDocument();
    expect(comunidadLink).toBeInTheDocument();
    expect(armaTuViajeLink).toBeInTheDocument();
  });

  test('renders the login button with correct text', () => {
    render(<Header containerStyles={''} />);
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
  });
});
