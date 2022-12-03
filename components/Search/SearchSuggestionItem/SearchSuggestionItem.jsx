import React from 'react'
import Link from 'next/link'

import styles from './SearchSuggestionItem.module.css'

export function SearchSuggestionItem({ suggestion }) {
    return (
        <article className={styles.SearchSuggestionItem__container}>
            <h4 className={styles.SearchSuggestionItem__header}>
                {suggestion.guide_name} / {suggestion.guide_section}
            </h4>
            <Link
                className={styles.SearchSuggestionItem__link}
                href={`https://guides.ekaterinburg.design/${suggestion.page_url}`}
            >
                <span dangerouslySetInnerHTML={{ __html: suggestion.text }} />
            </Link>
        </article>
    )
}
