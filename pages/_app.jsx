import React from 'react'
import Head from 'next/head'

import { isetSansFont } from '../utils/font'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Городские руководства</title>
            </Head>
            <main className={isetSansFont.className}>
                <Component {...pageProps} />
            </main>
        </>
    )
}

export default MyApp
