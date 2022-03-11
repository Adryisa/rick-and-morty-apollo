import React from 'react';

export function SearchBar({ handleChange, searchValue }): JSX.Element {
  return (
    <div>
      <form>
        <input
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
