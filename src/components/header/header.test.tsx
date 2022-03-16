import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

describe('Given the header component', () => {
  test('Then it should render the logo img', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/rick-and-morty/i)).toBeInTheDocument();
  });
});
