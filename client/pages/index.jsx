/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import {api} from '../next.config';
import styles from '../styles/home.module.css';
import {getTree} from '../api/apiPage';

export default function Home() {
  const [manuals, setManuals] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    getTree()
      .then((tree) => {
        setManuals(tree.children);
        setTitle(tree?.properties?.child_page?.title);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  const renderManualItem = (manual) => {
    const imageUrl = manual.cover;
    const titleArr = manual?.properties?.Name?.title;
    const titleText = titleArr.length > 0 ? titleArr[0]?.text?.content : '';
    const pageUrl = manual?.properties?.pageUrl?.url;

    return (
      <Link
        href={{
          pathname: '/[[...pageUrl]]',
          query: {pageUrl: [pageUrl]},
        }}
        passHref
      >
        <a className={styles.manualItem}>
          <Image
            src={`${api.HOST}/static/${imageUrl}`}
            alt={titleText}
            layout="fill"
            placeholder="blur"
            loading="lazy"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs="
            aria-label={titleText}
          />
        </a>
      </Link>
    );
  };

  return (
    <div>
      <Head>
        <title>Городские руководства</title>
        <link rel="icon" href="assets/favicon.ico" />
        <html lang="ru" />
        <meta charSet="utf-8" />
        <meta name="description" content="Городские руководства Екатеринбурга" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main style={{padding: '2vmax'}}>
        <h1 className={styles.mainTitle}>{title}</h1>
        <section className={styles.manualsSection}>
          {manuals.map((manual) => renderManualItem(manual))}
        </section>
      </main>
    </div>
  );
}
