import React from 'react';
import { useQuery, gql } from '@apollo/client';

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
