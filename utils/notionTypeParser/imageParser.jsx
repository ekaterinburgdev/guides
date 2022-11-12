import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import styles from '../../components/ManualPage/ManualPage.module.css'

const getImage = (imageObj) => {
    const cn = classNames(styles.Manual__image, {
        [styles.Manual__image_svg]: String(imageObj.content.image_name).includes('svg'),
    })

    if (imageObj.content.image_data.caption.length === 0) {
        return (
            <div className={styles.Manual__image__container}>
                <Image
                    className={cn}
                    src={`${process.env.HOST}/static/${imageObj.content.image_name}`}
                    alt=""
                    fill
                />
            </div>
        )
    }
    
    return (
        <div className={styles.Manual__image__container}>
            <Image
                className={styles.Manual__image}
                src={`${process.env.HOST}/static/${imageObj.content.image_name}`}
                alt={imageObj.content.image_data.caption[0].plain_text}
                fill
            />
            <span className={styles.Manual__image_description} aria-hidden="true">
                {imageObj.content.image_data.caption[0].plain_text}
            </span>
        </div>
    )
}

export default getImage
