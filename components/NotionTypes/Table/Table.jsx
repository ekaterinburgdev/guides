import React from 'react'

import styles from './Table.module.css'

export default function Table({ columnItem }) {
    return (
        <div className={styles.Table__container}>
            <table className={styles.Table}>
                {columnItem.children.map((child, i) => (
                    <tr key={`${child.id}${i}`}>
                        {child?.content?.cells?.map((cell, i) => (
                            <td key={`${cell[0]?.plain_text}${i}`}>{cell[0]?.plain_text}</td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    )
}
