import React, { useEffect, useState, useRef, useCallback } from 'react'
import cn from 'classnames'
import { SidePage } from '../SidePage/SidePage'
import { API_HOST } from '../../consts/endpoints'

import Close from './close.svg'
import Download from './download.svg'
import Github from './github.svg'
import Menu from './menu.svg'
import Search from './search.svg'

import styles from './Toolbar.module.css'

const debounce = (func, timeout = 300) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

export const Toolbar = ({ pdf, menuActive, menuOnClick }) => {
    const [isOpenSidePage, setIsOpenSidePage] = useState(false)
    const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false)
    const [currentQuery, setCurrentQuery] = useState('')
    const searchInputRef = useRef(null)
    const [guideSuggestions, setGuideSuggestions] = useState([])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleOnChange = useCallback(
        debounce(async (e) => {
            const textInputValue = e.target.value
            if (textInputValue.length > 2) {
                setIsLoadingSuggestion(true)
                setCurrentQuery(textInputValue)
                const response = await fetch(
                    `${API_HOST}/api/content/search?pattern=${e.target.value}`
                )
                const responseJson = await response.json()
                const { guideSuggestions } = responseJson
                setGuideSuggestions(guideSuggestions)
            } else {
                setGuideSuggestions([])
            }
            setIsLoadingSuggestion(false)
        }),
        [guideSuggestions]
    )

    useEffect(() => {
        if (isOpenSidePage) {
            searchInputRef.current.focus()
        }
    }, [isOpenSidePage])

    return (
        <>
            <div ref={toolbarRef} className={styles.Toolbar}>
                {!isOpenSidePage ? (
                    <>
                        {menuActive !== undefined && (
                            <button
                                className={cn(styles.Toolbar__item, styles.Toolbar__item_menu)}
                                onClick={() => menuOnClick(!menuActive)}
                            >
                                {menuActive ? <Close /> : <Menu />}
                            </button>
                        )}

                        {pdf && (
                            <a
                                className={styles.Toolbar__item}
                                href={pdf}
                                target="_blank"
                                aria-label="Скачать .pdf"
                            >
                                <Download />
                            </a>
                        )}
                        <button
                            className={styles.Toolbar__item}
                            onClick={() => setIsOpenSidePage(true)}
                        >
                            <Search />
                        </button>
                    </>
                ) : (
                    <>
                        <Search />
                        <div className={styles.customInput}>
                            <input
                                type="text"
                                className={styles.Toolbar__input}
                                placeholder="Например, скамья"
                                ref={searchInputRef}
                                onChange={handleOnChange}
                                defaultValue={currentQuery}
                            />

                            <button
                                onClick={() => setIsOpenSidePage(false)}
                                className={cn(styles.Toolbar__item, styles.Toolbar__item_active)}
                            >
                                <Close />
                            </button>
                        </div>
                    </>
                )}
            </div>
            <SidePage
                items={guideSuggestions}
                isClose={!isOpenSidePage}
                isLoading={isLoadingSuggestion}
                query={currentQuery}
            />
        </>
    )
}
