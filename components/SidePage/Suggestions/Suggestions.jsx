import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { API_HOST } from '../../../consts/endpoints'
import styles from './Suggestions.module.css'

import getManualColorScheme from '../../../utils/getManualColorScheme.js'

const SuggestItem = ({ suggest, colorHex }) => {
    const {
        link,
        text: { left: leftText, target, right: rightText },
    } = suggest
    const backgroundColor = getManualColorScheme(colorHex).bgLight.alpha(0.05)
    return (
        <li className={styles.SuggestItem__listItem} style={{ backgroundColor }}>
            <Link className={styles.SuggestItem__link} href={`/${link}`}>
                <span className={styles.SuggestItem__suggestionText}>{leftText}</span>
                <span className={styles.SuggestItem__target}>{target}</span>
                <span className={styles.SuggestItem__suggestionText}>{rightText}</span>
            </Link>
        </li>
    )
}

const SectionSuggestion = ({ section, colorHex }) => {
    const { sectionName, suggestions } = section
    return (
        <div>
            <p style={{ color: colorHex }} className={styles.SectionSuggestion__title}>
                {sectionName}
            </p>
            <ul className={styles.SectionSuggestion__list}>
                {suggestions?.map((suggest, i) => (
                    <SuggestItem suggest={suggest} colorHex={colorHex} key={i} />
                ))}
            </ul>
        </div>
    )
}

const GuideSuggestion = ({ guide }) => {
    const { title, colorHex, icon, sections } = guide
    return (
        <article className={styles.GuideSuggestion}>
            <div className={styles.image__container}>
                <Image className={styles.image} fill src={`${API_HOST}/static/${icon}`} alt="" />
                <h3 style={{ color: colorHex }} className={styles.GuideSuggestion__title}>
                    {title}
                </h3>
            </div>
            {sections?.map((section, i) => (
                <SectionSuggestion colorHex={colorHex} section={section} key={i} />
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
        const colorHex = item?.properties.properties?.color?.rich_text[0]?.plain_text
        const icon = item?.properties.properties?.previewPattern?.at(0)
        const sections = item?.sectionSuggestions.sort((a, b) =>
            collator.compare(a.sectionName, b.sectionName)
        )
        const guideSuggestion = { title, colorHex, icon, sections }
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
        <div className={styles.Suggestions__container}>
            {items.length > 0 &&
                guides?.map((guide, i) => <GuideSuggestion guide={guide} key={i} />)}
            {items.length === 0 && query.length > 0 && !isLoading && (
                <p className={styles.Suggestions__not_found}>Ничего не нашли</p>
            )}
        </div>
    )
}
