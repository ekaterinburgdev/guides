import { createContext } from 'react'
import Head from 'next/head'
import { IsetSans } from '../styles/fonts/IsetSans'

import '../styles/globals.css'
import 'ekb/style.css'

export const ThemeContext = createContext(null)

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Руководства Екатеринбурга</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className={IsetSans.className}>
                <Component {...pageProps} />
            </main>
        </>
    )
}

export default MyApp
