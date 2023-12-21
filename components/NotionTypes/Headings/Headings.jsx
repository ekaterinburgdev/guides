import React from 'react'
import { getHeaderContent } from '../../../utils/getNotionContentItems'
import styles from './Headings.module.css'

export function H1({ columnItem }) {
    return (
        <h2 id={columnItem.id} className={styles.heading1}>
            <a href={`#${columnItem.id}`}>{getHeaderContent(columnItem)}</a>
        </h2>
    )
}

export function H2({ columnItem }) {
    return (
        <h3 id={columnItem.id} className={styles.heading2}>
            <a href={`#${columnItem.id}`}>{getHeaderContent(columnItem)}</a>
        </h3>
    )
}

export function H3({ columnItem }) {
    return (
        <h4 id={columnItem.id} className={styles.heading3}>
            <a href={`#${columnItem.id}`}>{getHeaderContent(columnItem)}</a>
        </h4>
    )
}
