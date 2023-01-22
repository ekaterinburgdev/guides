import Image from 'next/image'
import React from 'react'

import styles from './File.module.css'

function File({ columnItem }) {
    const src = columnItem?.content?.external?.url

    return (
        <div className={styles.File__container}>
            <Image width={32} height={32} src="/pdfIcon.svg" />
            <a className={styles.File__link} href={src}>
                Ссылка на файл
            </a>
        </div>
    )
}

export default File
