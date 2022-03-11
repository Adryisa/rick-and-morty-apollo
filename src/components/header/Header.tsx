import React from 'react';
import { Link } from 'react-router-dom';
import { NavLinks } from '../navLinks/NavLinks';

export function Header(): JSX.Element {
  return (
    <div>
      <h1>Rick and Morty ft. GraphQL</h1>
      <Link to="/">
        <img src="/assets/rm.png" alt="" height="80px" />
      </Link>
      <NavLinks />
    </div>
  );
}
