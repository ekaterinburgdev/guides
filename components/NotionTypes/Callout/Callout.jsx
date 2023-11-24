import React from 'react'
import Image from 'next/image'

import { getTextContent } from '../../../utils/textParser'

import styles from './Callout.module.css'

export const Callout = ({ columnItem }) => {
    const iconUrl = columnItem?.content?.icon?.external?.url
    const text = getTextContent(columnItem, true)

    return (
        <div className={styles.Callout__container}>
            <Image className={styles.Callout__icon} width={25} height={25} src={iconUrl} alt="" />
            <div>{text}</div>
        </div>
    )
}
