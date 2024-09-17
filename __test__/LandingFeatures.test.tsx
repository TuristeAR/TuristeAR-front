import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LandingFeatures } from '../src/components/LandingFeatures';

describe('LandingFeatures', () => {
  test('renders the user posts image', () => {
    render(<LandingFeatures />);
    const postsImage = screen.getByAltText('User posts');
    expect(postsImage).toBeInTheDocument();
  });

  test('renders the calendar image', () => {
    render(<LandingFeatures />);
    const calendarImage = screen.getByAltText('Calendar');
    expect(calendarImage).toBeInTheDocument();
  });

  test('renders the calendar background image', () => {
    render(<LandingFeatures />);
    const calendarBackgroundImage = screen.getByAltText('Calendar background');
    expect(calendarBackgroundImage).toBeInTheDocument();
  });

  test('renders the "Ver más publicaciones" button', () => {
    render(<LandingFeatures />);
    const morePostsButton = screen.getByRole('link', { name: /Ver más publicaciones/i });
    expect(morePostsButton).toBeInTheDocument();
  });

  test('renders the "Comenzá a planificar" button', () => {
    render(<LandingFeatures />);
    const startPlanningButton = screen.getByRole('link', { name: /Comenzá a planificar/i });
    expect(startPlanningButton).toBeInTheDocument();
  });
});
