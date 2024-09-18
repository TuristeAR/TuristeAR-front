import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScrollingText } from '../src/components/ScrollingText';
import React from 'react';

describe('ScrollingText', () => {
  test('renders the scrolling text component', () => {
    render(<ScrollingText />);
    const textElement = screen.getByText(/VIAJÁ INTELIGENTE/);
    expect(textElement).toBeInTheDocument();
  });

  test('renders the texts "VIVÍ LA ARGENTINA"', () => {
    render(<ScrollingText />);
    const textElement = screen.getAllByText(/VIVÍ LA ARGENTINA/);
    expect(textElement.length).toBeGreaterThan(0);
  });

  test('renders the texts "VIAJÁ INTELIGENTE"', () => {
    render(<ScrollingText />);
    const textElement = screen.getAllByText(/VIAJÁ INTELIGENTE/);
    expect(textElement.length).toBeGreaterThan(0);
  });
});
