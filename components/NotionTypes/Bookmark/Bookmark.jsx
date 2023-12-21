import React from 'react'

import styles from './Bookmark.module.css'

function Bookmark({ columnItem }) {
    return (
        <a className={styles.Bookmark} href={`${columnItem.content.url}`}>
            {columnItem.content.url}
        </a>
    )
}

export default Bookmark
