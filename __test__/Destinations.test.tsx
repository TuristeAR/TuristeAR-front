import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Destinations from '../src/pages/Destinations';
import React from 'react';

describe('Destinations Page', () => {
  test('renders the header with navigation links', () => {
    render(<Destinations />);
   
    // Verificar que los enlaces de navegación estén presentes
    const destinosLink = screen.getByText('Destinos');
    const comunidadLink = screen.getByText('Comunidad');
    const armaTuViajeLink = screen.getByText('Armá tu viaje');
    
    expect(destinosLink).toBeInTheDocument();
    expect(comunidadLink).toBeInTheDocument();
    expect(armaTuViajeLink).toBeInTheDocument();
  });

  test('renders the search input', () => {
    render(<Destinations />);
    
    const searchInput = screen.getByPlaceholderText('Buscar por provincia, localidad o tipo de lugar...');
    expect(searchInput).toBeInTheDocument();
  });

  test('renders the Buenos Aires section', () => {
    render(<Destinations />);
    
    const buenosAiresTitle = screen.getByText('Buenos Aires');
    expect(buenosAiresTitle).toBeInTheDocument();
  });
});