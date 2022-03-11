import React from 'react';

interface CharacterDetailsPropsI {
  name: string | undefined;
  image: string | undefined;
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
