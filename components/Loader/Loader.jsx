import React from 'react'

import styles from './loader.module.css'

export function Loader({ isLoading }) {
    return (
        <div style={{ opacity: isLoading ? '1' : '0' }} className={styles.circles} id="circles">
            <div className={`${styles.circle} ${styles.first}`} />
            <div className={`${styles.circle} ${styles.second}`} />
            <div className={`${styles.circle} ${styles.third}`} />
        </div>
    )
}
