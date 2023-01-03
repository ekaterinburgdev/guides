import React from 'react'

import Image from 'next/image'
import ManualPreview from '../ManualPreview/ManualPreview'

import mainPageLogo from './MainPageLogo.svg'
import styles from './MainPage.module.css'
import ChristmasLights from '../ChristmasLights/ChristmasLights'
import Showflakes from '../Snowflake/Showflakes'

export default function MainPage({ pageTitle, manualsPreview }) {
    return (
        <>
            <ChristmasLights />
            <Showflakes />
            <main className={styles.mainPage}>
                <h1 className={styles.mainPageTitle}>
                    <div className={styles.mainPageLogo}>
                        <Image src={mainPageLogo} fill alt="" />
                    </div>
                    {pageTitle}
                </h1>

                <section className={styles.mainPageManuals}>
                    {manualsPreview.map((manualPreviewData) => (
                        <ManualPreview {...manualPreviewData} key={manualPreviewData.title} />
                    ))}
                </section>
            </main>
        </>
    )
}
