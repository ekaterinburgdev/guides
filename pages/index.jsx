import React from 'react'

import { getTree } from '../api/apiPage'

import parseManualsPreview from '../utils/notionTypeParser/manualsPreviewParser'

import MainPage from '../components/MainPage/MainPage'

export default function Home({ pageTitle, manualsPreview }) {
    return <MainPage pageTitle={pageTitle} manualsPreview={manualsPreview} />
}

export async function getServerSideProps() {
    const tree = await getTree()

    return {
        props: {
            pageTitle: tree?.properties?.child_page?.title,
            manualsPreview: parseManualsPreview(tree),
        },
    }
}
