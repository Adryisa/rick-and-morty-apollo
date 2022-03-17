import React from 'react';

export function SearchBar({ handleChange, searchValue }): JSX.Element {
  return (
    <div>
      <form>
        <input
          className="bg-transparent text-white border border-white rounded-md p-3"
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
