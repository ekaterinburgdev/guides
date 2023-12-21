import React from 'react'
import { getTextContent } from '../../../../lib/getNotionContentItems'
import styles from './paragraph.module.css'

function Paragraph({ columnItem }) {
    const textContent = getTextContent(columnItem, true)
    return textContent.length ? <p className={styles.p}>{textContent}</p> : <br />
}

export default Paragraph
