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
    <div className="w-80 gap-6 flex flex-col border-[1px] border-pink-200 rounded-md bg-black hover:scale-105 hover:shadow-pink-200 hover:shadow-lg transition-all">
      <p className="text-white text-center mt-1">{name}</p>
      <img src={image} alt={`${name}`} />
    </div>
  );
}
