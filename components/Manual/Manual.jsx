import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'

import styles from './manual.module.css'

import { API_HOST } from '../../consts/endpoints'

function Manual({ manual }) {
    // TODO remove
    // const imageUrl = manual.cover
    const titleArr = manual?.properties?.Name?.title
    const titleText = titleArr.length > 0 ? titleArr[0]?.text?.content : ''
    const pageUrl = manual?.properties?.pageUrl?.url
    // TODO check color
    const color = manual?.properties?.color || '#44a20d'
    // TODO Add new fields
    // const status = manual?.properties?.status
    // const publishedDate
    // const previewPattern = manual?.properties?.previewPattern

    console.log(API_HOST)

    return (
        <Link
            href={{
                pathname: '/[[...pageUrl]]',
                query: { pageUrl: [pageUrl] },
            }}
            className={styles.manual}
        >
            <div className={styles.manualInner} style={{ color }}>
                <div className={styles.manualTitle}>{titleText}</div>

                {/* <div className={cn(styles.manualStatus, styles.manualStatusUpdated)}>
                    Обновилось
                </div> */}

                <div className={cn(styles.manualStatus, styles.manualStatusNew)}>Новое!</div>

                <div className={styles.manualDate}>12.02.2022</div>

                <Image
                    src="https://svgshare.com/getbyhash/sha1-EBeV3z7BzWIsTwfZjwWo3FzcOWo="
                    alt=""
                    layout="fill"
                />
            </div>
        </Link>
    )
}

export default Manual
