import React from 'react';

export function SearchBar({ handleChange, searchValue }): JSX.Element {
  return (
    <div>
      <form className="flex justify-center p-2">
        <input
          className="bg-transparent text-pink-100 border border-pink-100 rounded-md p-2 w-64 flex"
          type="text"
          placeholder="Search your favorite character"
          onChange={handleChange}
          value={searchValue}
          name="name"
        />
      </form>
    </div>
  );
}
