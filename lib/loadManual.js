import { API_HOST } from '../consts/endpoints'

/** @returns { Promise<import('./types/Tree').Tree> } */
export async function loadTree() {
    const url = new URL(`${API_HOST}/api/tree`)
    const resp = await fetch(url)

    return await resp.json()
}

/** @returns { Promise<import('./types/Page').Page> } */
export async function loadPage(path) {
    const url = new URL(`${API_HOST}/api/content/root/${path}`)
    const resp = await fetch(url)

    return await resp.json()
}
