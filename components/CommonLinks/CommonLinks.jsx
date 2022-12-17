import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'

import styles from './CommonLinks.module.css'

export function CommonLinks({ color, bgColor, isOpen }) {
    const className = classNames(styles.CommonLinks__container, { [styles.open]: isOpen })

    return (
        <section style={{ color, backgroundColor: bgColor }} className={className}>
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
                <p>
                    Руководства <br />
                    Екатеринбурга
                </p>
            </Link>
        </section>
    )
}
