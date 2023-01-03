import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from './CommonLinks.module.css'

export function CommonLinks({ color, bgColor }) {
    return (
        <section style={{ backgroundColor: bgColor }} className={styles.CommonLinks__container}>
            <Link className={styles.CommonLinks__tooltiptarget} href="/">
                <Image
                    src="/ecosystem.svg"
                    width={60}
                    height={60}
                    className={styles.CommonLinks__icon}
                />
                <span className={styles.CommonLinks__tooltiptext}>Код Екатеринбурга</span>
            </Link>
            <Link className={styles.CommonLinks__tooltiptarget} href="/">
                <Image
                    src="/transport.svg"
                    width={60}
                    height={60}
                    className={styles.CommonLinks__icon}
                />
                <span className={styles.CommonLinks__tooltiptext}>Руководства Екатеринбурга</span>
            </Link>
            <Link className={styles.CommonLinks__link} href="/">
                <p className={styles.CommonLinks__text} style={{ color }}>
                    Руководства <br />
                    Екатеринбурга
                </p>
            </Link>
        </section>
    )
}
