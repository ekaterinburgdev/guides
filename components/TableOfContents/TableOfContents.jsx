import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import cn from 'classnames'
import { useMediaQuery } from 'react-responsive'
import Color from 'color'

import styles from './TableOfContents.module.css'
import tp from '../../utils/typograf/typograf.config'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu'
import { CommonLinks } from '../CommonLinks/CommonLinks'
import getBackgroundColor from '../../utils/getBackgroundColor'

function InnerLink({ anchor, baseState, setState }) {
    const isDesktop = useMediaQuery({
        query: '(min-width: 991px)',
    })
    if (isDesktop) {
        return (
            <a
                className={styles.innerTableOfContentsLink}
                key={anchor.title}
                href={`#${anchor.id}`}
            >
                {anchor.title}
            </a>
        )
    }
    return (
        <a
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
    color,
}) {
    const isDesktop = useMediaQuery({
        query: '(min-width: 991px)',
    })
    const [isOpen, setIsOpen] = useState(isDesktop)

    const textColor = getBackgroundColor(color)
    const textColorHover = Color(textColor).negate()
    const [currentTitleColor, setTitleCurrentColor] = useState(textColor)

    useEffect(() => {
        const arrayWithAnchorElements = Array.from(
            document.querySelectorAll('h1[id], h2[id], h3[id]')
        )

        const scrollHandler = (entries) =>
            entries.forEach((entry) => {
                const section = entry.target
                const sectionId = section.id
                const sectionLink = document.querySelector(`a[href="#${sectionId}"]`)

                if (entry.intersectionRatio > 0) {
                    sectionLink?.classList?.add(styles.visible)
                } else {
                    sectionLink?.classList?.remove(styles.visible)
                }
            })

        const observer = new IntersectionObserver(scrollHandler)
        arrayWithAnchorElements.forEach((section) => observer.observe(section))
    }, [anchorLinks])

    // TODO: Сделать для большой вложенности...
    const tableOfContentsLink = ({ url, title }) => (
        <li className={styles.link}>
            <Link
                // onMouseEnter={() => setCurrentColor(textColorHover)}
                // onMouseLeave={() => setCurrentColor(textColor)}
                // style={{ color: currentColor }}
                href={{
                    pathname: '/[[...pageUrl]]',
                    query: { pageUrl: [currentPageUrl[0], url] },
                    as: `${currentPageUrl.join('/')}/${url}`,
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
                <ul className={styles.innerlinkContainerList}>
                    {anchorLinks.map((anchor) => (
                        <li className={styles.innerlinkContainerListItem} key={anchor.id}>
                            <InnerLink anchor={anchor} baseState={isOpen} setState={setIsOpen} />
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
                        backgroundColor: color,
                    }}
                >
                    <Link
                        href={{
                            pathname: '/[[...pageUrl]]',
                            query: { pageUrl: [currentPageUrl[0]] },
                        }}
                        className={styles.catalogTitle}
                        style={{ color: currentTitleColor }}
                        onMouseEnter={() => setTitleCurrentColor(textColorHover)}
                        onMouseLeave={() => setTitleCurrentColor(textColor)}
                    >
                        {tp.execute(catalogTitle)}
                    </Link>
                    <ul className={styles.linkContainerList}>
                        {currentPageUrl && tableOfContentArr.map((obj) => tableOfContentsLink(obj))}
                    </ul>
                </nav>
                <CommonLinks />
            </aside>
        </>
    )
}

export default TableOfContents
