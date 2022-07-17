import { Wiki } from "../types/wiki";

const buildWikiUrl = (params: { [key: string]: string }): string => {
  const u = new URL('https://ja.wikipedia.org/w/api.php');
  params['action'] = 'query';
  params['format'] = 'json';
  params['origin'] = '*';
  Object.keys(params).forEach(k => u.searchParams.set(k, params[k]));
  return u.toString();
};

export const fetchWiki = async (id: string): Promise<Wiki> => {
  const wiki: Wiki = { id: '', title: '' };

  const url = buildWikiUrl({
    prop: ['extracts', 'pageimages'].join('|'),
    pageids: id,
    exsentences: '10',
    exintro: '1',
    explaintext: '1',
    piprop: 'original',
  });

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    const page = data.query.pages[id];
    wiki.title = page.title ? page.title : '';
    if (page.extract) wiki.extract = page.extract;
    if (page.original) wiki.image = page.original.source;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }

  return wiki;
};
