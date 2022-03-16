import React from 'react';
import { screen, render, prettyDOM } from '@testing-library/react';
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
      console.log(await prettyDOM());
    });
  });
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
});
