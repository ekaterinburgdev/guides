import React from 'react'
import { getTree } from '../api/apiPage'
import parseManualsPreview from '../utils/manualsPreviewParser'
import MainPage from '../components/MainPage/MainPage'

export default function Home({ manualsPreview }) {
    return <MainPage manualsPreview={manualsPreview} />
}

export async function getServerSideProps() {
    const tree = await getTree()

    return {
        props: {
            manualsPreview: parseManualsPreview(tree),
        },
    }
}
