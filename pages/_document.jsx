import React, { useContext } from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

import { ThemeContext } from './_app'

export default function Document() {
    const isDark = useContext(ThemeContext)

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
