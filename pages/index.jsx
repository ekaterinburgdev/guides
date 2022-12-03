import React from 'react'

import { getTree } from '../api/apiPage'

import parseManuals from '../utils/notionTypeParser/manualParser'
import Manual from '../components/Manual/Manual'

import styles from '../styles/home.module.css'

export default function Home({ pageTitle, manuals }) {
    return (
        <main className={styles.homeContainer}>
            <h1 className={styles.mainTitle}>{pageTitle}</h1>

            <section className={styles.manualsSection}>
                {manuals.map((manual) => (
                    <Manual {...manual} key={manual.title} />
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
            manuals: parseManuals(tree),
        },
    }
}
