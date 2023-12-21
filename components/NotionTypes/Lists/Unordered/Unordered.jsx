import React from 'react'
import { getTextContent } from '../../../../lib/getNotionContentItems'
import styles from './Unordered.module.css'

function UnorderedList({ columnItem }) {
    return (
        <ul className={styles.ul}>
            {columnItem.children.map((li, i) => (
                <li className={styles.li} key={`${li.id}${i}`}>
                    {getTextContent(li, true)}
                </li>
            ))}
        </ul>
    )
}

export default UnorderedList
