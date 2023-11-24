import React from 'react'
import styles from './Iframe.module.css'

export const Iframe = ({ src }) => {
    return (
        <iframe src={src} className={styles.Iframe} loading="lazy" />
    )
}
