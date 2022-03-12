import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

export const CHARACTER_DETAILS_QUERY = gql`
  query CharacterDetailsQuery($characterId: ID!) {
    character(id: $characterId) {
      name
      status
      species
      type
      gender
      origin {
        id
        name
      }
      location {
        id
        name
      }
      image
      episode {
        id
        name
      }
    }
  }
`;

export interface CharactersDetailsI {
  character: {
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      id: string;
      name: string;
    };
    location: {
      id: string;
      name: string;
    };
    image: string;
    episode: {
      id: string;
      name: string;
    }[];
  };
}

interface CharacterDetailsVariableI {
  characterId?: string;
}
export function CharacterDetails(): JSX.Element {
  const { id } = useParams();

  const { data, loading, error } = useQuery<CharactersDetailsI>(
    CHARACTER_DETAILS_QUERY,
    {
      variables: { characterId: id },
    }
  );

  return (
    <div>
      {data && (
        <ul>
          <img src={data.character.image} alt={data.character.name} />
          <li>{data.character.name}</li>
          <li>Vive en: {data.character.origin.name}</li>
          <li>{data.character.origin.type}</li>
          <li>{data.character.origin.dimension}</li>
          <li>{data.character.species}</li>
          <li>{data.character.status}</li>
          <li>{data.character.gender}</li>
        </ul>
      )}
    </div>
  );
}
