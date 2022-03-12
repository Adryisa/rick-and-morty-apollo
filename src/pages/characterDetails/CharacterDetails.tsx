/* eslint-disable indent */
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

export function CharacterDetail(): JSX.Element {
  const { id } = useParams();

  const { loading, error, data } = useQuery<
    CharactersDetailsI,
    CharacterDetailsVariableI
  >(CHARACTER_DETAILS_QUERY, {
    variables: { characterId: id },
  });

  return (
    <div>
      {error && <p>Error :(</p>}
      {loading && <p>Loading...</p>}
      {data && (
        <div className="w-8/12">
          <h2 className="font-bold text-4xl text-center mb-5">
            {data.character.name}
          </h2>
          <div>
            <img src={data.character.image} alt={data.character.name} />
            <div>
              {data.character.status && (
                <p>
                  <strong>Status:</strong> {data.character.status}
                </p>
              )}
              {data.character.species && (
                <p>
                  <strong>Species:</strong> {data.character.species}
                </p>
              )}
              {data.character.gender && (
                <p>
                  <strong>Gender:</strong> {data.character.gender}
                </p>
              )}
              {data.character.type && (
                <p>
                  <strong>Type:</strong> {data.character.type}
                </p>
              )}
              {data.character.origin.name &&
                data.character.origin.name !== 'unknown' && (
                  <p>
                    <strong>Origin: </strong>
                    {data.character.origin.name}
                  </p>
                )}
              {data.character.location.name &&
                data.character.location.name !== 'unknown' && (
                  <p>
                    <strong>Location:</strong>
                    {data.character.location.name}
                  </p>
                )}
            </div>
          </div>
          <h4>
            <strong>Episodes:</strong>
          </h4>
          <div>
            {data.character.episode.map((episode) => (
              <p key={episode.id}>{episode.name}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
