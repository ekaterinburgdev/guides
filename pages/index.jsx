import React from 'react'
import { loadTree } from '../lib/loadManual'
import getManualsPreviews from '../lib/getManualsPreviews'
import MainPage from '../components/MainPage/MainPage'

export default function Home({ manualsPreview }) {
    return <MainPage manualsPreview={manualsPreview} />
}

export async function getServerSideProps() {
    const tree = await loadTree()

    return {
        props: {
            manualsPreview: getManualsPreviews(tree),
        },
    }
}
