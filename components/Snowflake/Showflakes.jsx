import React from 'react'

import styles from './Snowflake.module.css'

export default function Showflakes() {
    return (
        <div aria-hidden="true">
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
