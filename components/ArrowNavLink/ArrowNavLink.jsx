import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import tp from '../../utils/typograf/typograf.config';

import styles from './arrow.module.css'


const getCatalogOptions = (catalog) => ({
    url: catalog.properties.pageUrl.url,
    title: catalog.properties.Name.title[0].plain_text,
})

export function ArrowNavLink({
    nextPageIndex,
    tableOfContentArr,
    pageUrl,
    catalogIndex,
    children,
    color,
    textDecoration
}) {
    let href = {
        pathname: '/[[...pageUrl]]',
        query: { pageUrl: [] },
    }
    let title = ''

    if (nextPageIndex < tableOfContentArr.length) {
        href.query.pageUrl = [pageUrl[0], tableOfContentArr[nextPageIndex].url]
        title = tableOfContentArr[nextPageIndex].title
    } else {
        const nextCatalogIndex = catalogIndex + 1
        if (Number.isNaN(nextCatalogIndex)) {
            return nextCatalogIndex - 1
        }
        if (nextCatalogIndex >= children.length) {
            title = 'Назад к руководствам'
            href = { pathname: '/' }
        } else {
            const nextCatalog = getCatalogOptions(children[nextCatalogIndex])
            title = nextCatalog.title
            href.query.pageUrl = [nextCatalog.url]
        }
    }

    return (
        <Link
            style={{ color }}
            className={cn(styles.arrowNavLink)}
            href={href}
        >
            <span className={cn(styles.arrowNavLinkNext)}>
                Далее
            </span>
            
            <br />
            
            <span className={cn(styles.arrowNavLinkNextText)} style={{ textDecorationColor: textDecoration }}>
                {tp.execute(title)}
            </span>
        </Link>
    )
}
