import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import styles from '../styles/home.module.css';
import {getTree} from '../api/apiPage';
import Manual from '../components/Manual/Manual';

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

  return (
    <>
      <Head>
        <title>Городские руководства</title>
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=320, height=device-height, target-densitydpi=medium-dpi"
        />
        <link rel="icon" href="/favicon.ico" />
        <html lang="ru" />
        <meta charSet="utf-8" />
        <meta name="description" content="Городские руководства Екатеринбурга" />
      </Head>

      <main className={styles.homeContainer}>
        <h1 className={styles.mainTitle}>{title}</h1>
        <section className={styles.manualsSection}>
          {manuals.map((manual) => (
            <Manual manual={manual} key={manual?.properties?.Name?.title} />
          ))}
        </section>
      </main>
    </>
  );
}
