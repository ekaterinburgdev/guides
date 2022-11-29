import React, { useState, useEffect } from 'react'

import styles from '../styles/home.module.css'
import { getTree } from '../api/apiPage'
import Manual from '../components/Manual/Manual'

// TODO Remove hard-code after back-end feature https://github.com/ekaterinburgdev/guides-api/issues/10
const HIDDEN_MANUALS = ['typical', 'typical-2', 'street-name-plates']

export default function Home({ tree }) {
    const [manuals, setManuals] = useState([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        if (!tree) {
            return
        }

        const manualsVisible = tree.children.filter((manual) => {
            return !HIDDEN_MANUALS.includes(manual?.properties?.pageUrl?.url)
        })

        setManuals(manualsVisible)
        setTitle(tree?.properties?.child_page?.title)
    }, [tree])

    return (
        <main className={styles.homeContainer}>
            <h1 className={styles.mainTitle}>{title}</h1>
            <section className={styles.manualsSection}>
                {manuals.map((manual) => (
                    <Manual manual={manual} key={manual?.properties?.Name?.title} />
                ))}
            </section>
        </main>
    )
}

export async function getServerSideProps() {
    const tree = await getTree()
    return {
        props: {
            tree,
        },
    }
}
