import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import Image from 'next/image'
import tp from '../../utils/typograf/typograf.config'

import styles from './manual.module.css'

function Manual({ title, subtitle, pageUrl, color, status, publishedDate, pattern, image }) {
    return (
        <Link
            href={{
                pathname: '/[[...pageUrl]]',
                query: { pageUrl: [pageUrl] },
            }}
            className={styles.manual}
        >
            <div
                className={styles.manualInner}
                style={{ color, backgroundImage: pattern ? `url(${pattern})` : null }}
            >
                {title && <div className={styles.manualTitle}>{tp.execute(title)}</div>}
                {subtitle && <div className={styles.manualSubtitle}>{tp.execute(subtitle)}</div>}

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
                        <Image src={image} alt="" layout="fill" />
                    </div>
                )}
            </div>
        </Link>
    )
}

export default Manual
