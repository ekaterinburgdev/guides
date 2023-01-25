import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import rgbaToRgb from 'rgba-to-rgb'
import classNames from 'classnames'

import styles from './CommonLinks.module.css'
import { ThemeContext, OpenTocContext } from '../../pages/_app'
import { useMobileDetect } from '../../hooks/hooks'

export function CommonLinks({ color, bgColor, mainPage }) {
    const isDark = useContext(ThemeContext)
    const { isOpen } = useContext(OpenTocContext)
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
        [styles.open]: !useMobileDetect().isMobile(),
    })

    return (
        <section style={{ backgroundColor: commonColor }} className={containerClassnames}>
            <Link href="https://ekaterinburg.design/">
                <Image
                    src="/ecosystem.svg"
                    width={60}
                    height={60}
                    className={styles.CommonLinks__icon}
                    style={{ marginTop: '15px' }}
                />
            </Link>
            {mainPage ? (
                <>
                    <Image
                        src="/transport.svg"
                        width={60}
                        height={60}
                        className={styles.CommonLinks__icon}
                        style={{ marginTop: '14px', marginLeft: '12px' }}
                    />
                    <p
                        className={styles.CommonLinks__text_main}
                        style={{ color, paddingLeft: '8px' }}
                    >
                        Руководства <br />
                        Екатеринбурга
                    </p>
                </>
            ) : (
                <Link style={{ paddingLeft: '12px' }} className={styles.CommonLinks__link} href="/">
                    <Image
                        src="/transport.svg"
                        width={60}
                        height={60}
                        className={styles.CommonLinks__icon}
                        style={{ marginLeft: '0', marginTop: '14px' }}
                    />
                    <p
                        className={styles.CommonLinks__text}
                        style={{ color, textDecorationColor: bgColor.alpha(0.2).rgb() }}
                    >
                        Руководства <br />
                        Екатеринбурга
                    </p>
                </Link>
            )}
        </section>
    )
}
