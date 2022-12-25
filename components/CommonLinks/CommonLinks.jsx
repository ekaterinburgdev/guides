import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'

import styles from './CommonLinks.module.css'

export function CommonLinks({ color, bgColor, isOpen }) {
    const commonLinksClassNames = classNames(styles.CommonLinks__container, {
        [styles.open]: isOpen,
    })

    return (
        <section style={{ backgroundColor: bgColor }} className={commonLinksClassNames}>
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
            <Link className={styles.CommonLinks__link} href="/">
                <p className={styles.CommonLinks__text} style={{ color }}>
                    Руководства <br />
                    Екатеринбурга
                </p>
            </Link>
        </section>
    )
}
