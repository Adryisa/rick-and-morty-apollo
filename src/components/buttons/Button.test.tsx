import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Buttons } from './Buttons';

describe('Given the button component', () => {
  describe('When the page is the first', () => {
    test('then one buttons should be renderer', async () => {
      const nextPage = jest.fn();
      const prevPage = jest.fn();
      render(
        <MemoryRouter>
          <Buttons
            nextPage={nextPage}
            prevPage={prevPage}
            maxPage={4}
            currentPage={1}
          />
        </MemoryRouter>
      );
      expect(await screen.queryByText(/next/i)).toBeInTheDocument();
      expect(await screen.queryByText(/less/i)).not.toBeInTheDocument();
    });
  });
  describe('When the pages is middle indexes', () => {
    test('then two buttons should be renderer', async () => {
      const nextPage = jest.fn();
      const prevPage = jest.fn();
      render(
        <MemoryRouter>
          <Buttons
            nextPage={nextPage}
            prevPage={prevPage}
            maxPage={4}
            currentPage={2}
          />
        </MemoryRouter>
      );
      expect(await screen.queryByText(/prev/i)).toBeInTheDocument();
      expect(await screen.queryByText(/next/i)).toBeInTheDocument();
    });
  });
});
