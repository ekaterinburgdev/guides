import React from 'react'
import Image from 'next/image'

import { API_HOST } from '../../../consts/endpoints'
import styles from './Suggestions.module.css'

const SuggestItem = (suggest) => {
    const hostname =
        typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : ''

    const link = `${hostname}/${suggest?.suggest?.link}`
    const leftText = suggest?.suggest?.text?.left
    const target = suggest?.suggest?.text?.target
    const rightText = suggest?.suggest?.text?.right

    return (
        <li className={styles.SuggestItem__listItem}>
            <a className={styles.SuggestItem__link} href={link}>
                {leftText}
                <span className={styles.SuggestItem__target}>{target}</span>
                {rightText}
            </a>
        </li>
    )
}

const SectionSuggestion = ({ section, colorHex }) => {
    const sectionName = section?.sectionName
    const suggestions = section?.suggestions

    return (
        <>
            <p style={{ color: colorHex, fontWeight: 500 }}>{sectionName}</p>
            <ul className={styles.SectionSuggestion__list}>
                {suggestions.map((suggest) => (
                    <SuggestItem suggest={suggest} />
                ))}
            </ul>
        </>
    )
}

const GuideSuggestion = ({ guideSuggestion }) => {
    const title = guideSuggestion?.properties?.Name?.title[0]?.plain_text
    const colorHex = guideSuggestion?.properties?.color?.rich_text[0]?.plain_text
    const icon = guideSuggestion?.properties?.previewImage?.at(0)
    const sections = guideSuggestion?.sections

    return (
        <article className={styles.GuideSuggestion}>
            <div className={styles.GuideSuggestion__title}>
                <Image width={28} height={28} src={`${API_HOST}/static/${icon}`} />
                <h3
                    style={{
                        color: colorHex,
                        fontSize: '24px',
                        marginBottom: '0px',
                    }}
                >
                    {title}
                </h3>
            </div>
            {sections.map((section) => (
                <SectionSuggestion colorHex={colorHex} section={section} />
            ))}
        </article>
    )
}

export const Suggestions = ({ data }) => {
    const search = data?.guideSuggestions

    return (
        <div className={styles.Suggestions__container}>
            {search.map((guideSuggest) => (
                <GuideSuggestion guideSuggestion={guideSuggest} />
            ))}
        </div>
    )
}
