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
            <div className={styles.manualInner} style={{ color }}>
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
