import { selectorFamily } from 'recoil';

import { wikiAtom, wikiLinksAtom } from './atoms';
import { SELECTOR } from './keys';
import { fetchWiki, fetchWikiLinks } from '../lib/wikiApi';
import { Wiki, WikiLinks } from '../types/wiki';

export const wikiSelector = selectorFamily<Wiki, string>({
  key: SELECTOR.WIKI,
  get: id => async ({ get }) => get(wikiAtom(id)) || await fetchWiki(id),
});

export const wikiLinksSelector = selectorFamily<WikiLinks, string>({
  key: SELECTOR.WIKI_LINKS,
  get: id => async ({ get }) => get(wikiLinksAtom(id)) || await fetchWikiLinks(id),
});
