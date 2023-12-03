import { API_HOST } from '../consts/endpoints'

/** @returns { Promise<import('./apiPage').Root> } */
export async function getPage(pageId) {
    const url = new URL(`${API_HOST}/api/content/root`)
    url.searchParams.append('id', pageId)

    const resp = await fetch(url)

    return await resp.json()
}

/** @returns { Promise<import('./apiPage').AllPage> } */
export async function getAllPage() {
    const url = new URL(`${API_HOST}/api/options`)
    const resp = await fetch(url)

    return await resp.json()
}

/** @returns { Promise<import('./apiPage').Tree> } */
export async function getTree() {
    const url = new URL(`${API_HOST}/api/tree`)
    const resp = await fetch(url)

    return await resp.json()
}

/** @returns { Promise<import('./apiPage').Page> } */
export async function getPageByUrl(path) {
    const url = new URL(`${API_HOST}/api/content/root/${path}`)
    const resp = await fetch(url)

    return await resp.json()
}
