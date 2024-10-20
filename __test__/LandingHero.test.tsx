import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LandingHero } from '../src/components/Landing/LandingHero';
import React from 'react';

describe('LandingHero', () => {
  test('renders the video element', () => {
    render(<LandingHero />);
    const videoElement = screen.getByTestId('landing-hero-video');
    expect(videoElement).toBeInTheDocument();
  });

  test('renders the main heading', () => {
    render(<LandingHero />);
    const headingElement = screen.getByText(/Descubrí /);
    const spanElement = within(headingElement).getByText('Argentina');
    expect(spanElement).toBeInTheDocument();
  });

  test('renders the description paragraph', () => {
    render(<LandingHero />);
    const paragraphElement = screen.getByText(/Creá tu viaje perfecto/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  test('renders the button with correct text', () => {
    render(<LandingHero />);
    const buttonElement = screen.getByRole('button', { name: /Planificá tu viaje/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
