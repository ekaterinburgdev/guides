import React, { useEffect, useState, useRef, useCallback, useContext } from 'react'

import styles from './Toolbar.module.css'
import { SidePage } from '../SidePage/SidePage'
import { ThemeContext } from '../../pages/_app'

const debounce = (func, timeout = 300) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

export const MainPageToolbar = () => {
    const [isOpenSidePage, setIsOpenSidePage] = useState(false)
    const isDark = useContext(ThemeContext)
    const toolbarColor = isDark ? '#1A1C1F' : '#f5f8fb'
    const colorTitle = isDark ? '#f5f8fb' : '#1A1C1F'
    const [guideSuggestions, setGuideSuggestions] = useState([])
    const [currentQuery, setCurrentQuery] = useState('')
    const searchInputRef = React.useRef(null)

    useEffect(() => {
        if (isOpenSidePage) {
            searchInputRef.current.focus()
        }
    }, [isOpenSidePage])

    const handleOnChange = useCallback(
        debounce(async (e) => {
            const textInputValue = e.target.value
            setCurrentQuery(textInputValue)
            if (textInputValue.length > 2) {
                const response = await fetch(
                    `https://guides-api-test.ekaterinburg.design/api/content/search?pattern=${e.target.value}`
                )
                const responseJson = await response.json()
                const { guideSuggestions } = responseJson
                setGuideSuggestions(guideSuggestions)
            } else {
                setGuideSuggestions([])
            }
        }),
        [guideSuggestions]
    )

    const useOutsideAlerter = (ref, ignoreRef) => {
        useEffect(() => {
            function handleClickOutside(event) {
                if (
                    ref.current &&
                    !ref.current.contains(event.target) &&
                    !ignoreRef?.current?.contains(event.target)
                ) {
                    setIsOpenSidePage(false)
                }
            }
            document.addEventListener('mousedown', handleClickOutside)
            return () => {
                document.removeEventListener('mousedown', handleClickOutside)
            }
        }, [ref])
    }

    const rootEl = useRef(null)
    const toolbarRef = useRef(null)
    useOutsideAlerter(rootEl, toolbarRef)

    useEffect(() => {
        if (isOpenSidePage) {
            toolbarRef.current.focus()
        }
    }, [isOpenSidePage])

    return (
        <>
            <div
                ref={toolbarRef}
                style={{
                    backgroundColor: toolbarColor,
                    borderRadius: isOpenSidePage ? '200px' : '50%',
                    aspectRatio: !isOpenSidePage ? '1 / 1' : '',
                }}
                className={styles.Toolbar__container}
            >
                {!isOpenSidePage ? (
                    <button
                        className={styles.Toolbar__button}
                        onClick={() => {
                            setIsOpenSidePage((prev) => !prev)
                        }}
                    >
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 70 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="30.501"
                                cy="30.4995"
                                r="14.5"
                                stroke={colorTitle}
                                strokeWidth="6"
                            />
                            <path
                                d="M40.001 39.4995L54.501 53.9995"
                                stroke={colorTitle}
                                strokeWidth="6"
                            />
                        </svg>
                    </button>
                ) : (
                    <div className={styles.customInput}>
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 70 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.Toolbar__searchIcon}
                        >
                            <circle
                                cx="30.501"
                                cy="30.4995"
                                r="14.5"
                                stroke={colorTitle}
                                strokeWidth="6"
                            />
                            <path
                                d="M40.001 39.4995L54.501 53.9995"
                                stroke={colorTitle}
                                strokeWidth="6"
                            />
                        </svg>
                        <input
                            style={{
                                color: colorTitle,
                                backgroundColor: toolbarColor,
                            }}
                            type="text"
                            className={styles.Toolbar__input}
                            ref={searchInputRef}
                            placeholder="Например, скамья"
                            onChange={handleOnChange}
                            defaultValue={currentQuery}
                        />
                        <button
                            onClick={() => setIsOpenSidePage(!isOpenSidePage)}
                            className={styles.Toolbar__button}
                        >
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 70 70"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18 18L51.9995 51.9995"
                                    stroke={colorTitle}
                                    strokeWidth="6"
                                />
                                <path
                                    d="M52 18L18.0005 51.9995"
                                    stroke={colorTitle}
                                    strokeWidth="6"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            <div ref={rootEl}>
                <SidePage guideSuggestions={guideSuggestions} close={!isOpenSidePage} />
            </div>
        </>
    )
}
