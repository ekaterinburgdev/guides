import React, { useEffect, useContext, Fragment } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import cn from 'classnames'
import { useMediaQuery } from 'react-responsive'
import scrollIntoView from 'scroll-into-view-if-needed'

import { TocStateContext } from '../../pages/manuals/[[...pageUrl]]'
import styles from './TableOfContents.module.css'
import { tpForAsideMenu } from '../../utils/typograf/typograf.config'
import { Ecosystem } from '../Ecosystem/Ecosystem'

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
            <span>{tpForAsideMenu.execute(anchor.title[0])}</span>
        </a>
    )
}

function TableOfContents({ tableOfContentArr, currentPageUrl = [], anchorLinks, catalogTitle }) {
    const { isOpen, setIsOpen } = useContext(TocStateContext)

    useEffect(() => {
        const arrayWithAnchorElements = [...document.querySelectorAll('h1[id], h2[id], h3[id]')]

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

    // TODO: Сделать для большой вложенности...
    const tableOfContentsLink = ({ url, order, title }) => (
        <Fragment key={url}>
            <li className={styles.link}>
                <Link
                    href={{
                        pathname: '/[[...pageUrl]]',
                        query: { pageUrl: [currentPageUrl[0], url] },
                    }}
                    className={cn(styles.tableOfContentsLink, {
                        [styles.active]: currentPageUrl[1] && currentPageUrl[1] === url,
                    })}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className={styles.linkNumber}>{order}.&nbsp;</span>
                    {tpForAsideMenu.execute(title)}
                </Link>
                {currentPageUrl[1] && currentPageUrl[1] === url && anchorLinks.length > 0 && (
                    <hr className={styles.separator} />
                )}
            </li>
            {currentPageUrl[1] && currentPageUrl[1] === url && anchorLinks.length > 0 && (
                <ul className={styles.innerlinkContainerList}>
                    {anchorLinks.map((anchor) => (
                        <li
                            className={cn(styles.innerlinkContainerListItem, {
                                [styles.innerlinkContainerListItem2Level]:
                                    anchor.type === undefined,
                                [styles.innerlinkContainerListItem3Level]:
                                    anchor.type === 'heading_2',
                            })}
                            key={anchor.id}
                        >
                            <InnerLink anchor={anchor} baseState={isOpen} setState={setIsOpen} />
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
                <nav className={navClassName}>
                    <Link href="/" className={styles.linkMainpage}>
                        Все руководства
                    </Link>
                    <Link
                        href={{
                            pathname: '/[[...pageUrl]]',
                            query: { pageUrl: [currentPageUrl[0]] },
                        }}
                        className={styles.catalogTitle}
                    >
                        {tpForAsideMenu.execute(catalogTitle)}
                    </Link>

                    <ul className={styles.linkContainerList}>
                        {currentPageUrl && tableOfContentArr.map((obj) => tableOfContentsLink(obj))}
                    </ul>
                </nav>
            </aside>

            <Ecosystem open={isOpen} />
        </>
    )
}

export default TableOfContents
