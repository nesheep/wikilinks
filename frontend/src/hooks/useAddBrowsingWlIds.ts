import { useRecoilCallback } from 'recoil';

import { browsingWlIdsAtom } from '../states/atoms';
import { WikiLinks } from '../types/wiki';

type AddBrosingWlIds = (wikiLinks: WikiLinks) => void;

const useAddBrowsingWlIds = (): AddBrosingWlIds =>
  useRecoilCallback(({ set }) => (wikiLinks) => {
    if (wikiLinks.next) {
      set(browsingWlIdsAtom, (prev) => [...prev, `${wikiLinks.title}||||${wikiLinks.next}`]);
    }
  });

export default useAddBrowsingWlIds;
