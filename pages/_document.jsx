import React from 'react'
import { SITE_HOST } from '../consts/endpoints'
import { Html, Head, Main, NextScript } from 'next/document'

const siteTitle = 'Городские руководства Екатеринбурга'
const siteDescription = 'Делаем онлайн-платформу для официальных городских руководств и стандартов'
const ogImage = '/og-preview.jpg'

export default function Document() {
    return (
        <Html lang="ru">
            <Head>
                <meta charset="UTF-8" />
                <meta name="description" content={siteDescription} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={SITE_HOST} />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={siteDescription} />
                <meta property="og:image" content={ogImage} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={SITE_HOST} />
                <meta property="twitter:title" content={siteTitle} />
                <meta property="twitter:description" content={siteDescription} />
                <meta property="twitter:image" content={ogImage} />

                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <body>
                <Main />
                <NextScript />

                <script async src="https://tally.so/widgets/embed.js" />

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
