import React from 'react'
import Image from 'next/image'

import { API_HOST } from '../../../consts/endpoints'

const SuggestItem = (suggest) => {
    const hostname =
        typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : ''

    const link = `${hostname}/${suggest?.suggest?.link}`
    const leftText = suggest?.suggest?.text?.left
    const target = suggest?.suggest?.text?.target
    const rightText = suggest?.suggest?.text?.right

    return (
        <a href={link}>
            {leftText}
            <span style={{ fontWeight: 500 }}>{target}</span>
            {rightText}
        </a>
    )
}

const SectionSuggestion = (section, colorHex) => {
    const sectionName = section?.section?.sectionName
    const suggestions = section?.section?.suggestions

    console.log(colorHex)

    return (
        <>
            <p style={{ color: colorHex }}>{sectionName}</p>
            <div>
                {suggestions.map((suggest) => (
                    <SuggestItem suggest={suggest} />
                ))}
            </div>
        </>
    )
}

const GuideSuggestion = (guideSuggestion) => {
    const title = guideSuggestion?.guideSuggestion?.properties?.Name?.title[0]?.plain_text
    const colorHex = guideSuggestion?.guideSuggestion?.properties?.color?.rich_text[0]?.plain_text
    const icon = guideSuggestion?.guideSuggestion?.properties?.previewImage?.at(0)
    const sections = guideSuggestion?.guideSuggestion?.sections

    console.log(title)

    return (
        <article>
            <div>
                <Image width={28} height={28} src={`${API_HOST}/static/${icon}`} />
                <h3 style={{ color: colorHex }}>{title}</h3>
            </div>
            {sections.map((section) => (
                <SectionSuggestion colorHex={colorHex} section={section} />
            ))}
        </article>
    )
}

export const Suggestions = (data) => {
    const search = data?.data?.guideSuggestions

    return (
        <div>
            {search.map((guideSuggest) => (
                <GuideSuggestion guideSuggestion={guideSuggest} />
            ))}
        </div>
    )
}
