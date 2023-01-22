import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import rgbaToRgb from 'rgba-to-rgb'

import getManualColorScheme from '../../utils/getManualColorScheme'

import styles from './ManualPreview.module.css'

function ManualPreview({ title, subtitle, pageUrl, color, status, publishedDate, pattern }) {
    const colorScheme = getManualColorScheme(color)

    const timeBgColor = rgbaToRgb(
        'rgb(255, 255, 255)',
        `rgba(${Math.trunc(colorScheme.manual[0])}, ${Math.trunc(
            colorScheme.manual[1]
        )}, ${Math.trunc(colorScheme.manual[2])}, ${colorScheme.manual})`
    )

    return (
        <Link
            href={{
                pathname: '/[[...pageUrl]]',
                query: { pageUrl: [pageUrl] },
            }}
            className={styles.manual}
            style={{ background: colorScheme.bgDark }}
        >
            <div className={styles.manualInner} style={{ color: colorScheme.title }}>
                <div
                    className={styles.manualBackground}
                    style={{
                        backgroundColor: colorScheme.manual,
                        backgroundImage: pattern && `url(${pattern})`,
                    }}
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
                    <time
                        style={{ backgroundColor: timeBgColor, opacity: 1 }}
                        className={styles.manualDate}
                    >
                        {new Date(publishedDate).toLocaleDateString('ru')}
                    </time>
                )}
            </div>
        </Link>
    )
}

export default ManualPreview
