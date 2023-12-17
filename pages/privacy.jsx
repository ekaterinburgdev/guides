import Head from 'next/head'
import React from 'react'

const GOOGLE_DOCS =
    'https://docs.google.com/document/d/e/2PACX-1vSSKtpDsflkuh1Q5-F3APYwEjpByTi3rk77Z_nvQR5_cH9Rp06hX6G_vqIyMW3g8zC4q-Hrcxm72ip0/pub'

function Privacy() {
    return (
        <>
            <Head>
                <title>Политика в отношении обработки персональных данных</title>
                <meta name="robots" content="noindex" />
            </Head>

            <iframe
                src={GOOGLE_DOCS}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    border: 0,
                }}
            />
        </>
    )
}

export default Privacy
