import { Wiki, WikiLinks } from "../types/wiki";

const buildWikiUrl = (params: { [key: string]: string }): string => {
  const u = new URL('https://ja.wikipedia.org/w/api.php');
  params['action'] = 'query';
  params['format'] = 'json';
  params['origin'] = '*';
  Object.keys(params).forEach(k => u.searchParams.set(k, params[k]));
  return u.toString();
};

export const fetchWiki = async (id: string): Promise<Wiki> => {
  const wiki: Wiki = { id, title: '' };

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
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

    const data = await res.json();
    const page = data.query.pages[id];
    if (wiki.title) page.title = wiki.title;
    if (page.extract) wiki.extract = page.extract;
    if (page.original) wiki.image = page.original.source;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }

  return wiki;
};

export const fetchWikiLinks = async (id: string): Promise<WikiLinks> => {
  const titleContinue = id.split('||||');
  const title = titleContinue[0];
  const gplcontinue = titleContinue.length > 1 ? titleContinue[1] : '';

  const wikiLinks: WikiLinks = { id, title, items: [] };

  const url = buildWikiUrl({
    titles: title,
    generator: 'links',
    gplnamespace: '0',
    gpllimit: '25',
    ...(gplcontinue ? { gplcontinue } : null),
  });

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

    const data = await res.json();
    if (!data.query) throw new Error(`no result "${title}"`);

    const pages = data.query.pages;
    Object.keys(pages).forEach(k => {
      const page = pages[k];
      if (!page.missing) wikiLinks.items.push({ id: k, title: page.title });
    });

    if (data.continue) wikiLinks.next = data.continue.gplcontinue;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }

  return wikiLinks;
};
