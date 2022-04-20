import superagent from 'superagent';
import { api } from '../next.config';

export async function getPage(pageId) {
  const resp = await superagent.get(`${api.HOST}/api/content`).query({ id: pageId });
  const page = resp.body;
  return page;
}

export async function getAllPage() {
  const resp = await superagent.get(`${api.HOST}/api/options`);
  const pages = resp.body;
  return pages;
}
