import React, { useEffect, useState, useRef, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import rgbaToRgb from 'rgba-to-rgb'
import { useMediaQuery } from 'react-responsive'

import { PageContext } from '../../pages/manuals/[[...pageUrl]]'
import styles from './Toolbar.module.css'
import getManualColorScheme from '../../utils/getManualColorScheme'
import { SidePage } from '../SidePage/SidePage'

const debounce = (func, timeout = 300) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

export const Toolbar = () => {
    const { asPath } = useRouter()
    const [isOpenSidePage, setIsOpenSidePage] = useState(false)
    const colorContext = useContext(PageContext)
    const { colorMap, pdfUrlsMap } = colorContext
    const color = colorMap.filter((item) => asPath.includes(item.url))[0]?.color
    const pdfUrl = pdfUrlsMap.filter((item) => asPath.includes(item.url))[0]?.pdfUrl ?? ''
    const colorScheme = getManualColorScheme(color)
    const isDark = useMediaQuery({
        query: '(prefers-color-scheme: dark)',
    })
    const toolbarColor = rgbaToRgb(
        isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
        `rgba(${Math.trunc(colorScheme.bgLight.color[0])}, ${Math.trunc(
            colorScheme.bgLight.color[1]
        )}, ${Math.trunc(colorScheme.bgLight.color[2])}, ${colorScheme.bgLight.valpha})`
    )

    const [guideSuggestions, setGuideSuggestions] = useState([])

    const handleOnChange = useCallback(
        debounce(async (e) => {
            const textInputValue = e.target.value
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
            <section
                ref={toolbarRef}
                style={{ backgroundColor: toolbarColor }}
                className={styles.Toolbar__container}
            >
                {!isOpenSidePage ? (
                    <button
                        style={{ backgroundColor: colorScheme.bgLight }}
                        className={styles.Toolbar__button}
                        onClick={() => {
                            setIsOpenSidePage((prev) => !prev)
                        }}
                    >
                        <svg
                            width="70"
                            height="70"
                            viewBox="0 0 70 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="31.501"
                                cy="30.4995"
                                r="14.5"
                                stroke={colorScheme.title}
                                strokeWidth="6"
                            />
                            <path
                                d="M40.001 39.4995L54.501 53.9995"
                                stroke={colorScheme.title}
                                strokeWidth="6"
                            />
                        </svg>
                    </button>
                ) : (
                    <div className={styles.customInput}>
                        <input
                            style={{ color: colorScheme.title }}
                            type="text"
                            className={styles.Toolbar__input}
                            onChange={handleOnChange}
                        />
                        <svg
                            width="70"
                            height="70"
                            viewBox="0 0 70 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx="31.501"
                                cy="30.4995"
                                r="14.5"
                                stroke={colorScheme.title}
                                strokeWidth="6"
                            />
                            <path
                                d="M40.001 39.4995L54.501 53.9995"
                                stroke={colorScheme.title}
                                strokeWidth="6"
                            />
                        </svg>
                    </div>
                )}
                {!isOpenSidePage ? (
                    <a
                        style={{
                            backgroundColor: colorScheme.bgLight,
                        }}
                        className={styles.Toolbar__button}
                        href={pdfUrl}
                    >
                        <svg
                            width="70"
                            height="70"
                            viewBox="0 0 70 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M52 53H18" stroke={colorScheme.title} strokeWidth="6" />
                            <path d="M35 12V45" stroke={colorScheme.title} strokeWidth="6" />
                            <path
                                d="M50 31L35 46L20 31"
                                stroke={colorScheme.title}
                                strokeWidth="6"
                            />
                        </svg>
                    </a>
                ) : (
                    <div style={{ opacity: '0.5' }}>
                        <svg
                            width="70"
                            height="70"
                            viewBox="0 0 70 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M52 53H18" stroke={colorScheme.title} strokeWidth="6" />
                            <path d="M35 12V45" stroke={colorScheme.title} strokeWidth="6" />
                            <path
                                d="M50 31L35 46L20 31"
                                stroke={colorScheme.title}
                                strokeWidth="6"
                            />
                        </svg>
                    </div>
                )}
            </section>
            <div ref={rootEl}>
                <SidePage guideSuggestions={guideSuggestions} close={!isOpenSidePage} />
            </div>
        </>
    )
}
