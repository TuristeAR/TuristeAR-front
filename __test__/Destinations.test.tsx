import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Destinations from '../src/pages/Destinations';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';


describe('Destinations Page', () => {
  test('renders the header with navigation links', () => {
    render(
      <BrowserRouter>
        <Destinations />
      </BrowserRouter>,
    );

    // Verificar que los enlaces de navegación estén presentes
    const destinosLink = screen.getByText('Destinos');
    const comunidadLink = screen.getByText('Comunidad');
    const armaTuViajeLink = screen.getByText('Armá tu viaje');

    expect(destinosLink).toBeInTheDocument();
    expect(comunidadLink).toBeInTheDocument();
    expect(armaTuViajeLink).toBeInTheDocument();
  });

  test('renders the search input', () => {
    render(
      <BrowserRouter>
        <Destinations />
      </BrowserRouter>,
    );

    const searchInput = screen.getByPlaceholderText(
      'Buscar por provincia, localidad o tipo de lugar...',
    );
    expect(searchInput).toBeInTheDocument();
  });

  test('renders Buenos Aires section with description and images', () => {
    render(
      <BrowserRouter>
        <Destinations />
      </BrowserRouter>
    );

    const buenosAiresTitle = screen.getByText('Catamarca');
    expect(buenosAiresTitle).toBeInTheDocument();

    const description = screen.getByText(/Situada en el noroeste, destaca por sus montañas/i);
    expect(description).toBeInTheDocument();

    // Verificar que las imágenes están presentes
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  test('renders the user reviews in the carousel', () => {
    render(
      <BrowserRouter>
        <Destinations />
      </BrowserRouter>
    );

    // Verificar que los nombres de usuarios están presentes
    const pabloReview = screen.getByText('Pablo Ramirez');
    const victorReview = screen.getByText('Victor Gonzalez');
    const malenaReview = screen.getByText('Malena Yannone');
    const belenReview = screen.getByText('Belen Peña');
    const gabrielReview = screen.getByText('Gabriel Fuentes');

    expect(pabloReview).toBeInTheDocument();
    expect(victorReview).toBeInTheDocument();
    expect(malenaReview).toBeInTheDocument();
    expect(belenReview).toBeInTheDocument();
    expect(gabrielReview).toBeInTheDocument();
  });

  test('renders the "Descrubí más " button in Catamarca section', () => {
    render(
      <BrowserRouter>
        <Destinations />
      </BrowserRouter>
    );

    const verMasButton = screen.getByText('Descrubí más de Catamarca');
    expect(verMasButton).toBeInTheDocument();
  });


  
});
