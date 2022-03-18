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
    <div className="flex flex-col w-[300px]">
      <p className="text-pink-100">{name}</p>
      <img src={image} alt={`${name}`} />
    </div>
  );
}
