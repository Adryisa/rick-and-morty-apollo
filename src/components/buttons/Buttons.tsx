import React from 'react';

interface ButtonsPropsI {
  nextPage: () => void;
  prevPage: () => void;
  prev: number | null | undefined;
  next: number | null | undefined;
}

export function Buttons({
  nextPage,
  prevPage,
  prev,
  next,
}: ButtonsPropsI): JSX.Element {
  return (
    <div>
      {prev && (
        <button type="button" onClick={prevPage}>
          PREV
        </button>
      )}
      {next && (
        <button type="button" onClick={nextPage}>
          NEXT
        </button>
      )}
    </div>
  );
}
