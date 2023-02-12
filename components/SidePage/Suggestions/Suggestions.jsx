import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { API_HOST } from '../../../consts/endpoints'
import styles from './Suggestions.module.css'
import getManualColorScheme from '../../../utils/getManualColorScheme.js'

const SuggestItem = ({ suggest, colorHex }) => {
    const [origin, setOrigin] = useState('')

    useEffect(() => {
        setOrigin(window.location.origin)
    }, [])

    const { asPath } = useRouter()
    const currentSection = asPath.split('/').filter(Boolean).at(1)
    const link = `${origin}/${suggest?.link}`
    const leftText =
        suggest?.text?.left.length >= 3 ? '...' + suggest?.text?.left : suggest?.text?.left
    const target = suggest?.text?.target
    const rightText =
        suggest?.text?.right.length >= 3 ? suggest?.text?.right + '...' : suggest?.text?.right

    const backgroundColor = getManualColorScheme(colorHex).bgLight.alpha(0.05)

    return (
        <li className={styles.SuggestItem__listItem} style={{ backgroundColor }}>
            <Link
                className={styles.SuggestItem__link}
                href={link.includes(currentSection) ? '' : link}
            >
                <span className={styles.SuggestItem__suggestionText}>{leftText}</span>
                <span className={styles.SuggestItem__target}>{target}</span>
                <span className={styles.SuggestItem__suggestionText}>{rightText}</span>
            </Link>
        </li>
    )
}

const SectionSuggestion = ({ section, colorHex }) => {
    const sectionName = section?.sectionName
    const suggestions = section?.suggestions

    return (
        <div>
            <p style={{ color: colorHex }} className={styles.SectionSuggestion__title}>
                {sectionName}
            </p>
            <ul className={styles.SectionSuggestion__list}>
                {suggestions?.map((suggest) => (
                    <SuggestItem suggest={suggest} colorHex={colorHex} />
                ))}
            </ul>
        </div>
    )
}

const GuideSuggestion = ({ guideSuggestion }) => {
    const title = guideSuggestion?.properties.properties?.Name?.title[0]?.plain_text
    const colorHex = guideSuggestion?.properties.properties?.color?.rich_text[0]?.plain_text
    const icon = guideSuggestion?.properties.properties?.previewPattern?.at(0)
    const collator = new Intl.Collator('ru', {
        numeric: true,
        sensitivity: 'base',
    })
    const sections = guideSuggestion?.sectionSuggestions.sort((a, b) =>
        collator.compare(a.sectionName, b.sectionName)
    )

    return (
        <article className={styles.GuideSuggestion}>
            <div className={styles.image__container}>
                <Image className={styles.image} fill src={`${API_HOST}/static/${icon}`} alt="" />
                <h3
                    style={{
                        color: colorHex,
                    }}
                    className={styles.GuideSuggestion__title}
                >
                    {title}
                </h3>
            </div>
            {sections?.map((section) => (
                <SectionSuggestion colorHex={colorHex} section={section} />
            ))}
        </article>
    )
}

export const Suggestions = ({ guideSuggestions }) => {
    const { asPath } = useRouter()
    const currentUrl = asPath.split('/').filter(Boolean).at(0)
    const guides = guideSuggestions.reduce((acc, element) => {
        const url = element?.properties?.properties?.pageUrl?.url
        if (url !== currentUrl) {
            return [...acc, element]
        }
        return [element, ...acc]
    }, [])

    return (
        <div className={styles.Suggestions__container}>
            {guides?.map((guideSuggest) => (
                <GuideSuggestion guideSuggestion={guideSuggest} />
            ))}
        </div>
    )
}
