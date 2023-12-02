import React from 'react'

import { getTree } from '../api/apiPage'

import parseManualsPreview from '../utils/manualsPreviewParser'
import setCacheHeaders from '../utils/setCacheHeaders'

import MainPage from '../components/MainPage/MainPage'

export default function Home({ pageTitle, manualsPreview }) {
    return <MainPage pageTitle={pageTitle} manualsPreview={manualsPreview} />
}

export async function getServerSideProps({ res }) {
    setCacheHeaders(res)

    const tree = await getTree()

    return {
        props: {
            pageTitle: tree?.properties?.child_page?.title,
            manualsPreview: parseManualsPreview(tree),
        },
    }
}
