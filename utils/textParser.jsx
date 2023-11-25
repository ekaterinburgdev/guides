import React from 'react'

import tp from './typograf/typograf.config'

import styles from './text.module.css'

export const getHeaderContent = (item) =>
    item.content.text.map((par) => {
        const textContent = tp.execute(par?.text?.content)

        if (!textContent) {
            return
        }

        return textContent
    })

export const getTextContent = (item, useTypograf = false) =>
    item.content.text.map((par) => {
        const textContent = useTypograf ? tp.execute(par?.text?.content) : par?.text?.content
        const url = par?.text?.link?.url ?? null
        const colorMapObject = {
            blue: 'rgba(51, 126, 169, 1)',
            yellow: 'rgb(203, 145, 47)',
            red: 'rgba(212, 76, 71, 1)',
            green: 'rgba(68, 131, 97, 1)',
            gray: 'rgba(120, 119, 116, 1)',
            default: 'black',
        }

        const stylePar = {
            fontWeight: par?.annotations?.bold ? '500' : '300',
            color: par?.annotations?.color
                ? colorMapObject[par?.annotations?.color] ?? par?.annotations?.color
                : 'black',
            fontStyle: par?.annotations?.italic ? 'italic' : 'normal',
            // eslint-disable-next-line no-nested-ternary
            textDecoration: par?.annotations?.underline
                ? par?.annotations?.strikethrough
                    ? 'line-through'
                    : 'underline'
                : 'none',
            filter: par?.annotations?.color === 'yellow' ? 'contrast(0.6)' : 'contrast(1)',
        }

        if (!textContent) {
            return
        }

        // eslint-disable-next-line consistent-return
        return par?.text?.link?.url ? (
            <a className={styles.link} key={textContent} target="_blank" href={url}>
                {textContent}
            </a>
        ) : (
            <span style={{ ...stylePar }} key={textContent}>
                {textContent}
            </span>
        )
    })

export const getListItem = (columnItem) => {
    columnItem.children.map((li, i) => <li key={`${li.id}${i}`}>{getTextContent(li, true)}</li>)
}
