import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CreatePost } from '../src/components/Community/CreatePost';
const options = ['Seleccionar imagen', 'Seleccionar archivo', 'Importar itinerario'];

describe('Jobs', () => {
  test('render options of create post', () => {
    render(
      <BrowserRouter>
        <CreatePost options={options} profilePicture={''} />
      </BrowserRouter>,
    );
    const imageButton = screen.getByText('Seleccionar imagen');
    const fileButton = screen.getByText('Seleccionar archivo');
    const itineraryButton = screen.getByText('Importar itinerario');

    expect(imageButton).toBeInTheDocument();
    expect(itineraryButton).toBeInTheDocument();
    expect(fileButton).toBeInTheDocument();
  });
});
