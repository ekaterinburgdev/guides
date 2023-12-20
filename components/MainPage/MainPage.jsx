import React from 'react'
import { Logo } from '../Logo/Logo'
import ManualPreview from '../ManualPreview/ManualPreview'
import { Ecosystem } from '../Ecosystem/Ecosystem'
import { ProjectLinks } from '../ProjectLinks/ProjectLinks'

import styles from './MainPage.module.css'

export default function MainPage({ manualsPreview }) {
    return (
        <>
            <main className={styles.mainPage}>
                <h1 className={styles.mainPageTitle}>
                    <Logo />
                </h1>
                <section className={styles.mainPageManuals}>
                    {manualsPreview.map((manualPreviewData, i) => (
                        <ManualPreview
                            {...manualPreviewData}
                            key={`${manualPreviewData.title}${i}`}
                        />
                    ))}
                </section>

                <Ecosystem />
                <ProjectLinks />
            </main>
        </>
    )
}
