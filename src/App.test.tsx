import { render, screen } from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders the Fun panels top', () => {
  render(<App />);
  const linkElement = screen.getByText(/Fun panels/i);
  expect(linkElement).toBeInTheDocument();
});