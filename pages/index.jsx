import React from 'react'

import { getTree } from '../api/apiPage'

import parseManualsPreview from '../utils/notionTypeParser/manualsPreviewParser'
import ManualPreview from '../components/ManualPreview/ManualPreview'

import styles from '../styles/home.module.css'

export default function Home({ pageTitle, manualsPreview }) {
    return (
        <main className={styles.homeContainer}>
            <h1 className={styles.mainTitle}>{pageTitle}</h1>
            <section className={styles.manualsSection}>
                {manualsPreview.map((manualPreviewData) => (
                    <ManualPreview {...manualPreviewData} key={manualPreviewData.title} />
                ))}
            </section>
        </main>
    )
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
