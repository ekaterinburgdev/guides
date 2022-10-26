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

    return (
        <section className={style.input__container} hidden={!isVisible}>
            <input
                className={style.input}
                onChange={async (e) => {
                    const response = await fetch(`http://localhost:8088/${e.target.value}`)
                    const arrayWithSuggestions = await response.json()
                    setSuggestions(arrayWithSuggestions)
                }}
            />
            <SearchSuggestion suggestions={suggestions} />
        </section>
    )
}
