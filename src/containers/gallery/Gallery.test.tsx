import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { CHARACTERS_QUERY, Gallery } from './Gallery';

const mocks = [
  {
    request: {
      query: CHARACTERS_QUERY,
      variables: {
        page: 1,
        filter: { name: '', gender: '', status: '' },
      },
    },
    result: {
      data: {
        characters: {
          results: [
            {
              id: '1',
              name: 'Rick',
              image: 'rick.jpg',
            },
            {
              id: '2',
              name: 'Morty',
              image: 'morty.jpg',
            },
          ],
        },
      },
    },
  },
];

const charactersMockError = {
  request: {
    query: CHARACTERS_QUERY,
    variables: {
      page: 1,
      filter: { name: '' },
    },
  },
  error: new Error('404: Not Found'),
};

const mockSorted = [
  {
    request: {
      query: CHARACTERS_QUERY,
      variables: {
        page: 1,
        filter: { name: '', gender: '', status: '' },
      },
    },
    result: {
      data: {
        characters: {
          results: [
            {
              id: '3',
              name: 'micky',
              image: 'micky.jpg',
            },
            {
              id: '2',
              name: 'morty',
              image: 'morty.jpg',
            },
            {
              id: '4',
              name: 'mortyy',
              image: 'morty.jpg',
            },
          ],
        },
      },
    },
  },
];

describe('Given the gallery component', () => {
  describe('When its loading', () => {
    test('Then it should render an image with alt text loading', () => {
      const setContentLoading = jest.fn();
      render(
        <MockedProvider mocks={mocks}>
          <MemoryRouter>
            <Gallery
              pageIndex={1}
              setContentLoading={setContentLoading}
              name=""
              gender=""
              status=""
            />
          </MemoryRouter>
        </MockedProvider>
      );
      expect(screen.getByAltText(/loading/i)).toBeInTheDocument();
    });
  });
  describe('When there is and error', () => {
    test('Then it should render an image and a sorry no result render', async () => {
      const setContentLoading = jest.fn();
      render(
        <MockedProvider mocks={[charactersMockError]}>
          <MemoryRouter>
            <Gallery
              pageIndex={1}
              setContentLoading={setContentLoading}
              name=""
              gender=""
              status=""
            />
          </MemoryRouter>
        </MockedProvider>
      );
      expect(await screen.findByText(/Sorry no results/i)).toBeInTheDocument();
    });
  });
  describe('When there is and info loaded', () => {
    test('Then it should render the character info', async () => {
      const setContentLoading = jest.fn();
      render(
        <MockedProvider mocks={mocks}>
          <MemoryRouter>
            <Gallery
              pageIndex={1}
              setContentLoading={setContentLoading}
              name=""
              gender=""
              status=""
            />
          </MemoryRouter>
        </MockedProvider>
      );
      expect(await screen.findByText(/Rick/i)).toBeInTheDocument();

      const sortButton = await screen.queryByText(/sort/i);

      fireEvent.click(sortButton);

      render(
        <MockedProvider mocks={mockSorted} addTypename={false}>
          <MemoryRouter>
            <Gallery
              pageIndex={1}
              setContentLoading={setContentLoading}
              name=""
              gender=""
              status=""
            />
          </MemoryRouter>
        </MockedProvider>
      );

      expect(await screen.findByText(/micky/i)).toBeInTheDocument();

      fireEvent.click(sortButton);

      render(
        <MockedProvider mocks={mocks}>
          <MemoryRouter>
            <Gallery
              pageIndex={1}
              setContentLoading={setContentLoading}
              name=""
              gender=""
              status=""
            />
          </MemoryRouter>
        </MockedProvider>
      );
      expect(await screen.findByText(/Rick/i)).toBeInTheDocument();
    });
  });
});
