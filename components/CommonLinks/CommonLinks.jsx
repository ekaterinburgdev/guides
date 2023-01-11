import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import rgbaToRgb from 'rgba-to-rgb'

import styles from './CommonLinks.module.css'

export function CommonLinks({ color, bgColor }) {
    const isDark = useMediaQuery({
        query: '(prefers-color-scheme: dark)',
    })
    const asideColor = rgbaToRgb(
        isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
        `rgba(${Math.trunc(bgColor.color[0])}, ${Math.trunc(bgColor.color[1])}, ${Math.trunc(
            bgColor.color[2]
        )}, ${bgColor.valpha})`
    )

    return (
        <section style={{ backgroundColor: asideColor }} className={styles.CommonLinks__container}>
            <Link className={styles.CommonLinks__tooltiptarget} href="/">
                <Image
                    src="/ecosystem.svg"
                    width={60}
                    height={60}
                    className={styles.CommonLinks__icon}
                />
            </Link>
            <Link className={styles.CommonLinks__tooltiptarget} href="/">
                <Image
                    src="/transport.svg"
                    width={60}
                    height={60}
                    className={styles.CommonLinks__icon}
                />
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
