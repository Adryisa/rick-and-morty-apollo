import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { CHARACTERS_QUERY } from '../../containers/gallery/Gallery';
import { Characters, CHARACTERS_PAGES_AMOUNT_QUERY } from './Characters';

const mocks = [
  {
    request: {
      query: CHARACTERS_QUERY,
      variables: {
        page: 1,
        filter: {
          name: '',
          gender: '',
          status: '',
        },
      },
    },
    result: {
      data: {
        characters: {
          results: [
            {
              id: '1',
              name: 'ricky',
              image: 'ricky.png',
            },
            {
              id: '2',
              name: 'morty',
              image: 'morty.png',
            },
            {
              id: '3',
              name: 'bubba',
              image: 'bubba.png',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: CHARACTERS_QUERY,
      variables: {
        page: 2,
        filter: {
          name: '',
          gender: '',
          status: '',
        },
      },
    },

    result: {
      data: {
        characters: {
          results: [
            {
              id: '6',
              name: 'rickyki',
              image: 'rickyki.png',
            },
            {
              id: '7',
              name: 'moimoi',
              image: 'moimoi.png',
            },
            {
              id: '8',
              name: 'buba-test',
              image: 'buba-test.png',
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: CHARACTERS_PAGES_AMOUNT_QUERY,
      variables: {
        filter: {
          name: '',
          gender: '',
          status: '',
        },
      },
    },
    result: {
      data: {
        characters: {
          info: {
            pages: 10,
          },
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

describe('Given the characters component', () => {
  describe('When there is an error in the data', () => {
    test('Then sorry no result should be render', async () => {
      render(
        <MockedProvider mocks={[charactersMockError]} addTypename={false}>
          <MemoryRouter>
            <Characters />
          </MemoryRouter>
        </MockedProvider>
      );

      expect(await screen.findByText(/sorry no results/i)).toBeInTheDocument();
    });
  });
  describe('When the info is loaded', () => {
    test('Then should render all the characters', async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <MemoryRouter>
            <Characters />
          </MemoryRouter>
        </MockedProvider>
      );

      expect(await screen.findByText(/ricky/i)).toBeInTheDocument();
      expect(await screen.findAllByRole('button')).toHaveLength(2);
    });
  });
  describe('When the next button is clicked', () => {
    test('Then the next page should load and prev button render', async () => {
      render(
        <MockedProvider mocks={mocks}>
          <MemoryRouter>
            <Characters />
          </MemoryRouter>
        </MockedProvider>
      );

      const buttonNext = await screen.findByText(/next/i);

      fireEvent.click(buttonNext);

      expect(await screen.findByText('moimoi')).toBeInTheDocument();

      const buttonPrev = await screen.findByText(/prev/i);

      fireEvent.click(buttonPrev);

      expect(await screen.findByText('bubba')).toBeInTheDocument();
    });
  });
  describe('Filling out the input text', () => {
    test('Then the data should be render', () => {
      render(
        <MockedProvider mocks={mocks}>
          <MemoryRouter>
            <Characters />
          </MemoryRouter>
        </MockedProvider>
      );
      expect(
        screen.getByPlaceholderText(/search your favorite character/i)
      ).toBeInTheDocument();

      const input = screen.getByPlaceholderText(
        /search your favorite character/i
      );

      fireEvent.change(input, { target: { value: 'morty' } });
    });
  });
});
