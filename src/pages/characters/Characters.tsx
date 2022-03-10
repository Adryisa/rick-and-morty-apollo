import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Buttons } from '../../components/buttons/Buttons';

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
      {error && <p>Error: data not found</p>}
      <h2>Characters</h2>
      <Buttons
        nextPage={nextPage}
        prevPage={prevPage}
        topPage={data?.characters.info.pages}
        currentPage={pageIndex}
      />
      <ul />
    </div>
  );
}
