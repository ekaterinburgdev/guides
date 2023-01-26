import React, { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import rgbaToRgb from 'rgba-to-rgb'
import classNames from 'classnames'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/router'

import mainPageLogo from '../MainPage/MainPageLogo.svg'
import styles from './CommonLinks.module.css'
import { ThemeContext } from '../../pages/_app'
import NoSsr from '../NoSsr/NoSsr'
import { TocStateContext } from '../../pages/manuals/[[...pageUrl]]'

export function CommonLinks({ color, bgColor, mainPage }) {
    const isDark = useContext(ThemeContext)
    const { asPath } = useRouter()
    let isOpen = false
    if (asPath !== '/') {
        isOpen = useContext(TocStateContext).isOpen
    }
    const isDesktop = useMediaQuery({
        query: '(min-width: 991px)',
    })
    const currentColor = color ?? (isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 1)')
    const currentBgColor = bgColor ?? 'rgba(255, 255, 255, 1)'
    const mainPageColor = isDark ? '#1A1C1F' : '#f5f8fb'
    const commonColor = mainPage
        ? mainPageColor
        : rgbaToRgb(
              isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
              `rgba(${Math.trunc(currentBgColor.color[0])}, ${Math.trunc(
                  currentBgColor.color[1]
              )}, ${Math.trunc(currentBgColor.color[2])}, ${currentBgColor.valpha})`
          )
    const containerClassnames = classNames(styles.CommonLinks__container, {
        [styles.mainPageContainer]: mainPage,
    })

    return (
        <NoSsr>
            <section
                style={{
                    backgroundColor: commonColor,
                    display: isOpen || isDesktop ? 'flex' : 'none',
                }}
                className={containerClassnames}
            >
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
                            src={mainPageLogo}
                            width={60}
                            height={60}
                            className={styles.CommonLinks__icon}
                            style={{ marginTop: '14px', marginLeft: '12px' }}
                        />
                        <p
                            className={styles.CommonLinks__text_main}
                            style={{ color: currentColor, paddingLeft: '8px' }}
                        >
                            Руководства <br />
                            Екатеринбурга
                        </p>
                    </>
                ) : (
                    <Link
                        style={{ paddingLeft: '12px' }}
                        className={styles.CommonLinks__link}
                        href="/"
                    >
                        <Image
                            src="/transport.svg"
                            width={60}
                            height={60}
                            className={styles.CommonLinks__icon}
                            style={{ marginLeft: '0', marginTop: '14px' }}
                        />
                        <p
                            className={styles.CommonLinks__text}
                            style={{
                                color: currentColor,
                                textDecorationColor: bgColor.alpha(0.2).rgb(),
                            }}
                        >
                            Руководства <br />
                            Екатеринбурга
                        </p>
                    </Link>
                )}
            </section>
        </NoSsr>
    )
}
