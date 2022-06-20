import '../styles/globals.css'
import React from 'react'
import Head from 'next/head'

function MyApp({ Component }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Городские руководства</title>
            </Head>
            <Component />
        </>
    )
}

export default MyApp
