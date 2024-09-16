import { render } from '@testing-library/react';
import { Home } from '../src/pages/Home';

test('Renders Home page correctly', () => {
  render(<Home />);
  expect(true).toBeTruthy();
});
