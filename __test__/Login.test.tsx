import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Login } from '../src/pages/Login';

describe('Login page', () => {
  it('renders the background image', () => {
    render(<Login />);
    const backgroundImg = screen.getByAltText('Background');
    expect(backgroundImg).toBeInTheDocument();
    expect(backgroundImg).toHaveAttribute('alt', expect.stringContaining('Background'));
  });

  it('renders the logo image', () => {
    render(<Login />);
    const logoImg = screen.getByAltText('TuristeAR');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('alt', expect.stringContaining('TuristeAR'));
  });

  it('renders the login prompt text', () => {
    render(<Login />);
    expect(screen.getByText(/Iniciá sesión para disfrutar/i)).toBeInTheDocument();
  });

  it('renders the ContinueWithGoogle component', () => {
    render(<Login />);
    expect(screen.getByText('Continuar con Google')).toBeInTheDocument();
  });
});
