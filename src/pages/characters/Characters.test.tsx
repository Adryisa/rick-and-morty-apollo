import React from 'react';
import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { CHARACTERS_QUERY } from '../../containers/gallery/Gallery';
import { Characters } from './Characters';

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
];

describe('Given the characters component', () => {
  describe('When the info is loaded', () => {
    test('Then should render all the characters', async () => {
      render(
        <MockedProvider mocks={mocks}>
          <MemoryRouter>
            <Characters />
          </MemoryRouter>
        </MockedProvider>
      );
      expect(await screen.findByText(/ricky/i)).toBeInTheDocument();
    });
  });
});
