import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import styles from './CommonLinks.module.css'

export function CommonLinks() {
    return (
        <section className={styles.CommonLinks__container}>
            <Image
                src="/transport.svg"
                width={60}
                height={60}
                className={styles.CommonLinks__icon}
            />
            <Image
                src="/ecosystem.svg"
                width={60}
                height={60}
                className={styles.CommonLinks__icon}
            />
            <p>
                <Link className={styles.CommonLinks__link} href="/">
                    Руководства <br />
                    Екатеринбурга
                </Link>
            </p>
        </section>
    )
}
