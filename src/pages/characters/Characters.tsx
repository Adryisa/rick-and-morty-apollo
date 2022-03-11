import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { CharacterCard } from '../../components/cardCharacter/CardCharacter';

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
  const { data: pagesData } = useQuery<CharacterPagesDataI>(
    CHARACTER_PAGES_QUERY
  );

  const {
    data: charactersData,
    loading: characterLoading,
    error: characterError,
  } = useQuery<CharacterDataI>(CHARACTER_DATA_QUERY);

  return (
    <div>
      <h2>Characters</h2>
      {characterError && (
        <>
          <img src="assets/daco-sad.png" alt="daco-sad" height="300px" />
          <p>Sorry no results</p>
        </>
      )}
      <button type="button">MORE</button>
      <button type="button">LESS</button>
      {characterLoading ? (
        <img src="assets/loading-rm.png" alt="loading" />
      ) : (
        <div>
          {charactersData?.characters.results.map((item) => (
            <Link to={`character/${item?.id}`} key={item?.id}>
              <CharacterCard name={item?.name} image={item?.image} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
