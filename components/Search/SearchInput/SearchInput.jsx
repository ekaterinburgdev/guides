import React from 'react'

import style from './SearchInput.module.css'
import { SearchSuggestion } from '../SearchSuggestion/SearchSuggestion'

const debounce = (func, timeout = 300) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

export function SearchInput({ isVisible }) {
    const [suggestions, setSuggestions] = React.useState([])
    const hiddenStyle = isVisible ? style.SearchInput__visible : ''

    return (
        <section className={`${style.input__container} ${hiddenStyle}`}>
            <SearchSuggestion suggestions={suggestions} />
            <input
                ref={(input) => input?.focus()}
                className={style.input}
                onChange={debounce(async (e) => {
                    const textInput = e.target.value
                    if (textInput.length > 2) {
                        const response = await fetch(`http://localhost:8088/${e.target.value}`)
                        const arrayWithSuggestions = await response.json()
                        setSuggestions(
                            Array.isArray(arrayWithSuggestions) ? arrayWithSuggestions : []
                        )
                    } else {
                        setSuggestions([])
                    }
                })}
            />
        </section>
    )
}
