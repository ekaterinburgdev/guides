import React from 'react'

import { getTextContent } from '../../../../utils/notionTypeParser/textParser'
import styles from './ordered.module.css'

export function OrderedList({ columnItem }) {
    return (
        <ol className={styles.ol}>
            {columnItem.children.map((li) => (
                <li className={styles.li} key={li.id}>
                    {getTextContent(li, true)}
                </li>
            ))}
        </ol>
    )
}

export default OrderedList
