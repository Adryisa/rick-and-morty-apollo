import React from 'react';

interface ButtonsPropsI {
  nextPage: () => void;
  prevPage: () => void;
  maxPage: number | null | undefined;
  currentPage: number;
}

export function Buttons({
  nextPage,
  prevPage,
  maxPage,
  currentPage,
}: ButtonsPropsI): JSX.Element {
  return (
    <div>
      {currentPage > 1 && (
        <button type="button" onClick={prevPage}>
          PREV
        </button>
      )}
      {currentPage < maxPage && (
        <button type="button" onClick={nextPage}>
          NEXT
        </button>
      )}
    </div>
  );
}
