import React, { useEffect, useState, useRef, useCallback } from 'react'

import styles from './Toolbar.module.css'
import { SidePage } from '../SidePage/SidePage'
import { API_HOST } from '../../consts/endpoints'

const debounce = (func, timeout = 300) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

export const Toolbar = ({ toolbarColor = '#f5f8fb', colorTitle = '#1A1C1F', pdfUrl, isMain }) => {
    const [isOpenSidePage, setIsOpenSidePage] = useState(false)
    const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false)
    const [currentQuery, setCurrentQuery] = useState('')
    const searchInputRef = React.useRef(null)
    const [guideSuggestions, setGuideSuggestions] = useState([])

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
            searchInputRef.current.focus()
        }
    }, [isOpenSidePage])

    return (
        <>
            <section
                ref={toolbarRef}
                style={{
                    backgroundColor: toolbarColor,
                    borderRadius: isMain ? (isOpenSidePage ? '200px' : '50%') : '',
                    aspectRatio: isMain ? (!isOpenSidePage ? '1 / 1' : '') : '',
                }}
                className={styles.Toolbar__container}
            >
                {!isOpenSidePage ? (
                    <div>
                        {pdfUrl && (
                            <a className={styles.Toolbar__button} href={pdfUrl} target="_blank">
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 70 70"
                                    fill="transparent"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M52 53H18" stroke={colorTitle} strokeWidth="6" />
                                    <path d="M35 12V45" stroke={colorTitle} strokeWidth="6" />
                                    <path
                                        d="M50 31L35 46L20 31"
                                        stroke={colorTitle}
                                        strokeWidth="6"
                                    />
                                </svg>
                            </a>
                        )}
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
                                fill="transparent"
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
                    </div>
                ) : (
                    <>
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 70 70"
                            fill="transparent"
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
                        <div className={styles.customInput}>
                            <input
                                style={{
                                    color: colorTitle,
                                    backgroundColor: toolbarColor,
                                }}
                                type="text"
                                className={styles.Toolbar__input}
                                placeholder="Например, скамья"
                                ref={searchInputRef}
                                onChange={handleOnChange}
                                defaultValue={currentQuery}
                            />

                            <button
                                onClick={() => setIsOpenSidePage(!isOpenSidePage)}
                                className={styles.Toolbar__closeButton}
                            >
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 70 70"
                                    fill="transparent"
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
                    </>
                )}
            </section>
            <div ref={rootEl}>
                <SidePage
                    items={guideSuggestions}
                    isClose={!isOpenSidePage}
                    isLoading={isLoadingSuggestion}
                    query={currentQuery}
                />
            </div>
        </>
    )
}
