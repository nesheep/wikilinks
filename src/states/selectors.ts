import { selectorFamily } from 'recoil';

import { wikiAtom } from './atoms';
import { SELECTOR } from './keys';
import { fetchWiki } from '../lib/wikiApi';
import { Wiki } from '../types/wiki';

export const wikiSelector = selectorFamily<Wiki, string>({
  key: SELECTOR.WIKI,
  get: id => async ({ get }) => get(wikiAtom(id)) || await fetchWiki(id),
});
