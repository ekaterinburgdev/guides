import React from 'react'
import { getTextContent } from '../../../lib/getNotionContentItems'
import { getNotionColor } from '../../../lib/getNotionContentColor'
import styles from './Callout.module.css'

export const Callout = ({ columnItem }) => {
    let icon
    switch (columnItem?.content?.icon.icon.name) {
        case 'checkmark':
            icon = '✅'
            break
        case 'clear':
            icon = '❌'
            break
        default:
            console.log(columnItem?.content?.icon.icon.name)
    }

    const text = getTextContent(columnItem, true)
    const color = getNotionColor(columnItem?.content?.color)

    return (
        <div className={styles.Callout__container}>
            {icon}
            <div style={{ color }}>{text}</div>
        </div>
    )
}
