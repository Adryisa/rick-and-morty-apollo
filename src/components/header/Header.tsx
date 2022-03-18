import React from 'react';
import { Link } from 'react-router-dom';

export function Header(): JSX.Element {
  return (
    <div className="flex p-4 justify-between">
      <Link to="/" className="hover:scale-110">
        <img src="/assets/rm.png" alt="rick-and-morty" className="w-16" />
      </Link>
      <div className="flex justify-center w-[90%] align-middle">
        <h1 className="text-white text-4xl mr-40 self-center">
          Rick and Morty
        </h1>
      </div>
    </div>
  );
}
