import React, { useState } from 'react'
import ManualPreview from '../ManualPreview/ManualPreview'
import { ProjectLinks } from '../ProjectLinks/ProjectLinks'
import { AboutProjectModal } from '../AboutProjectModal/AboutProjectModal'
import { Ecosystem } from '../Ecosystem/Ecosystem'
import { Logo } from '../Logo/Logo'

import styles from './MainPage.module.css'

export default function MainPage({ manualsPreview }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

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
                <ProjectLinks onClickAboutProjects={() => setIsModalOpen(true)} />
                <AboutProjectModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </main>
        </>
    )
}
