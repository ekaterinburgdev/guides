import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import cn from 'classnames'
import { useMediaQuery } from 'react-responsive'
import { useRouter } from 'next/router'

import styles from './TableOfContents.module.css'
import tp from '../../utils/typograf/typograf.config'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'
import { CommonLinks } from '../CommonLinks/CommonLinks'
import getBackgroundColor from '../../utils/getManualColorScheme'

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
                {tp.execute(anchor.title)}
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
            {tp.execute(anchor.title)}
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
    const colorScheme = getBackgroundColor(color)

    useEffect(() => {
        const arrayWithAnchorElements = Array.from(document.querySelectorAll('h2[id], h3[id]'))

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

    // useEffect(() => {
    //     const tableLinksElements = Array.from(
    //         document.querySelectorAll('[class*=tableOfContentsLink]')
    //     )
    //     const allInnerTableOfContentsLinksElements = Array.from(
    //         document.querySelectorAll('[class*=innerTableOfContentsLink]')
    //     )
    //     const allTableOfContentsLinks = [
    //         ...tableLinksElements,
    //         ...allInnerTableOfContentsLinksElements,
    //     ]

    //     const observerHandler = (entries) =>
    //         entries.forEach((link) => {
    //             if (link.intersectionRatio > 0) {
    //                 link.target.classList.add('123')
    //             } else {
    //                 link.target.classList.remove('123')
    //             }
    //         })
    //     const options = {
    //         root: document.querySelector('[class*=titleContainer]'),
    //         rootMargin: '0px',
    //         threshold: 0,
    //     }
    //     const observer = new IntersectionObserver(observerHandler, options)
    //     allTableOfContentsLinks.forEach((link) => observer.observe(link))
    // }, [anchorLinks])

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
                {tp.execute(title)}
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
            <HamburgerMenu state={isOpen} changeState={() => setIsOpen(!isOpen)} />
            <aside className={styles.TableOfContents__aside}>
                <nav
                    className={navClassName}
                    style={{
                        backgroundColor: colorScheme.bgLight,
                    }}
                >
                    <div className={styles.titleContainer}>
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
                            <Image
                                style={{ paddingTop: '0.2em' }}
                                className={styles.TableOfContents__icon}
                                src={icon}
                                width={32}
                                height={32}
                            />
                            {tp.execute(catalogTitle)}
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
                </nav>
                <CommonLinks
                    isOpen={!isDesktop}
                    color={colorScheme.title}
                    bgColor={colorScheme.bgLight}
                />
            </aside>
        </>
    )
}

export default TableOfContents
