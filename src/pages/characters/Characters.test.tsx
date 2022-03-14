import React from 'react';
import { screen, render } from '@testing-library/react';
import { CHARACTERS_QUERY } from '../../containers/gallery/Gallery';

const mocks = [
  {
    request: CHARACTERS_QUERY,
    variables: {
      page: 1,
      filter: {
        name: '',
        gender: '',
        status: '',
      },
    },
    result: {
      data: {
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
];
