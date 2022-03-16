import React from 'react';
import { render, screen } from '@testing-library/react';
import { CharacterCard } from './CardCharacter';

describe('Given the card character component', () => {
  describe('When it render', () => {
    test('Then the character info should be in the component', () => {
      const mockProps = {
        name: 'ricky-test',
        image: 'test-image.jpg',
      };
      render(<CharacterCard name={mockProps.name} image={mockProps.image} />);

      expect(screen.getByText(/ricky-test/i)).toBeInTheDocument();
    });
  });
});
