import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPage } from '../../api/apiPage';
import styles from './TableOfContents.module.css';

function TableOfContents({ tabelOfContentArr, currentPageUrl = [] }) {
  const tableOfContentsLink = ({ url, title, children }) => <Link href={{
    pathname: '/[[...pageUrl]]',
    query: { pageUrl: [currentPageUrl[0], url] },
    as: `${currentPageUrl.join('/')}/${url}`,
  }}
  >
    <a className={styles.tableOfContentsLink} href={url}>
      {title}
    </a>
  </Link>

  return (
    <nav className={styles.tableOfContents}>
      <ul>
        <div className={styles.designCodeLink}>
          <a href="https://ekaterinburg.design/">Элементы благоустройста</a>
        </div>
        {currentPageUrl && tabelOfContentArr.map((obj) => {
          console.log('срань', obj);
          return tableOfContentsLink(obj)})}
      </ul>
    </nav>
  );
}

export default TableOfContents;
