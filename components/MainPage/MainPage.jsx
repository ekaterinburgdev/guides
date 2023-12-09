import React from 'react'

import Image from 'next/image'
import ManualPreview from '../ManualPreview/ManualPreview'

import mainPageLogo from './MainPageLogo.svg'
import styles from './MainPage.module.css'
import { Ecosystem } from '../Ecosystem/Ecosystem'
import { MainPageToolbar } from '../Toolbar/MainPageToolbar'

export default function MainPage({ pageTitle, manualsPreview }) {
    return (
        <>
            <main className={styles.mainPage}>
                <h1 className={styles.mainPageTitle}>
                    <div className={styles.mainPageLogo}>
                        <Image src={mainPageLogo} fill alt="" />
                    </div>
                    <span className={styles.mainPageText}>{pageTitle}</span>
                </h1>
                <section className={styles.mainPageManuals}>
                    {manualsPreview.map((manualPreviewData, i) => (
                        <ManualPreview
                            {...manualPreviewData}
                            key={`${manualPreviewData.title}${i}`}
                        />
                    ))}
                </section>
                <Ecosystem mainPage={true} />
                <MainPageToolbar />
            </main>
        </>
    )
}
