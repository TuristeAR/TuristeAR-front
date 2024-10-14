import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ArticleCard } from '../src/components/Destinations/ArticleCard';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

describe('ArticleCard', () => {
  const mockProps = {
    title: 'Test Title',
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    description: 'This is a test description.',
    rating: 0,
    types: [],
    address: 'addess',
  };

  test('renders ArticleCard with correct title, description, and images', () => {
    render(
      <BrowserRouter>
        <ArticleCard {...mockProps} />
      </BrowserRouter>,
    );

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();

    expect(screen.getByText(mockProps.address)).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(mockProps.images.length);

    mockProps.images.forEach((image, index) => {
      expect(images[index]).toHaveAttribute('src', image);
      expect(images[index]).toHaveAttribute('alt', mockProps.title);
    });

  });
});
