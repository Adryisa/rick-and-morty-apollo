import React from 'react';

interface ButtonsPropsI {
  nextPage: () => void;
  prevPage: () => void;
  currentPage: number;
}

export function Buttons({
  nextPage,
  prevPage,
  currentPage,
}: ButtonsPropsI): JSX.Element {
  return (
    <div>
      {currentPage > 1 && (
        <button type="button" onClick={prevPage}>
          PREVIOUS
        </button>
      )}
      {currentPage && (
        <button type="button" onClick={nextPage}>
          NEXT
        </button>
      )}
    </div>
  );
}
