import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { API_HOST } from '../../../consts/endpoints'
import styles from './Suggestions.module.css'

import getManualColorScheme from '../../../utils/getManualColorScheme.js'
import rgbaToRgb from 'rgba-to-rgb'

const SuggestItem = ({ suggest, colorHex }) => {
    const {
        link,
        text: { left: leftText, target, right: rightText },
    } = suggest
    const backgroundColor = getManualColorScheme(colorHex).bgLight
    return (
        <li className={styles.SuggestItemListItem} style={{ backgroundColor }}>
            <Link className={styles.SuggestItemLink} href={`/${link}`}>
                <span className={styles.SuggestItemSuggestionText}>{leftText}</span>
                <span className={styles.SuggestItemTarget}>{target}</span>
                <span className={styles.SuggestItemSuggestionText}>{rightText}</span>
            </Link>
        </li>
    )
}

const SectionSuggestion = ({ section, colorHex }) => {
    const { sectionName, suggestions } = section
    return (
        <div className={styles.SectionSuggestion}>
            <p style={{ color: colorHex }} className={styles.SectionSuggestionTitle}>
                {sectionName}
            </p>
            <ul className={styles.SectionSuggestionList}>
                {suggestions?.map((suggest, i) => (
                    <SuggestItem suggest={suggest} colorHex={colorHex} key={i} />
                ))}
            </ul>
        </div>
    )
}

const GuideSuggestion = ({ guide }) => {
    const { title, colorHex, icon, sections } = guide
    const bgColor = getManualColorScheme(colorHex).bgLight
    const asideColor = rgbaToRgb(
        'rgb(255, 255, 255)',
        `rgba(${Math.trunc(bgColor.color[0])}, ${Math.trunc(bgColor.color[1])}, ${Math.trunc(
            bgColor.color[2]
        )}, ${bgColor.valpha})`
    )
    return (
        <article className={styles.GuideSuggestion} style={{ backgroundColor: asideColor }}>
            <div className={styles.imageContainer}>
                <Image className={styles.image} fill src={`${API_HOST}/static/${icon}`} alt="" />
                <h3 style={{ color: colorHex }} className={styles.GuideSuggestionTitle}>
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
        <div className={styles.SuggestionsContainer}>
            {items.length > 0 &&
                guides?.map((guide, i) => <GuideSuggestion guide={guide} key={i} />)}
            {items.length === 0 && query.length > 0 && !isLoading && (
                <p className={styles.SuggestionsNotFound}>Ничего не нашли</p>
            )}
        </div>
    )
}
