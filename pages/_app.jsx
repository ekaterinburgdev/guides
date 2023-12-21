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
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Городские руководства</title>
            </Head>

            <main className={IsetSans.className}>
                <Component {...pageProps} />
            </main>
        </>
    )
}

export default MyApp
