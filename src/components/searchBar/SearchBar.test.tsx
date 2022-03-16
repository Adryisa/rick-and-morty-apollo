import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './searchBar';

describe('Given the search bar component', () => {
  describe('When the input filled', () => {
    test('Then the function handle change should be called', () => {
      const handleChange = jest.fn();
      const searchValue = 'Ricky';
      render(
        <MemoryRouter>
          <SearchBar handleChange={handleChange} searchValue={searchValue} />
        </MemoryRouter>
      );

      const input = screen.getByPlaceholderText(
        /search your favorite character/i
      );

      fireEvent.change(input, { target: { value: searchValue } });
    });
  });
});
