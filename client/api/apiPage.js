import superagent from 'superagent';
import { api } from '../next.config';

export async function getPage(pageId) {
  const resp = await superagent.get(`${api.HOST}/api/content/root`).query({ id: pageId });
  const page = resp.body;
  return page;
}

export async function getAllPage() {
  const resp = await superagent.get(`${api.HOST}/api/options`);
  const pages = resp.body;
  return pages;
}

export async function getTree() {
  const resp = await superagent.get(`${api.HOST}/api/tree`);
  const tree = resp.body;
  return tree;
}

export async function getPageByUrl(url) {
  const resp = await superagent.get(`${api.HOST}/api/content/root/${url}`);
  const page = resp.body;
  console.log('страница', page);
  return page;
}
