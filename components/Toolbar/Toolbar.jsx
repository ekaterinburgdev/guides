import React, { useEffect, useState, useRef, useCallback, useContext } from 'react'
import { useRouter } from 'next/router'
import rgbaToRgb from 'rgba-to-rgb'

import { PageContext } from '../../pages/manuals/[[...pageUrl]]'
import styles from './Toolbar.module.css'
import getManualColorScheme from '../../utils/getManualColorScheme'
import { SidePage } from '../SidePage/SidePage'
import { ThemeContext } from '../../pages/_app'
import { API_HOST, PDF_HOST } from '../../consts/endpoints'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
    const currentUrl = pdfUrlsMap.filter((item) => asPath.includes(item.url))[0]
    const pdfUrl = currentUrl?.pdfUrl ?? ''
    const colorScheme = getManualColorScheme(color)
    const [currentQuery, setCurrentQuery] = useState('')
    const [generatePdfUrl, setGeneratePdfUrl] = useState('')
    const isDark = useContext(ThemeContext)
    const toolbarColor = rgbaToRgb(
        isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
        `rgba(${Math.trunc(colorScheme.bgLight.color[0])}, ${Math.trunc(
            colorScheme.bgLight.color[1]
        )}, ${Math.trunc(colorScheme.bgLight.color[2])}, ${colorScheme.bgLight.valpha})`
    )
    const searchInputRef = React.useRef(null)
    const [guideSuggestions, setGuideSuggestions] = useState([])
    let finalUrl

    const getGeneratePdfUrl = async () => {
        const existsPdf = await (await fetch(`${PDF_HOST}/guides/`, { mode: 'cors' })).json()
        const pdfList = existsPdf?.guides
        if (pdfList.includes(`${currentUrl?.url}.pdf`)) {
            setGeneratePdfUrl(`${PDF_HOST}/guides/${currentUrl?.url}.pdf`)
        }
    }

    const notify = () =>
        toast('Для этого руководства еще не был создан pdf файл :(', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        })

    useEffect(() => {
        getGeneratePdfUrl()
    }, [])

    if (pdfUrl) {
        finalUrl = pdfUrl
    } else if (generatePdfUrl) {
        finalUrl = generatePdfUrl
    } else {
        finalUrl = false
    }

    const handleOnChange = useCallback(
        debounce(async (e) => {
            const textInputValue = e.target.value
            setCurrentQuery(textInputValue)
            if (textInputValue.length > 2) {
                const response = await fetch(
                    `${API_HOST}/api/content/search?pattern=${e.target.value}`
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
            searchInputRef.current.focus()
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
                        style={{
                            backgroundColor: colorScheme.bgLight,
                            paddingRight: '0',
                            paddingTop: '5px',
                        }}
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
                            style={{
                                color: colorScheme.title,
                                backgroundColor: toolbarColor,
                            }}
                            type="text"
                            className={styles.Toolbar__input}
                            placeholder={!currentQuery ? 'Например, скамья' : currentQuery}
                            ref={searchInputRef}
                            onChange={handleOnChange}
                        />
                        <svg
                            width="70"
                            height="70"
                            viewBox="0 0 70 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transform: 'translateX(12px)' }}
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
                        style={{ backgroundColor: colorScheme.bgLight }}
                        className={styles.Toolbar__button}
                        href={finalUrl}
                        onClick={!finalUrl ? notify : false}
                    >
                        <svg
                            width="70"
                            height="70"
                            viewBox="0 0 70 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{
                                marginTop: '2px',
                                marginRight: '10px',
                            }}
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
                    <button
                        onClick={() => setIsOpenSidePage(!isOpenSidePage)}
                        style={{
                            border: '0',
                            outline: '0',
                            cursor: 'pointer',
                            backgroundColor: 'inherit',
                        }}
                    >
                        <svg
                            width="70"
                            height="70"
                            viewBox="0 0 70 70"
                            style={{ fill: colorScheme.title }}
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18 18L51.9995 51.9995"
                                stroke={colorScheme.title}
                                strokeWidth="6"
                            />
                            <path
                                d="M52 18L18.0005 51.9995"
                                stroke={colorScheme.title}
                                strokeWidth="6"
                            />
                        </svg>
                    </button>
                )}
                <ToastContainer />
            </section>
            <div ref={rootEl}>
                <SidePage guideSuggestions={guideSuggestions} close={!isOpenSidePage} />
            </div>
        </>
    )
}
