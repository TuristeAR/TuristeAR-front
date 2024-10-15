import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CreatePublications } from '../src/components/Community/CreatePublications';
import React from 'react';

describe('Jobs', () => {
  test('render options of create post', () => {
    render(
      <BrowserRouter>
        <CreatePublications  />
      </BrowserRouter>,
    );
    const createPost = screen.getByAltText('Crear post');
    expect(createPost).toBeInTheDocument();
  });
});
