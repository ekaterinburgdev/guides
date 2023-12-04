import React from 'react'

import { getNotionColor } from './colors'

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

        const stylePar = {
            fontWeight: par?.annotations?.bold ? '500' : '300',
            color: getNotionColor(par?.annotations?.color),
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

        const isLink = par?.text?.link?.url
        const textFragmentHtml = {
            dangerouslySetInnerHTML: { __html: textContent.replaceAll('\n', '<br>') },
        }

        return isLink ? (
            <a href={url} target="_blank" className={styles.link} {...textFragmentHtml} />
        ) : (
            <span style={{ ...stylePar }} {...textFragmentHtml} />
        )
    })

export const getListItem = (columnItem) => {
    columnItem.children.map((li, i) => <li key={`${li.id}${i}`}>{getTextContent(li, true)}</li>)
}
