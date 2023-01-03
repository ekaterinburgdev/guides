import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import Image from 'next/image'

import getManualColorScheme from '../../utils/getManualColorScheme'

import styles from './ManualPreview.module.css'

function ManualPreview({ title, subtitle, pageUrl, color, status, publishedDate, pattern, image }) {
    const colorScheme = getManualColorScheme(color)
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
                <div style={{ position: 'absolute', top: '-0.5em', left: '-0.5em' }}>
                    <svg
                        width="24"
                        height="24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ny-icon ng-star-inserted"
                    >
                        <path
                            d="M10.93 21.15c-2.57.37-2.88-1.58-2.53-3 .06-.22.16-.43.3-.61.84-1.26 3.16-2.64 4.86-4.5 2.2-2.38 4.22-5.43 5.73-6.34.25-.15.49-.24.7-.26 2.76-.26 2.9 1.58 2.54 3-.36 1.42-3.87 4.67-7.28 7.61-1.6 1.39-3.5 3.99-4.32 4.1Z"
                            fill="#DDD"
                            stroke="#3B3A3A"
                        />
                        <path
                            d="M19.3 6.7c-1.52.91-3.54 3.96-5.74 6.35-1.7 1.85-4.02 3.23-4.87 4.49-1.95-.8.5-6.36 0-5.86-1 1-1.4 6.9-2.19 8.82H5C4.23 16.4 3.4 9.9 7.45 6.29c3.46-3.1 8.72-1.37 11.84.41Z"
                            fill="#CC4747"
                            stroke="#3B3A3A"
                        />
                        <path
                            d="M7.6 20.5a2.5 2.5 0 1 1-3.82-3.23A2.5 2.5 0 0 1 7.6 20.5Z"
                            fill="#DDD"
                            stroke="#3B3A3A"
                            strokeWidth=".5"
                        />
                    </svg>
                </div>
                <div
                    className={styles.manualBackground}
                    style={{
                        backgroundColor: colorScheme.bgLight,
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
                    <time className={styles.manualDate}>
                        {new Date(publishedDate).toLocaleDateString('ru')}
                    </time>
                )}

                {image && (
                    <div className={styles.manualIcon}>
                        <Image src={image} alt="" fill />
                    </div>
                )}
            </div>
        </Link>
    )
}

export default ManualPreview
