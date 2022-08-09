import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { wikiLinksAtom } from '../states/atoms';
import { wikiLinksSelector } from '../states/selectors';
import { WikiLinks } from '../types/wiki';

const useWikiLinks = (id: string): WikiLinks => {
  const wikiLinks = useRecoilValue(wikiLinksSelector(id));
  const set = useSetRecoilState(wikiLinksAtom(id));

  useEffect(() => {
    if (wikiLinks) set(wikiLinks);
  }, [id, wikiLinks, set]);

  return wikiLinks;
};

export default useWikiLinks;
