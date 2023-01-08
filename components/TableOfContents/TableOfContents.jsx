import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import cn from 'classnames'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/router'
import rgbaToRgb from 'rgba-to-rgb'

import styles from './TableOfContents.module.css'
import { tpForAsideMenu } from '../../utils/typograf/typograf.config'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'
import { CommonLinks } from '../CommonLinks/CommonLinks'
import getManualColorScheme from '../../utils/getManualColorScheme'

function InnerLink({ anchor, baseState, setState, color }) {
    const isDesktop = useMediaQuery({
        query: '(min-width: 991px)',
    })
    if (isDesktop) {
        return (
            <a
                style={{ color }}
                className={styles.innerTableOfContentsLink}
                key={anchor.title}
                href={`#${anchor.id}`}
            >
                {tpForAsideMenu.execute(anchor.title)}
            </a>
        )
    }

    return (
        <a
            style={{ color }}
            className={styles.innerTableOfContentsLink}
            key={anchor.title}
            href={`#${anchor.id}`}
            onClick={() => setState(!baseState)}
        >
            {tpForAsideMenu.execute(anchor.title)}
        </a>
    )
}

function TableOfContents({
    tableOfContentArr,
    currentPageUrl = [],
    anchorLinks,
    catalogTitle,
    colorMap,
    iconMap,
}) {
    const isDesktop = useMediaQuery({
        query: '(min-width: 991px)',
    })
    const [isOpen, setIsOpen] = useState(isDesktop)
    const { asPath } = useRouter()
    const color = colorMap.filter((item) => asPath.includes(item.url))[0]?.color
    const icon = iconMap.filter((item) => asPath.includes(item.url))[0]?.imageUrl
    const colorScheme = getManualColorScheme(color)
    const isDark = useMediaQuery({
        query: '(prefers-color-scheme: dark)',
    })
    const asideColor = rgbaToRgb(
        isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
        `rgba(${Math.trunc(colorScheme.bgLight.color[0])}, ${Math.trunc(
            colorScheme.bgLight.color[1]
        )}, ${Math.trunc(colorScheme.bgLight.color[2])}, ${colorScheme.bgLight.valpha})`
    )

    useEffect(() => {
        const arrayWithAnchorElements = Array.from(
            document.querySelectorAll('h1[id], h2[id], h3[id]')
        )

        const scrollHandler = (entries) =>
            entries.forEach((entry) => {
                const section = entry.target
                const sectionId = section.id
                const sectionTagName = section.tagName
                const sectionLink = document.querySelector(`a[href="#${sectionId}"]`)

                if (sectionTagName === 'H3') {
                    sectionLink?.classList?.add(styles.innerH3)
                }

                if (entry.intersectionRatio > 0) {
                    sectionLink?.classList?.add(styles.visible)
                } else {
                    sectionLink?.classList?.remove(styles.visible)
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
                        currentPageUrl[1] && currentPageUrl[1] === url ? colorScheme.bgLight : '',
                }}
                className={cn(styles.tableOfContentsLink, {
                    [styles.active]: currentPageUrl[1] && currentPageUrl[1] === url,
                    [styles.separator]:
                        currentPageUrl[1] && currentPageUrl[1] === url && anchorLinks.length,
                })}
                onClick={() => setIsOpen(!isOpen)}
            >
                {tpForAsideMenu.execute(title)}
            </Link>
            {currentPageUrl[1] && currentPageUrl[1] === url && anchorLinks.length > 0 && (
                <ul
                    style={{ backgroundColor: colorScheme.bgLight }}
                    className={styles.innerlinkContainerList}
                >
                    {anchorLinks.map((anchor) => (
                        <li className={styles.innerlinkContainerListItem} key={anchor.id}>
                            <InnerLink
                                color={colorScheme.title}
                                anchor={anchor}
                                baseState={isOpen}
                                setState={setIsOpen}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </li>
    )

    const navClassName = cn(styles.tableOfContents, {
        [styles.open]: isOpen,
    })

    return (
        <>
            <Head>
                <title>{catalogTitle}</title>
            </Head>
            <HamburgerMenu state={isOpen} changeState={() => setIsOpen(!isOpen)} color={color} />
            <aside className={styles.TableOfContents__aside}>
                <nav
                    className={navClassName}
                    style={{
                        backgroundColor: asideColor,
                    }}
                >
                    <div style={{ backgroundColor: asideColor }} className={styles.titleContainer}>
                        <Image
                            className={styles.TableOfContents__icon}
                            src={icon}
                            width={50}
                            height={50}
                        />
                        <Link
                            href={{
                                pathname: '/[[...pageUrl]]',
                                query: { pageUrl: [currentPageUrl[0]] },
                            }}
                            className={styles.catalogTitle}
                            style={{
                                color: colorScheme.title,
                            }}
                        >
                            {tpForAsideMenu.execute(catalogTitle)}
                        </Link>
                        <div
                            style={{ borderBottomColor: colorScheme.bgLight }}
                            className={styles.TableOfContents__divider}
                        />
                    </div>
                    <ul className={styles.linkContainerList}>
                        {currentPageUrl &&
                            tableOfContentArr.map((obj) => tableOfContentsLink(obj, colorScheme))}
                    </ul>
                    <CommonLinks color={colorScheme.title} bgColor={colorScheme.bgLight} />
                </nav>
            </aside>
        </>
    )
}

export default TableOfContents
