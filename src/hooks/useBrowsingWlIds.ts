import { useRecoilValue } from 'recoil';

import { browsingWlIdsAtom } from '../states/atoms';

const useBrowsingWlIds = (): string[] => {
  const browsingWlIds = useRecoilValue(browsingWlIdsAtom);
  return browsingWlIds;
};

export default useBrowsingWlIds;
