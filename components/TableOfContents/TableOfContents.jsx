import React, { useEffect, Fragment } from 'react'
import cn from 'classnames'
import Link from 'next/link'
import { tUI } from '../../utils/typograf'
import scrollIntoView from 'scroll-into-view-if-needed'
import { Ecosystem } from '../Ecosystem/Ecosystem'
import { ManualTitle } from '../ManualTitle/ManualTitle'

import styles from './TableOfContents.module.css'

function InnerLink({ anchor, setIsOpen }) {
    return (
        <a
            className={cn(styles.innerTableOfContentsLink)}
            key={anchor.title}
            href={`#${anchor.id}`}
            onClick={() => setIsOpen(false)}
        >
            <span>{tUI(anchor.title[0])}</span>
        </a>
    )
}

function TableOfContents({
    tableOfContentArr,
    currentPageUrl = [],
    anchorLinks,
    catalogTitle,
    isOpen,
    setIsOpen,
}) {
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
                >
                    <span className={styles.linkNumber}>{order}.&nbsp;</span>
                    {tUI(title)}
                </Link>

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
                                <InnerLink
                                    anchor={anchor}
                                    baseState={isOpen}
                                    setIsOpen={setIsOpen}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        </Fragment>
    )

    const navClassName = cn(styles.tableOfContents, {
        [styles.open]: isOpen,
    })

    return (
        <>
            <aside className={styles.TableOfContents__aside}>
                <nav className={navClassName}>
                    <div className={cn(styles.tableOfContents__title)}>
                        <ManualTitle pageUrl={currentPageUrl[0]} title={catalogTitle} />
                    </div>

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
