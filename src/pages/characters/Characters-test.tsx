/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Buttons } from '../../components/buttons/Buttons';
import { CharacterCard } from '../../containers/cardCharacter/CardCharacter';

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

interface CharacterDataInfoI {
  characters: {
    results: [
      {
        id: string;
        name: string;
        image: string;
      }
    ];
  };
}

interface CharacterPageDataI {
  characters: {
    info: {
      pages: number;
      next: number;
      prev: number;
    };
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

export function CharactersTest(): JSX.Element {
  const [formState, setFormState] = useState({ name: '', gender: 'female' });
  const [data2, setData2] = useState<CharacterDataI | undefined>(undefined);

  const [pageIndex, setPageIndex] = useState<number>(1);

  const handleChange = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    setFormState({ ...formState, [target.name]: target.value });
  };

  const { data, loading, error } = useQuery<CharacterDataI>(
    CHARACTER_DATA_QUERY,
    {
      variables: {
        page: pageIndex,
        filter: { name: formState.name, gender: formState.gender },
      },
    }
  );

  useEffect(() => {
    if (data) {
      setData2(JSON.parse(JSON.stringify(data)));
    }
  }, [data]);

  const nextPage = (): void => {
    if ((data?.characters.info.pages as number) > pageIndex) {
      setPageIndex(data?.characters.info.next as number);
    }
  };

  const prevPage = (): void => {
    if ((data?.characters.info.pages as number) > 2) {
      setPageIndex(data?.characters.info.prev as number);
    }
  };

  const handleSort = () => {
    setData2({
      characters: {
        info: data2?.characters.info as any,
        results: data2?.characters.results.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        }) as any,
      },
    });
  };

  return (
    <div>
      <h2>Characters</h2>
      <form>
        <button
          type="button"
          onClick={() => {
            handleSort();
          }}
        >
          SORT
        </button>
        <input
          type="text"
          placeholder="Search your favorite character"
          onChange={handleChange}
          value={formState.name}
          name="name"
        />
      </form>
      <label htmlFor="gender">Gender: </label>
      <select
        name="gender"
        id="gender"
        onChange={handleChange}
        value={formState.gender}
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {error && (
        <>
          <img src="assets/daco-sad.png" alt="daco-sad" height="300px" />
          <p>Sorry no results</p>
        </>
      )}
      {/* {loading ? (
        <img src="assets/loading-rm.png" alt="loading" />
      ) : (
        <div>
          <Buttons />
          {data2 && (
            <ul>
              {data2.characters.results.map((item) => (
                <Link to={`character/${item.id}`} key={item.id}>
                  <CharacterCard name={item.name} image={item.image} />
                </Link>
              ))}
            </ul>
          )}
        </div>
      )} */}
    </div>
  );
}
