import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './Suggestions.module.css'
import { getCSSVarsColors } from '../../../utils/getCSSVarsColors'

const SuggestItem = ({ suggest }) => {
    const {
        link,
        text: { left: leftText, target, right: rightText },
    } = suggest
    return (
        <li className={styles.SuggestItemListItem}>
            <Link className={styles.SuggestItemLink} href={`/${link}`}>
                <span className={styles.SuggestItemSuggestionText}>{leftText}</span>
                <span className={styles.SuggestItemTarget}>{target}</span>
                <span className={styles.SuggestItemSuggestionText}>{rightText}</span>
            </Link>
        </li>
    )
}

const SectionSuggestion = ({ section }) => {
    const { sectionName, suggestions } = section
    return (
        <div className={styles.SectionSuggestion}>
            <p className={styles.SectionSuggestionTitle}>{sectionName}</p>
            <ul className={styles.SectionSuggestionList}>
                {suggestions?.map((suggest, i) => (
                    <SuggestItem suggest={suggest} key={i} />
                ))}
            </ul>
        </div>
    )
}

const GuideSuggestion = ({ guide }) => {
    const { title, sections, color } = guide
    return (
        <article className={styles.GuideSuggestion} style={{ ...getCSSVarsColors(color) }}>
            <div className={styles.imageContainer}>
                <h3 className={styles.GuideSuggestionTitle}>{title}</h3>
            </div>
            {sections?.map((section, i) => (
                <SectionSuggestion section={section} key={i} />
            ))}
        </article>
    )
}

function getGuides({ items, currentUrl }) {
    const collator = new Intl.Collator('ru', {
        numeric: true,
        sensitivity: 'base',
        ignorePunctuation: true,
    })
    return items.reduce((acc, item) => {
        const title = item?.properties.properties?.Name?.title[0]?.plain_text
        const color = item?.properties.properties?.color?.rich_text[0]?.plain_text
        const sections = item?.sectionSuggestions.sort((a, b) =>
            collator.compare(a.sectionName, b.sectionName)
        )
        const guideSuggestion = { title, sections, color }
        const url = item?.properties?.properties?.pageUrl?.url
        if (url !== currentUrl) {
            return [...acc, guideSuggestion]
        }
        return [guideSuggestion, ...acc]
    }, [])
}

export const Suggestions = ({ items, query, isLoading }) => {
    const { asPath } = useRouter()
    const currentUrl = asPath.split('/').filter(Boolean).at(0)
    const guides = getGuides({ items, currentUrl })
    return (
        <div className={styles.SuggestionsContainer}>
            {items.length > 0 &&
                guides?.map((guide, i) => <GuideSuggestion guide={guide} key={i} />)}
            {items.length === 0 && query.length > 0 && !isLoading && (
                <p className={styles.SuggestionsNotFound}>Ничего не нашли</p>
            )}
        </div>
    )
}
