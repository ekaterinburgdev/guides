import React from 'react'
import Head from 'next/head'
import localFont from '@next/font/local'

import '../styles/globals.css'

const isetSansFont = localFont({
    src: [
        {
            path: '../styles/fonts/IsetSans-Light.woff2',
            weight: '300',
        },
        {
            path: '../styles/fonts/IsetSans-Medium.woff2',
            weight: '500',
        },
        {
            path: '../styles/fonts/IsetSans-SemiBold.woff2',
            weight: '700',
        },
        {
            path: '../styles/fonts/IsetSans-Regular.woff2',
            weight: '400',
        },
        {
            path: '../styles/fonts/IsetSans-Regular-Italic.woff2',
            weight: '400',
            style: 'italic',
        },
    ],
})

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
