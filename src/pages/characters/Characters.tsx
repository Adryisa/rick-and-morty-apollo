import React from 'react';
import { useQuery, gql } from '@apollo/client';

interface CharacterDataI {
  characters: {
    info: {
      pages: number;
      next: number;
      prev: number;
    };
    results: [
      {
        id: string;
        name: string;
        image: string;
      }
    ];
  };
}
const CHARACTER_DATA_QUERY = gql`
  query CharacterdDataQuery($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        pages
        next
        prev
      }
      results {
        id
        name
        image
      }
    }
  }
`;

export function Characters(): JSX.Element {
  return <div>holi soy lista de personajes</div>;
}
