import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useMediaQuery } from 'react-responsive'
import rgbaToRgb from 'rgba-to-rgb'

import styles from './CommonLinks.module.css'
import classNames from 'classnames'

export function CommonLinks({ color, bgColor, mainPage }) {
    const isDark = useMediaQuery({
        query: '(prefers-color-scheme: dark)',
    })
    const mainPageColor = isDark ? '#1A1C1F' : '#f5f8fb'
    const commonColor = mainPage
        ? mainPageColor
        : rgbaToRgb(
              isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
              `rgba(${Math.trunc(bgColor.color[0])}, ${Math.trunc(bgColor.color[1])}, ${Math.trunc(
                  bgColor.color[2]
              )}, ${bgColor.valpha})`
          )
    const containerClassnames = classNames(styles.CommonLinks__container, {
        [styles.mainPageContainer]: mainPage,
    })

    return (
        <section style={{ backgroundColor: commonColor }} className={containerClassnames}>
            <Link className={styles.CommonLinks__tooltiptarget} href="https://ekaterinburg.design/">
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
            {mainPage ? (
                <p className={styles.CommonLinks__text_main} style={{ color }}>
                    Руководства <br />
                    Екатеринбурга
                </p>
            ) : (
                <Link className={styles.CommonLinks__link} href="/">
                    <p className={styles.CommonLinks__text} style={{ color }}>
                        Руководства <br />
                        Екатеринбурга
                    </p>
                </Link>
            )}
        </section>
    )
}
