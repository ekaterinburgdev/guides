import React from 'react'

import { SearchSuggestionItem } from '../SearchSuggestionItem/SearchSuggestionItem'
import styles from './SearchSuggestion.module.css'

export function SearchSuggestion({ suggestions }) {
    if (suggestions.length === 0) {
        return null
    }

    return (
        <section className={styles.SearchSuggestion__container}>
            <ul>
                {suggestions.map((suggestion, i) => (
                    <li key={i}>
                        <SearchSuggestionItem suggestion={suggestion} />
                    </li>
                ))}
            </ul>
        </section>
    )
}
