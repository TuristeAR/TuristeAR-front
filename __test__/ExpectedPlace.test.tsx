import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import ArticleCard from '../src/components/ArticleCard';
import { BrowserRouter } from 'react-router-dom';

describe('ArticleCard', () => {
  const mockProps = {
    title: 'Test Title',
    images: [
      { id: 1, src: 'https://example.com/image1.jpg' },
      { id: 2, src: 'https://example.com/image2.jpg' }
    ],
    description: 'This is a test description.',
    link: 'https://example.com',
  };

  test('renders ArticleCard with correct title, description, and images', () => {
    render(
      <BrowserRouter>
        <ArticleCard {...mockProps} />
      </BrowserRouter>
    );

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();

    expect(screen.getByText(mockProps.description)).toBeInTheDocument();

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(mockProps.images.length);

    mockProps.images.forEach((image, index) => {
      expect(images[index]).toHaveAttribute('src', image.src);
      expect(images[index]).toHaveAttribute('alt', mockProps.title);
    });

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href', mockProps.link);
    });
  });


});
