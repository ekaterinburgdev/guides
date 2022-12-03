import superagent from 'superagent'
import { API_HOST } from '../consts/endpoints'

export async function getPage(pageId) {
    const resp = await superagent.get(`${API_HOST}/api/content/root`).query({ id: pageId })
    return resp.body
}

export async function getAllPage() {
    const resp = await superagent.get(`${API_HOST}/api/options`)
    return resp.body
}

export async function getTree() {
    const resp = await superagent.get(`${API_HOST}/api/tree`)
    return resp.body
}

export async function getPageByUrl(url) {
    const resp = await superagent.get(`${API_HOST}/api/content/root/${url}`)
    return resp.body
}
