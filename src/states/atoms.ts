import { atomFamily } from 'recoil';

import { ATOM } from './keys';
import { Wiki } from '../types/wiki';

export const wikiAtom = atomFamily<Wiki | null, string>({
  key: ATOM.WIKI,
  default: null,
});
