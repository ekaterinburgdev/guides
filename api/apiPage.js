import { API_HOST } from '../consts/endpoints'

/** @returns { Promise<import('./apiPage').Tree> } */
export async function getTree() {
    const url = new URL(`${API_HOST}/api/tree`)
    const resp = await fetch(url)

    return await resp.json()
}

/** @returns { Promise<import('./apiPage').Page> } */
export async function getPage(path) {
    const url = new URL(`${API_HOST}/api/content/root/${path}`)
    const resp = await fetch(url)

    return await resp.json()
}
