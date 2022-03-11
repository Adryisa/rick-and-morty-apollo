import React from 'react';
import { useQuery, gql } from '@apollo/client';

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
