import React, { createContext } from 'react'
import Head from 'next/head'
import { useMediaQuery } from 'react-responsive'

import { isetSansFont } from '../utils/font'
import '../styles/globals.css'

export const ThemeContext = createContext(null)

function MyApp({ Component, pageProps }) {
    const isDark = useMediaQuery({
        query: '(prefers-color-scheme: dark)',
    })

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
