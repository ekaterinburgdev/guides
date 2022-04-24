import Head from 'next/head';
import React from 'react';
import TableOfContents from '../components/TableOfContents';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Городские руководства</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TableOfContents />
      </main>
    </div>
  );
}
