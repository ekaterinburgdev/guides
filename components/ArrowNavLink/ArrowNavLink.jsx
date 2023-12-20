import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import t from '../../utils/typograf'

import styles from './arrow.module.css'

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
        <Link className={cn(styles.arrowNavLink)} href={href}>
            <span className={cn(styles.arrowNavLinkNext)}>Далее</span>

            <br />

            <span className={cn(styles.arrowNavLinkNextText)}>{t(title)}</span>
        </Link>
    )
}
