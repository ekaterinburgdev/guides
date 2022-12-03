import React from 'react'
import Link from 'next/link'
import cn from 'classnames'
import Image from 'next/image'
import tp from '../../utils/typograf/typograf.config'

import styles from './manual.module.css'

function Manual({ manual }) {
    const properties = manual?.properties
    const title = properties?.Name?.title[0]?.text?.content
    const pageUrl = properties?.pageUrl?.url

    const color = properties?.color.rich_text[0].plain_text
    const status = properties?.status?.select?.name
    const publishedDate = properties?.publishedDate?.date?.start

    // TODO Add `previewPattern`
    const pattern = null
    // TODO Add `previewImage`
    const image = null

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

                {/* TODO get `manualIcon` from back-end */}
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
