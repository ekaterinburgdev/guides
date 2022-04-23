import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPage } from '../api/apiPage';
import TableOfContents from '../components/TableOfContents'

export default function Home() {
  const [sections, setSections] = useState([]);
  const [generalProvisions, setGeneralProvisions] = useState([]);

  useEffect(() => {
    getAllPage()
      .then((res) => {
        setGeneralProvisions([res.general_provisions]);
        setSections(res.sections);
      })
      .catch((err) => console.error('Ошибка при получении всех страниц', err));
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {
          generalProvisions.map((page) => (
            <Link
              key={page.id}
              href={{
                pathname: '/example/[pageId]',
                query: { pageId: page.id },
              }}
            >
              {page.name_ru}
            </Link>
          ))
            }
        {sections.map((page) => (
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

        <TableOfContents/>

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
