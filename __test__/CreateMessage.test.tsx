import { CreateMessage } from '../src/components/Community/CreateMessage';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

jest.mock('socket.io-client', () => jest.fn(() => ({
  disconnect: jest.fn(),
  emit: jest.fn(),
  on: jest.fn(),
  connect: jest.fn(),
})));

const category = {
  id: 1,
  description: 'Viajes y Turismo',
};

const user = {
  id: 1,
  name: 'Juan Pérez',
  profilePicture: 'https://example.com/profile-picture.jpg',
  description: 'Aventurero apasionado por explorar nuevas culturas.',
  birthdate: '1990-05-15',
  coverPicture: 'https://example.com/cover-picture.jpg',
  location: 'Buenos Aires, Argentina',
};

const message = {
  content: '¡Me encanta viajar a lugares remotos y conocer nuevas culturas!',
  images: [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
  ],
  user: user,
  createdAt: new Date().toISOString(),
};

const forum = {
  id: 1,
  name: 'Foro de Aventureros',
  description: 'Espacio para compartir experiencias de viaje y consejos.',
  category: category,
  messages: [message],
};

describe('CreateMessage Component', () => {
  test('renders inputs correctly', () => {
    render(
      <BrowserRouter>
        <CreateMessage forum={forum} setForum={() => {}} user={user} />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText('Escribe tu mensaje...');
    expect(input.tagName).toBe('INPUT');
  });

});