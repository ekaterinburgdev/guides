import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

import { useMediaQuery } from 'react-responsive'

export default function Document() {
    const isDark = useMediaQuery({
        query: '(prefers-color-scheme: dark)',
    })

    const ogTitle = 'Городские руководства Екатеринбурга'
    const ogDescription =
        'Делаем онлайн-платформу для официальных городских руководств и стандартов'

    return (
        <Html lang="ru">
            <Head>
                <meta name="og:description" content={ogDescription} />
                <meta property="og:title" content={ogTitle} />
                <meta name="theme-color" content={isDark ? '#000' : '#fff'} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
