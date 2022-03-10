import React from 'react';
import { Link } from 'react-router-dom';

export function NavLinks(): JSX.Element {
  return (
    <nav>
      <ul>
        <Link to="/*">
          <li>Characters</li>
        </Link>
        <Link to="/episodes/*">
          <li>Episodes</li>
        </Link>
        <Link to="/locations/*">
          <li>Locations</li>
        </Link>
      </ul>
    </nav>
  );
}
