import React from 'react';
import { Link } from 'react-router-dom';

export function Header(): JSX.Element {
  return (
    <div>
      <h1>Rick and Morty ft. GraphQL</h1>
      <Link to="/">
        <img src="/assets/rm.png" alt="rick-and-morty" />
      </Link>
    </div>
  );
}
