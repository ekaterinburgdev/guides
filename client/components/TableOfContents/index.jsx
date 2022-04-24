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
      .catch((err) => console.error('Ошибка при получении всех страниц', err));
  }, []);

  const tableOfContentsLink = (page) => (
    <Link
      key={page.id}
      href={{
        pathname: '/example/[pageId]',
        query: { pageId: page.id },
      }}
    >
      <a className={styles.tableOfContentsLink} href={page.id}>{page.name_ru}</a>
    </Link>
  );

  return (
    <nav className={styles.tableOfContents}>
      <ul>
        <div className={styles.designCodeLink}>
          <a href="https://ekaterinburg.design/">Дизайн код Екатеринбурга</a>
        </div>
        {sections.map(tableOfContentsLink)}
      </ul>
    </nav>
  );
}

export default TableOfContents;
