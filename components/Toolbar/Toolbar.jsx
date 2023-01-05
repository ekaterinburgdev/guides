import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import classNames from 'classnames'

import styles from './Toolbar.module.css'
import getManualColorScheme from '../../utils/getManualColorScheme'
import { SidePage } from '../SidePage/SidePage'

export const Toolbar = ({ colorMap }) => {
    const { asPath } = useRouter()
    const isDesktop = useMediaQuery({
        query: '(min-width: 991px)',
    })
    const [isOpenSidePage, setIsOpenSidePage] = useState(false)
    const color = colorMap.filter((item) => asPath.includes(item.url))[0]?.color
    const colorScheme = getManualColorScheme(color)
    const containerClassNames = classNames(styles.Toolbar__container, {
        // [styles.hidden]: !isDesktop,
    })

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
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
    const inputRef = useRef(null)
    useOutsideAlerter(rootEl)

    useEffect(() => {
        if (isOpenSidePage) {
            inputRef.current.focus()
        }
    }, [isOpenSidePage])

    return (
        <>
            <section
                style={{ backgroundColor: colorScheme.bgLight }}
                className={containerClassNames}
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
                                stroke-width="6"
                            />
                            <path
                                d="M40.001 39.4995L54.501 53.9995"
                                stroke={colorScheme.title}
                                stroke-width="6"
                            />
                        </svg>
                    </button>
                ) : (
                    <input
                        style={{ color: colorScheme.title }}
                        type="text"
                        ref={inputRef}
                        className={styles.Toolbar__input}
                    />
                )}
                <button
                    style={{ backgroundColor: colorScheme.bgLight }}
                    className={styles.Toolbar__button}
                >
                    <svg
                        width="70"
                        height="70"
                        viewBox="0 0 70 70"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M52 53H18" stroke={colorScheme.title} stroke-width="6" />
                        <path d="M35 12V45" stroke={colorScheme.title} stroke-width="6" />
                        <path d="M50 31L35 46L20 31" stroke={colorScheme.title} stroke-width="6" />
                    </svg>
                </button>
            </section>
            <div ref={rootEl}>
                <SidePage close={!isOpenSidePage} />
            </div>
        </>
    )
}
