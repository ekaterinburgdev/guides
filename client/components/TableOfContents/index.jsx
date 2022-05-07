import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPage } from '../../api/apiPage';
import styles from './TableOfContents.module.css';

function TableOfContents() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    getAllPage()
      .then((res) => {
        setSections(res.options);
      })
      .catch((err) => {
        throw new Error('Ошибка при получении всех страниц', err);
      });
  }, []);

  const testArr = ['lol', 'kek', 'design', 'parent', 'manual'];

  const tableOfContentsLink = (page) => (
    <Link
      key={page.id}
      href={{
        pathname: '/page/[[...pageId]]',
        query: { pageId: [...testArr, page.id] },
      }}
    >
      <a className={styles.tableOfContentsLink} href={page.id}>
        {page.name_ru}
      </a>
    </Link>
  );

  return (
    <nav className={styles.tableOfContents}>
      <ul>
        <div className={styles.designCodeLink}>
          <a href="https://ekaterinburg.design/">Элементы благоустройста</a>
        </div>
        {sections.map(tableOfContentsLink)}
      </ul>
    </nav>
  );
}

export default TableOfContents;
