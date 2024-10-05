import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScrollingText } from '../src/components/Landing/ScrollingText';
import React from 'react';

describe('ScrollingText', () => {
  test('renders the scrolling text component', () => {
    render(<ScrollingText />);
    const textElements = screen.queryAllByText(/VIAJÁ INTELIGENTE VIVÍ LA ARGENTINA/);
    textElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
