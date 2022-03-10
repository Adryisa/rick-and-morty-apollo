import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Buttons } from '../../components/buttons/Buttons';
import { CharacterDetails } from '../characterDetails/CharacterDetails';

interface CharacterDataI {
  characters: {
    info: {
      pages: number;
      next: number;
      prev: number;
    };
    results: [
      {
        id: string;
        name: string;
        image: string;
      }
    ];
  };
}
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
  const [pageIndex, setPageIndex] = useState(1);
  const { data, loading, error } = useQuery<CharacterDataI>(
    CHARACTER_DATA_QUERY,
    {
      variables: { page: pageIndex },
    }
  );

  const nextPage = (): void => {
    setPageIndex(pageIndex + 1);
  };

  const prevPage = (): void => {
    setPageIndex(pageIndex - 1);
  };

  return (
    <div>
      <h2>Characters</h2>
      {error && <p>Error: data not found</p>}
      <Buttons
        nextPage={nextPage}
        prevPage={prevPage}
        currentPage={pageIndex}
      />
      {loading ? (
        <img src="/public/assets/loading-rm.png" alt="loading" />
      ) : (
        <div>
          {data && (
            <ul>
              {data.characters.results.map((item) => (
                <Link to={`character/${item.id}`}>
                  <CharacterDetails
                    key={item.id}
                    name={item.name}
                    image={item.image}
                  />
                </Link>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
