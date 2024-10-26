import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import App from './App';

test('renders the Fun panels top', () => {
  render(<App />);
  const linkElement = screen.getByText(/Fun panels/i);
  expect(linkElement).toBeInTheDocument();
});

test('inputs a dummy username and verifies it on the home page', () => {
  render(<App />);
  
  // Check if the UserNamePrompt is displayed
  const promptElement = screen.getByText(/Please enter your name/i);
  expect(promptElement).toBeInTheDocument();

  // Simulate entering a username
  const inputElement = screen.getByRole('textbox');
  fireEvent.change(inputElement, { target: { value: 'dummyUser' } });

  // Simulate clicking the submit button
  const buttonElement = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(buttonElement);

  // Verify the username on the home page
  const usernameElement = screen.getByText(/Hello dummyUser!/i);
  expect(usernameElement).toBeInTheDocument();
});
