import React, { SyntheticEvent, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Buttons } from '../../components/buttons/Buttons';
import { Gallery } from '../../containers/gallery/Gallery';
import { SearchBar } from '../../components/searchBar/searchBar';

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
  const [searchValue, setSearchValue] = useState({ name: '' });
  const [contentLoading, setContentLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const { data } = useQuery<
    CharactersPagesAmountQueryI,
    CharactersPageAmountQueryVariablesI
  >(CHARACTERS_PAGES_AMOUNT_QUERY, {
    variables: { filter: { name: searchValue.name } },
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
      <Buttons
        nextPage={nextPage}
        prevPage={prevPage}
        currentPage={pageIndex}
        maxPage={data?.characters?.info.pages}
      />
      <Gallery
        pageIndex={pageIndex}
        searchValue={searchValue.name}
        setContentLoading={setContentLoading}
      />
    </div>
  );
}
