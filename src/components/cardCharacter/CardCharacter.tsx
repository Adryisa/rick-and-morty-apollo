import React from 'react';

interface CharacterDetailsPropsI {
  name: string;
  image: string;
}

export function CharacterCard({
  name,
  image,
}: CharacterDetailsPropsI): JSX.Element {
  return (
    <>
      <li>{name}</li>
      <img src={image} alt="" />
    </>
  );
}
