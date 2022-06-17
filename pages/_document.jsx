import React from 'react';
import {
  Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
  const ogTitle = 'Дизайн код Екатеринбурга';
  const ogDescription = 'Мы отвечаем за красоту, комфорт и уют и создаем самый приятный город в России';

  return (
    <Html lang="ru">
      <Head>
        <meta name="og:description" content={ogDescription} />
        <meta property="og:title" content={ogTitle} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
