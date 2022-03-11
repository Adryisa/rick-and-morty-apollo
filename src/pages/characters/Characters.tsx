import React from 'react';
import { useQuery, gql } from '@apollo/client';

interface CharacterPagesDataI {
  characters: {
    info:
      | {
          count: number | null;
          pages: number | null;
          next: number | null;
          prev: number | null;
        }
      | undefined;
  };
}

interface CharacterDataI {
  characters: {
    results: [
      | {
          id: string;
          name: string;
          image: string;
        }
      | undefined
    ];
  };
}

const CHARACTER_PAGES_QUERY = gql`
  query CharacterPagesQuery($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
        next
        prev
      }
    }
  }
`;

const CHARACTER_DATA_QUERY = gql`
  query CharacterDataQuery($filter: FilterCharacter) {
    characters(filter: $filter) {
      results {
        id
        image
        name
      }
    }
  }
`;

export function Characters(): JSX.Element {
  return <div>Characters</div>;
}
