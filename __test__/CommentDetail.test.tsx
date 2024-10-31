import React from 'react';
import { act, render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { CommentDetail } from '../src/components/Community/CommentDetail';

const mockUser = {
  id: 1,
  username: "mockUsername",
  name: "Marcelo Gallardo",
  profilePicture: "https://i.imgur.com/Xgjbinw.jpeg",
  description: "Mock user description",
  birthdate: "1990-01-01",
  coverPicture: "https://i.imgur.com/exampleCover.jpg",
  location: "Mock Location",
};

const mockPublication = {
  id: 1,
  description: "Viaje a Bs As",
  category: null,
  creationDate: "2024-10-08",
  images: [],
  user: mockUser,
  likes: [mockUser],
  reposts: [mockUser],
  saved: [mockUser],
  comments: [
    {
      createdAt: "2024-10-08 13:54:37.718482",
      description: "Quiero hacer ese viaje!",
      user: mockUser,
    },
  ],
};

describe('CommentDetail', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('renders comments correctly', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <CommentDetail user={mockUser} publication={mockPublication} />
        </BrowserRouter>
      );
    });

    expect(screen.getByText('Quiero hacer ese viaje!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Escribe tu comentario...')).toBeInTheDocument();
  });

  test('render input type text', () => {
    render(
      <BrowserRouter>
        <CommentDetail user={mockUser} publication={mockPublication} />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText('Escribe tu comentario...');
    expect(input).toHaveValue('');
  });
});
