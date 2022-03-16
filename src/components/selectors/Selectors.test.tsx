import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Selectors } from './Selectors';

describe('Given the selectors component', () => {
  describe('When gender is selected', () => {
    test('Then should return the matching data', async () => {
      const selectorsMock = {
        handleChange: jest.fn(),
        gender: 'Female',
        status: '',
      };

      render(
        <Selectors
          handleChange={selectorsMock.handleChange}
          gender={selectorsMock.gender}
          status={selectorsMock.status}
        />
      );

      expect(await screen.getByLabelText('Gender:')).toBeInTheDocument();

      fireEvent.change(await screen.getByLabelText('Gender:'), {
        target: { value: selectorsMock.gender },
      });
    });
  });
});
