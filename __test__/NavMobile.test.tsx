// NavMobile.test.tsx
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavMobile } from '../src/components/NavMobile/NavMobile';

describe('NavMobile Component', () => {
  test('renders the navigation links', () => {
    render(
      <Router>
        <NavMobile />
      </Router>,
    );

    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();

    // Check if the navigation links are rendered
    const destinationsLink = screen.getByText(/Destinos/i);
    const comunidadLink = screen.getByText(/Comunidad/i);
    const armatuViajeLink = screen.getByText(/Armá tu viaje/i);

    expect(destinationsLink).toBeInTheDocument();
    expect(comunidadLink).toBeInTheDocument();
    expect(armatuViajeLink).toBeInTheDocument();
  });
});
