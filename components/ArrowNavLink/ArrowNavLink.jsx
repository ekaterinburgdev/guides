import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import t from '../../utils/typograf'

import styles from './ArrowNavLink.module.css'

export function ArrowNavLink({ nextPageIndex, tableOfContentArr, pageUrl, catalogIndex }) {
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
    }

    return (
        <Link className={cn(styles.ArrowNavLink)} href={href}>
            <span className={cn(styles.ArrowNavLinkNext)}>Далее</span>

            <br />

            <span className={cn(styles.ArrowNavLinkNextText)}>{t(title)}</span>
        </Link>
    )
}
