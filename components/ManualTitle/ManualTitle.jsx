import React from 'react'
import cn from 'classnames'
import { tUI } from '../../utils/typograf'
import Link from 'next/link'

import styles from './ManualTitle.module.css'

export function ManualTitle({ title, pageUrl }) {
    return (
        <div className={cn(styles.ManualTitle)}>
            <Link href="/" className={cn(styles.ManualTitle__mainpage)}>
                Все руководства
            </Link>
            <Link
                href={{
                    pathname: '/[[...pageUrl]]',
                    query: { pageUrl },
                }}
                className={cn(styles.ManualTitle__caption)}
            >
                {tUI(title)}
            </Link>
        </div>
    )
}
