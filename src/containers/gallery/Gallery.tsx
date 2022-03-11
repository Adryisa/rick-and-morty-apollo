import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CharacterCard } from '../cardCharacter/CardCharacter';

interface GalleryPropsI {
  pageIndex: number;
  searchValue: string;
  setContentLoading: (loading: boolean) => void;
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
  setContentLoading,
}: GalleryPropsI): JSX.Element {
  const [sortedData, setSortedData] = useState<CharacterDataI>(undefined);
  const { data, loading, error } = useQuery<CharacterDataI, QueryVariableI>(
    CHARACTERS_QUERY,
    {
      variables: { page: pageIndex, filter: { name: searchValue } },
    }
  );

  useEffect(() => {
    if (data) {
      setSortedData(JSON.parse(JSON.stringify(data)));
    }
  }, [data]);

  const handleSort = (): void => {
    setSortedData({
      characters: {
        results: sortedData.characters.results.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        }),
      },
    });
  };

  useEffect(
    () => (loading ? setContentLoading(true) : setContentLoading(false)),
    [loading, setContentLoading]
  );
  return (
    <>
      <button type="button" onClick={handleSort}>
        SORT
      </button>
      {loading ? (
        <img src="assets/loading-rm.png" alt="loading" />
      ) : (
        <div>
          {sortedData && (
            <ul>
              {sortedData.characters.results.map((item) => (
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
