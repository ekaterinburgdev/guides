import superagent from 'superagent'
import { API_HOST } from '../consts/endpoints'

/** @returns { Promise<import('./apiPage').Root> } */
export async function getRoot(pageId) {
    const resp = await superagent.get(`${API_HOST}/api/content/root`).query({ id: pageId })
    return resp.body
}

/** @returns { Promise<import('./apiPage').AllPage> } */
export async function getAllPage() {
    const resp = await superagent.get(`${API_HOST}/api/options`)
    return resp.body
}

/** @returns { Promise<import('./apiPage').Tree> } */
export async function getTree() {
    const resp = await superagent.get(`${API_HOST}/api/tree`)
    return resp.body
}

/** @returns { Promise<import('./apiPage').Page> } */
export async function getPageByUrl(url) {
    const resp = await superagent.get(`${API_HOST}/api/content/root/${url}`)
    return resp.body
}
