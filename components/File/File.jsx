import Image from 'next/image'
import React from 'react'

import styles from './File.module.css'

function File({ columnItem }) {
    const src = columnItem?.content?.file?.url

    return (
        <a className={styles.File__container} href={src}>
            <Image width={32} height={32} src="/pdfIcon.svg" alt="pdf icon" />
            <p className={styles.File__link}>Ссылка на файл</p>
        </a>
    )
}

export default File
