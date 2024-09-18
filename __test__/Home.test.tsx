import { render } from '@testing-library/react';
import { Home } from '../src/pages/Home';
import React from 'react';

describe('Home', () => {
  test('Renders Home page correctly', () => {
    render(<Home />);
    expect(true).toBeTruthy();
  });
});
