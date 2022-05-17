import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPage } from '../../api/apiPage';
import styles from './TableOfContents.module.css';

function TableOfContents({ tabelOfContentArr, currentPageUrl = [] }) {
  // const [sections, setSections] = useState([]);

  // useEffect(() => {
  //   getAllPage()
  //     .then((res) => {
  //       setSections(res.options);
  //     })
  //     .catch((err) => {
  //       throw new Error('Ошибка при получении всех страниц', err);
  //     });
  // }, []);

  console.log('текущий урл', currentPageUrl);

  const tableOfContentsLink = ({ url, title, children }) => {
    console.log('использую текущий урл', currentPageUrl);
    const a = [...currentPageUrl, url];
    console.log('вухахахах', a);
    return <Link
      key={url}
      href={{
        pathname: '/[[...pageUrl]]',
        query: { pageUrl: a },
      }}
    >
      <a className={styles.tableOfContentsLink} href={url}>
        {title}
      </a>
    </Link>
  }

  return (
    <nav className={styles.tableOfContents}>
      <ul>
        <div className={styles.designCodeLink}>
          <a href="https://ekaterinburg.design/">Элементы благоустройста</a>
        </div>
        {tabelOfContentArr.map((obj) => {
          console.log('срань', obj);
          return tableOfContentsLink(obj)})}
      </ul>
    </nav>
  );
}

export default TableOfContents;
