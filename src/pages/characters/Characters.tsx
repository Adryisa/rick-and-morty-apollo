/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Buttons } from '../../components/buttons/Buttons';
import { CharacterCard } from '../../components/cardCharacter/CardCharacter';

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
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const { data, loading, error } = useQuery<CharacterDataI>(
    CHARACTER_DATA_QUERY,
    {
      variables: {
        page: pageIndex,
        filter: { name: searchValue, gender: searchValue },
      },
    }
  );

  const handleSearch = (e: SyntheticEvent): void => {
    const searchInput = (e.target as HTMLInputElement).value;
    setInputValue(searchInput);
    setSearchValue(searchInput);
  };

  const nextPage = (): void => {
    setPageIndex(pageIndex + 1);
  };

  const prevPage = (): void => {
    setPageIndex(pageIndex - 1);
  };

  // useEffect(() => {
  //   setInputValue('');
  //   setSearchValue('');
  // }, [setSearchValue]);

  return (
    <div>
      <h2>Characters</h2>
      <form>
        <input
          type="text"
          placeholder="Search your favorite character"
          onChange={handleSearch}
          value={inputValue}
        />
      </form>
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
          <Buttons
            nextPage={nextPage}
            prevPage={prevPage}
            currentPage={pageIndex}
          />
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
    </div>
  );
}
