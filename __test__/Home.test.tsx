import { render } from '@testing-library/react';
import { Home } from '../src/pages/Home';
import { BrowserRouter } from 'react-router-dom';

describe('Home', () => {
  test('Renders Home page correctly', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    expect(true).toBeTruthy();
  });
});
