import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPage } from '../api/apiPage';

export default function Home() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    getAllPage()
      .then((res) => setPages(res.sections))
      .catch((err) => console.error('Ошибка при получении всех страниц', err));
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {pages.map((page) => (
          <Link
            key={page.id}
            href={{
              pathname: '/example/[pageId]',
              query: { pageId: page.id },
            }}
          >
            {page.name_ru}
          </Link>
        ))}

        {/* <Link
          href={{
            pathname: '/example/[pageId]',
            query: { pageId },
          }}
        >
          Пример
        </Link> */}
      </main>
    </div>
  );
}
