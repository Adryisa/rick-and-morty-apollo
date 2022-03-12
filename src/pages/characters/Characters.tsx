/* eslint-disable react/no-array-index-key */
import React, { SyntheticEvent, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Buttons } from '../../components/buttons/Buttons';
import { Gallery } from '../../containers/gallery/Gallery';
import { SearchBar } from '../../components/searchBar/searchBar';
import { GENDER, STATUS } from '../../data/constants';

interface CharactersPagesAmountQueryI {
  characters: {
    info: {
      pages: number;
      next: number;
      prev: number;
    };
  };
}

interface CharactersPageAmountQueryVariablesI {
  filter: {
    name: string;
    gender: string;
    status: string;
  };
}

export const CHARACTERS_PAGES_AMOUNT_QUERY = gql`
  query charactersPagesAmountQuery($filter: FilterCharacter) {
    characters(filter: $filter) {
      info {
        pages
      }
    }
  }
`;

export function Characters(): JSX.Element {
  const [searchValue, setSearchValue] = useState({
    name: '',
    gender: '',
    status: '',
  });
  const [contentLoading, setContentLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const { data } = useQuery<
    CharactersPagesAmountQueryI,
    CharactersPageAmountQueryVariablesI
  >(CHARACTERS_PAGES_AMOUNT_QUERY, {
    variables: {
      filter: {
        name: searchValue.name,
        gender: searchValue.gender,
        status: searchValue.status,
      },
    },
  });

  const handleChange = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    setSearchValue({ ...searchValue, [target.name]: target.value });
  };

  const nextPage = (): void => {
    setPageIndex(pageIndex + 1);
  };

  const prevPage = (): void => {
    setPageIndex(pageIndex - 1);
  };

  return (
    <div>
      <h2>Characters</h2>
      <SearchBar handleChange={handleChange} searchValue={searchValue.name} />
      <label htmlFor="gender">
        <p>Gender:</p>
        <select
          name="gender"
          id="gender"
          onChange={handleChange}
          value={searchValue.gender}
        >
          {GENDER.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="status">
        <select
          name="status"
          id="status"
          onChange={handleChange}
          value={searchValue.status}
        >
          {STATUS.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      {data && !contentLoading && (
        <Buttons
          nextPage={nextPage}
          prevPage={prevPage}
          currentPage={pageIndex}
          maxPage={data?.characters?.info.pages}
        />
      )}
      <Gallery
        pageIndex={pageIndex}
        name={searchValue.name}
        gender={searchValue.gender}
        status={searchValue.status}
        setContentLoading={setContentLoading}
      />
    </div>
  );
}
