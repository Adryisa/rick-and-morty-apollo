export interface CharactersPagesAmountQueryI {
  characters: {
    info: {
      pages: number;
      next: number;
      prev: number;
    };
  };
}

export interface CharactersPageAmountQueryVariablesI {
  filter: {
    name: string;
    gender: string;
    status: string;
  };
}
