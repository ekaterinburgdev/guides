import React, { createContext, useEffect, useState } from 'react'
import Head from 'next/head'

import { isetSansFont } from '../utils/font'
import '../styles/globals.css'

export const ThemeContext = createContext(null)

export const useDark = () => {
    const [dark, setDark] = useState('')
    useEffect(() => {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => e.matches && setDark(true))
        window
            .matchMedia('(prefers-color-scheme: light)')
            .addEventListener('change', (e) => e.matches && setDark(false))
    }, [])
    return dark
}

function MyApp({ Component, pageProps }) {
    const isDark = useDark()

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Городские руководства</title>
            </Head>
            <ThemeContext.Provider value={isDark}>
                <main className={isetSansFont.className}>
                    <Component {...pageProps} />
                </main>
            </ThemeContext.Provider>
        </>
    )
}

export default MyApp
