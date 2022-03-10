import React from 'react';

interface ButtonsPropsI {
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
  topPage: number;
}

export function Buttons({
  nextPage,
  prevPage,
  currentPage,
  topPage,
}: ButtonsPropsI): JSX.Element {
  return (
    <div>
      {currentPage > 1 && (
        <button type="button" onClick={prevPage}>
          PREVIOUS
        </button>
      )}
      {currentPage > topPage && (
        <button type="button" onClick={nextPage}>
          NEXT
        </button>
      )}
    </div>
  );
}
