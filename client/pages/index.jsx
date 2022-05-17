import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { api } from '../next.config';
import styles from '../styles/home.module.css';
import TableOfContents from '../components/TableOfContents';
import { getTree } from '../api/apiPage';

export default function Home() {
  const [manuals, setManuals] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getTree().then((tree) => {
      setManuals(tree.children);
      setTitle(tree?.properties?.child_page?.title);
    }).catch((err) => { throw new Error(err); });
  }, []);

  const renderManualItem = (manual) => {
    const imageUrl = manual.cover;
    const titleArr = manual?.properties?.Name?.title;
    const titleText = titleArr.length > 0 ? titleArr[0]?.text?.content : '';
    const pageUrl = manual?.properties?.pageUrl?.url;

    return (
      <Link href={{
        pathname: '/[pageUrl]',
        query: { pageUrl },
      }}
      >
        <div className={styles.manualItem}>
          <img
            style={{ width: '100%' }}
            src={`${api.HOST}/static/${imageUrl}`}
            alt={titleText}
          />
          <h4 className={styles.manualTitle}>{titleText}</h4>
        </div>
      </Link>
    );
  };

  return (
    <div>
      <Head>
        <title>Городские руководства</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '30px' }}>
        <h1>{title}</h1>
        <section className={styles.manualsSection}>{ manuals.map((manual) => renderManualItem(manual)) }</section>
        {/* <TableOfContents /> */}
      </main>
    </div>
  );
}
