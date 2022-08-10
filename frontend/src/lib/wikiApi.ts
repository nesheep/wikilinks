import axios from 'axios';

import { Wiki, WikiLinks } from "../types/wiki";

const ENV = process.env.REACT_APP_ENV || '';
const API_URL = `${ENV === 'dev' ? 'http://localhost:18080' : window.location.origin}/api/wikis`;

export const fetchWiki = async (id: string): Promise<Wiki> => {
  try {
    const { data } = await axios.get<Wiki>(`${API_URL}/${encodeURIComponent(id)}`);
    return data;
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    return { id, title: '' };
  }
};

export const fetchWikiLinks = async (id: string): Promise<WikiLinks> => {
  try {
    const { data } = await axios.get<WikiLinks>(`${API_URL}?id=${encodeURIComponent(id)}`);
    return data;
  } catch (error) {
    if (error instanceof Error) console.error(error.message)
    return { id, title: '', items: [] };
  }
};
