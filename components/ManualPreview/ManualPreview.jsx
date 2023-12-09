import React from 'react'
import Link from 'next/link'
import cn from 'classnames'

import { getCSSVarsColors } from '../../utils/getCSSVarsColors'

import styles from './ManualPreview.module.css'

function ManualPreview({ title, subtitle, pageUrl, color, status, publishedDate, pattern }) {
    return (
        <Link
            href={{
                pathname: '/[[...pageUrl]]',
                query: { pageUrl: [pageUrl] },
            }}
            className={styles.manual}
            style={{ ...getCSSVarsColors(color) }}
        >
            <div className={styles.manualInner}>
                <div
                    className={styles.manualBackground}
                    style={{ backgroundImage: pattern && `url(${pattern})` }}
                />
                {title && <div className={styles.manualTitle}>{title}</div>}
                {subtitle && <div className={styles.manualSubtitle}>{subtitle}</div>}

                {status && (
                    <div
                        className={cn(styles.manualStatus, {
                            [`${styles.manualStatusNew}`]: status === 'Новое',
                            [`${styles.manualStatusUpdated}`]: status === 'Обновлено',
                        })}
                    >
                        {status}
                    </div>
                )}

                {publishedDate && (
                    <time className={styles.manualDate}>
                        {new Date(publishedDate).toLocaleDateString('ru')}
                    </time>
                )}
            </div>
        </Link>
    )
}

export default ManualPreview
