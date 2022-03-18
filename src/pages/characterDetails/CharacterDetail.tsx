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
    <div className="text-white flex justify-center p-2">
      {error && <p className="text-center text-4xl">Error :(</p>}
      {loading && (
        <img src="/assets/loading-rm.png" alt="loading" className="spinning" />
      )}

      {data && (
        <div className="w-2/3">
          <h2 className="text-pink-300 font-bold text-2xl text-center mb-4">
            {data.character.name}
          </h2>
          <div className="flex w-full align-center gap-8">
            <img
              src={data.character.image}
              alt={data.character.name}
              className="rounded-md"
            />
            <div className="text-lg flex justify-center flex-col">
              {data.character.status && (
                <p>
                  <strong className="text-pink-300">Status: </strong>
                  {data.character.status}
                </p>
              )}
              {data.character.species && (
                <p>
                  <strong className="text-pink-300">Species: </strong>
                  {data.character.species}
                </p>
              )}
              {data.character.gender && (
                <p>
                  <strong className="text-pink-300">Gender: </strong>
                  {data.character.gender}
                </p>
              )}
              {data.character.type && (
                <p>
                  <strong className="text-pink-300">Type: </strong>
                  {data.character.type}
                </p>
              )}
              {data.character.origin.name &&
                data.character.origin.name !== 'unknown' && (
                  <p>
                    <strong className="text-pink-300">Origin: </strong>
                    {data.character.origin.name}
                  </p>
                )}
              {data.character.location.name &&
                data.character.location.name !== 'unknown' && (
                  <p>
                    <strong className="text-pink-300">Location: </strong>
                    {data.character.location.name}
                  </p>
                )}
            </div>
          </div>
          <h4 className="text-center text-2xl mt-2">
            <strong className="text-pink-300">Episodes: </strong>
          </h4>
          <ul className="flex gap-5 flex-wrap justify-center mt-2 ">
            {data.character.episode.map((episode) => (
              <li key={episode.id} className="list-disc">
                {episode.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
