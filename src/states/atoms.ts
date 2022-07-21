import { atom, atomFamily } from 'recoil';

import { ATOM } from './keys';
import { Wiki, WikiLinks } from '../types/wiki';

export const wikiAtom = atomFamily<Wiki | null, string>({
  key: ATOM.WIKI,
  default: null,
});

export const wikiLinksAtom = atomFamily<WikiLinks | null, string>({
  key: ATOM.WIKI_LINKS,
  default: null,
});

export const browsingWlIdsAtom = atom<string[]>({
  key: ATOM.BROWSING_WL_IDS,
  default: [],
});
