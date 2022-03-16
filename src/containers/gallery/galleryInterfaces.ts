export interface GalleryPropsI {
  pageIndex: number;
  name: string;
  gender: string;
  status;
  setContentLoading: (loading: boolean) => void;
}

export interface QueryVariableI {
  page: number;
  filter: {
    name: string;
    gender: string;
    status: string;
  };
}

export interface CharacterDataI {
  characters: {
    results: [{ id: string; name: string; image: string }];
  };
}
