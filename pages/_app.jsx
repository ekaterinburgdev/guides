import React, { createContext, useState } from 'react'
import Head from 'next/head'

import { isetSansFont } from '../utils/font'
import { useDark, useDesktop } from '../hooks/hooks'
import '../styles/globals.css'
import HamburgerMenu from '../components/HamburgerMenu/HamburgerMenu'
import { useMobileDetect } from '../hooks/hooks'

export const ThemeContext = createContext(null)
export const OpenTocContext = createContext(null)

function MyApp({ Component, pageProps }) {
    const isDark = useDark()
    const isDesktop = useDesktop()
    const [isOpen, setIsOpen] = useState(!useMobileDetect().isMobile())

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Городские руководства</title>
            </Head>
            <ThemeContext.Provider value={isDark}>
                <main className={isetSansFont.className}>
                    <HamburgerMenu state={isOpen} changeState={() => setIsOpen(!isOpen)} />
                    <OpenTocContext.Provider value={{ isOpen, setIsOpen, isDesktop }}>
                        <Component {...pageProps} />
                    </OpenTocContext.Provider>
                </main>
            </ThemeContext.Provider>
        </>
    )
}

export default MyApp
