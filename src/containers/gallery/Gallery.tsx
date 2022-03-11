import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import { CharacterCard } from '../cardCharacter/CardCharacter';

interface GalleryPropsI {
  pageIndex: number;
  searchValue: string;
}
interface QueryVariableI {
  page: number;
  filter: {
    name: string;
  };
}
interface CharacterDataI {
  characters: {
    results: [{ id: string; name: string; image: string }];
  };
}
export const CHARACTERS_QUERY = gql`
  query CharactersQuery($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        image
      }
    }
  }
`;

export function Gallery({
  pageIndex,
  searchValue,
}: GalleryPropsI): JSX.Element {
  const { data, loading, error } = useQuery<CharacterDataI, QueryVariableI>(
    CHARACTERS_QUERY,
    {
      variables: { page: pageIndex, filter: { name: searchValue } },
    }
  );
  return (
    <>
      <h2>Characters</h2>
      {error && (
        <>
          <img src="assets/daco-sad.png" alt="daco-sad" height="300px" />
          <p>Sorry no results</p>
        </>
      )}
      {loading ? (
        <img src="assets/loading-rm.png" alt="loading" />
      ) : (
        <div>
          {data && (
            <ul>
              {data.characters.results.map((item) => (
                <Link to={`character/${item.id}`} key={item.id}>
                  <CharacterCard name={item.name} image={item.image} />
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
