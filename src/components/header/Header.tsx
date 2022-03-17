import React from 'react';
import { Link } from 'react-router-dom';

export function Header(): JSX.Element {
  return (
    <div className="flex p-2">
      <h1 className="hidden">Rick and Morty ft. GraphQL</h1>
      <Link to="/">
        <img src="/assets/rm.png" alt="rick-and-morty" className="w-16" />
      </Link>
    </div>
  );
}
