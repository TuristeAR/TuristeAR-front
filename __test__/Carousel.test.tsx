// Carousel.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carousel from '../src/components/Carousel';

describe('Carousel Component', () => {
  it('should render the correct number of slides', () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>,
    );

    // Verificar que los elementos existan
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('should initially display the first slide', () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>,
    );
    const slidesContainer = screen.getByText('Slide 1').closest('.flex');
    expect(slidesContainer).toHaveStyle('transform: translateX(-0%)');

  });
});
