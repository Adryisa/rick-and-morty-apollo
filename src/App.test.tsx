import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders title', () => {
  render(
    <MockedProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </MockedProvider>
  );
  const linkElement = screen.getByText(/Rick and Morty ft. GraphQL/i);
  expect(linkElement).toBeInTheDocument();
});
