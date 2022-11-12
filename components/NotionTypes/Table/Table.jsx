import React from 'react'

import styles from './Table.module.css'

export default function Table({ columnItem }) {
    return (
        <div className={styles.Table__container}>
            <table className={styles.Table}>
                {columnItem.children.map((child) => (
                    <tr key={child.id}>
                        {child?.content?.cells?.map((cell) => (
                            <td key={cell[0]?.plain_text}>{cell[0]?.plain_text}</td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    )
}
