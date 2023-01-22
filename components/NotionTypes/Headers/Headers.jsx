import React from 'react'
import Balancer from 'react-wrap-balancer'

import { getHeaderContent } from '../../../utils/notionTypeParser/textParser'
import styles from './Headers.module.css'

export function H1({ columnItem }) {
    return (
        <h1 id={columnItem.id} className={styles.heading1}>
            <Balancer>{getHeaderContent(columnItem)}</Balancer>
        </h1>
    )
}

export function H2({ columnItem }) {
    return (
        <h2 id={columnItem.id} className={styles.heading2}>
            <Balancer>{getHeaderContent(columnItem)}</Balancer>
        </h2>
    )
}

export function H3({ columnItem }) {
    return (
        <h3 id={columnItem.id} className={styles.heading3}>
            <Balancer>{getHeaderContent(columnItem)}</Balancer>
        </h3>
    )
}
