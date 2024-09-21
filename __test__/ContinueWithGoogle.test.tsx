import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContinueWithGoogle } from '../src/components/ContinueWithGoogle';

describe('ContinueWithGoogle component', () => {
  it('renders the button with correct text', () => {
    render(<ContinueWithGoogle />);
    expect(screen.getByText('Continuar con Google')).toBeInTheDocument();
  });

  it('renders the Google logo', () => {
    render(<ContinueWithGoogle />);
    const img = screen.getByAltText('Google logo');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://www.svgrepo.com/show/475656/google-color.svg');
  });
});
