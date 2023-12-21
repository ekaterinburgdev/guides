import React from 'react'
import styles from './code.module.css'

export default function Code({ columnItem }) {
    const text = columnItem?.content?.text?.plain_text
    return <code className={styles.code}>{text}</code>
}
