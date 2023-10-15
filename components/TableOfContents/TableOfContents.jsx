import React, { useEffect, useContext, Fragment, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import cn from 'classnames'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/router'
import rgbaToRgb from 'rgba-to-rgb'
import scrollIntoView from 'scroll-into-view-if-needed'

import { PageContext, TocStateContext } from '../../pages/manuals/[[...pageUrl]]'
import styles from './TableOfContents.module.css'
import { tpForAsideMenu } from '../../utils/typograf/typograf.config'
import { CommonLinks } from '../CommonLinks/CommonLinks'
import getManualColorScheme from '../../utils/getManualColorScheme'
import { ThemeContext } from '../../pages/_app'

function InnerLink({ anchor, baseState, setState, color, textDecorationColor }) {
    const isDesktop = useMediaQuery({
        query: '(min-width: 991px)',
    })
    return (
        <a
            style={{ color, textDecorationColor }}
            className={cn(styles.innerTableOfContentsLink)}
            key={anchor.title}
            href={`#${anchor.id}`}
            onClick={() => !isDesktop && setState(!baseState)}
        >
            {tpForAsideMenu.execute(anchor.title)}
        </a>
    )
}

function TableOfContents({ tableOfContentArr, currentPageUrl = [], anchorLinks, catalogTitle }) {
    const { isOpen, setIsOpen } = useContext(TocStateContext)
    const colorContext = useContext(PageContext)
    const { colorMap } = colorContext
    const { asPath } = useRouter()
    const color = colorMap.filter((item) => asPath.includes(item.url))[0]?.color
    const colorScheme = getManualColorScheme(color)
    const isDark = useContext(ThemeContext)
    const asideColor = rgbaToRgb(
        isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
        `rgba(${Math.trunc(colorScheme.bgLight.color[0])}, ${Math.trunc(
            colorScheme.bgLight.color[1]
        )}, ${Math.trunc(colorScheme.bgLight.color[2])}, ${colorScheme.bgLight.valpha})`
    )

    useEffect(() => {
        const arrayWithAnchorElements = [...document.querySelectorAll('h1[id], h2[id]')]

        const scrollHandler = (entries) =>
            entries.forEach((entry) => {
                const section = entry.target
                const sectionId = section.id
                const sectionLi = document.querySelector(`a[href="#${sectionId}"]`)?.parentElement

                if (entry.intersectionRatio > 0) {
                    sectionLi?.classList?.add(styles.visible)
                    scrollIntoView(sectionLi, {
                        scrollMode: 'if-needed',
                        block: 'center',
                        inline: 'center',
                        behavior: 'smooth',
                    })
                } else {
                    sectionLi?.classList?.remove(styles.visible)
                }
            })

        const observer = new IntersectionObserver(scrollHandler)
        arrayWithAnchorElements.forEach((section) => observer.observe(section))
    }, [anchorLinks])

    useEffect(() => {
        const styleVisible = document.querySelector('.visible')?.style
        styleVisible?.setProperty('border-color', colorScheme.bgDark)
    }, [anchorLinks])

    // TODO: Сделать для большой вложенности...
    const tableOfContentsLink = ({ url, title }) => (
        <Fragment key={url}>
            <li className={styles.link}>
                <Link
                    href={{
                        pathname: '/[[...pageUrl]]',
                        query: { pageUrl: [currentPageUrl[0], url] },
                        as: `${currentPageUrl.join('/')}/${url}`,
                    }}
                    style={{
                        color: colorScheme.title,
                        backgroundColor:
                            currentPageUrl[1] && currentPageUrl[1] === url
                                ? colorScheme.bgLight
                                : '',
                        borderBottomLeftRadius:
                            currentPageUrl[1] && currentPageUrl[1] === url && anchorLinks.length > 0
                                ? 0
                                : '8px',
                        borderBottomRightRadius:
                            currentPageUrl[1] && currentPageUrl[1] === url && anchorLinks.length > 0
                                ? 0
                                : '8px',
                    }}
                    className={cn(styles.tableOfContentsLink, {
                        [styles.active]: currentPageUrl[1] && currentPageUrl[1] === url,
                    })}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {tpForAsideMenu.execute(title)}
                </Link>
                {currentPageUrl[1] && currentPageUrl[1] === url && anchorLinks.length > 0 && (
                    <div
                        style={{
                            color: colorScheme.title,
                        }}
                        className={styles.separator}
                    />
                )}
            </li>
            {currentPageUrl[1] && currentPageUrl[1] === url && anchorLinks.length > 0 && (
                <ul
                    style={{ backgroundColor: colorScheme.bgLight }}
                    className={styles.innerlinkContainerList}
                >
                    {anchorLinks.map((anchor) => (
                        <li
                            style={{ color: colorScheme.title }}
                            className={cn(styles.innerlinkContainerListItem, {
                                [styles.innerlinkContainerListItem2Level]:
                                    anchor.type === undefined,
                                [styles.innerlinkContainerListItem3Level]:
                                    anchor.type === 'heading_2',
                            })}
                            key={anchor.id}
                        >
                            <InnerLink
                                color={colorScheme.title}
                                anchor={anchor}
                                baseState={isOpen}
                                setState={setIsOpen}
                                textDecorationColor={colorScheme.textDecoration}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </Fragment>
    )

    const navClassName = cn(styles.tableOfContents, {
        [styles.open]: isOpen,
    })

    return (
        <>
            <Head>
                <title>{catalogTitle}</title>
            </Head>
            <aside className={styles.TableOfContents__aside}>
                <nav
                    className={navClassName}
                    style={{
                        backgroundColor: asideColor,
                    }}
                >
                    <Link
                        href={{
                            pathname: '/[[...pageUrl]]',
                            query: { pageUrl: [currentPageUrl[0]] },
                        }}
                        style={{ backgroundColor: asideColor }}
                        className={styles.titleContainer}
                    >
                        <span
                            style={{
                                color: colorScheme.title,
                                textDecorationColor: colorScheme.bgLight,
                            }}
                            className={styles.catalogTitle}
                        >
                            {tpForAsideMenu.execute(catalogTitle)}
                        </span>
                    </Link>
                    <ul className={styles.linkContainerList}>
                        {currentPageUrl &&
                            tableOfContentArr.map((obj) => tableOfContentsLink(obj, colorScheme))}
                    </ul>
                </nav>
            </aside>
            <CommonLinks open={isOpen} color={colorScheme.title} bgColor={colorScheme.bgLight} />
        </>
    )
}

export default TableOfContents
