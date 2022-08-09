import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { browsingWlIdsAtom } from '../states/atoms';

type Search = (word: string) => void;

const useSearch = (): Search => {
  const set = useSetRecoilState(browsingWlIdsAtom);
  return useCallback((word) => set([`${word}||||`]), [set]);
};

export default useSearch;
