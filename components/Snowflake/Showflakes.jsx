import React from 'react'

import styles from './Snowflake.module.css'

export default function Showflakes() {
    return (
        <div className="snowflakes" aria-hidden="true">
            <div className={styles.snowflake}>❅</div>
            <div className={styles.snowflake}>❅</div>
            <div className={styles.snowflake}>❆</div>
            <div className={styles.snowflake}>❄</div>
            <div className={styles.snowflake}>❅</div>
            <div className={styles.snowflake}>❆</div>
            <div className={styles.snowflake}>❄</div>
            <div className={styles.snowflake}>❅</div>
            <div className={styles.snowflake}>❆</div>
            <div className={styles.snowflake}>❄</div>
        </div>
    )
}
