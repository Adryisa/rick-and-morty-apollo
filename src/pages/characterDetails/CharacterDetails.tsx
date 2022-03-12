import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const CHARACTER_DETAILS_QUERY = gql`
  query CharacterDetailsQuery($characterId: ID!) {
    character(id: $characterId) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
        type
        dimension
      }
      image
      created
    }
  }
`;

export function CharacterDetails(): JSX.Element {
  const { id } = useParams();

  return <div>Holi soy detalles</div>;
}
