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
    <div className="flex gap-12 justify-center">
      {currentPage > 1 && (
        <button
          type="button"
          onClick={prevPage}
          className="bg-pink-100 w-16 rounded-lg font-normal text-slate-900"
        >
          PREV
        </button>
      )}
      {currentPage < maxPage && (
        <button
          type="button"
          onClick={nextPage}
          className="bg-pink-100 w-16 rounded-lg font-normal text-slate-900"
        >
          NEXT
        </button>
      )}
    </div>
  );
}
