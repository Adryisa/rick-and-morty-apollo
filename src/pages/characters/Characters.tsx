import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Buttons } from '../../components/buttons/Buttons';
import { Gallery } from '../../containers/gallery/Gallery';

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
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState<number>(1);

  const { data } = useQuery<
    CharactersPagesAmountQueryI,
    CharactersPageAmountQueryVariablesI
  >(CHARACTERS_PAGES_AMOUNT_QUERY, {
    variables: { filter: { name: searchValue } },
  });

  const nextPage = (): void => {
    setPageIndex(pageIndex + 1);
  };

  const prevPage = (): void => {
    setPageIndex(pageIndex - 1);
  };
  return (
    <div>
      {data && (
        <>
          <Buttons
            nextPage={nextPage}
            prevPage={prevPage}
            prev={data?.characters.info.prev}
            next={data?.characters.info.next}
          />
          <Gallery pageIndex={pageIndex} searchValue={searchValue} />
          <Buttons
            nextPage={nextPage}
            prevPage={prevPage}
            prev={data?.characters.info.prev}
            next={data?.characters.info.next}
          />
        </>
      )}
    </div>
  );
}
