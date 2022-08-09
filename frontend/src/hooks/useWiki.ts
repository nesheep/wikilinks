import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { wikiAtom } from '../states/atoms';
import { wikiSelector } from '../states/selectors';
import { Wiki } from '../types/wiki';

const useWiki = (id: string): Wiki => {
  const wiki = useRecoilValue(wikiSelector(id));
  const set = useSetRecoilState(wikiAtom(id));

  useEffect(() => {
    if (wiki) set(wiki);
  }, [id, wiki, set]);

  return wiki;
};

export default useWiki;
