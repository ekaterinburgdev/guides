import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { API_HOST } from '../../consts/endpoints'
import styles from '../../components/ManualPage/ManualPage.module.css'

function GuideImage({ notionType }) {
    const cn = classNames(styles.Manual__image, {
        [styles.Manual__image_svg]: String(notionType.content.image_name).includes('svg'),
    })

    const image = (
        <>
            <Image
                className={cn}
                src={`${API_HOST}/static/${notionType.content.image_name}`}
                fill
            />
        </>
    )

    if (notionType.content.image_data.caption.length === 0) {
        return <div className={styles.Manual__image__container}>{image}</div>
    }

    return (
        <div className={styles.Manual__image__container}>
            {image}
            <span className={styles.Manual__image_description}>
                {notionType.content.image_data.caption[0].plain_text}
            </span>
        </div>
    )
}

export default GuideImage
