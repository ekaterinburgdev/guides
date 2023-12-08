import React, { useContext } from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

import { ThemeContext } from './_app'

export default function Document() {
    const ogTitle = 'Городские руководства Екатеринбурга'
    const ogDescription =
        'Делаем онлайн-платформу для официальных городских руководств и стандартов'

    return (
        <Html lang="ru">
            <Head>
                <meta name="og:description" content={ogDescription} />
                <meta property="og:title" content={ogTitle} />
            </Head>
            <body>
                <Main />
                <NextScript />

                {/* eslint-disable-next-line react/no-danger */}
                {process.env.YANDEX_METRIKA && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: `<script>(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}) (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");ym(${process.env.YANDEX_METRIKA}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });</script><noscript><div><img src="https://mc.yandex.ru/watch/${process.env.YANDEX_METRIKA}" style="position:absolute; left:-9999px;" alt="" /></div></noscript>`,
                        }}
                    />
                )}
            </body>
        </Html>
    )
}
