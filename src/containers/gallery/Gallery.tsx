import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './gallery.scss';
import { CharacterCard } from '../cardCharacter/CardCharacter';
import {
  CharacterDataI,
  GalleryPropsI,
  QueryVariableI,
} from './galleryInterfaces';

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
  name,
  gender,
  status,
  setContentLoading,
}: GalleryPropsI): JSX.Element {
  const [sortedData, setSortedData] = useState<CharacterDataI>(undefined);
  const { data, loading, error } = useQuery<CharacterDataI, QueryVariableI>(
    CHARACTERS_QUERY,
    {
      variables: { page: pageIndex, filter: { name, gender, status } },
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
    <div>
      <div className="flex justify-end p-2 mr-5">
        <button
          type="button"
          onClick={handleSort}
          className="bg-pink-100 w-32 rounded-lg font-normal text-slate-900"
        >
          Order by name
        </button>
      </div>

      {loading && (
        <img src="assets/loading-rm.png" alt="loading" className="spinning" />
      )}
      <div className="">
        {error ? (
          <div className="flex justify-center gap-8 p-3">
            <img
              src="assets/daco-sad.png"
              alt="daco-sad"
              className="max-w-full h-80"
            />
            <p className="text-2xl text-rose-100 self-center">
              Sorry no results :(
            </p>
          </div>
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
      </div>
    </div>
  );
}
