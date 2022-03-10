import React from 'react';

interface CharacterDetailsPropsI {
  name: string;
  image: string;
}

export function CharacterDetails({
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
