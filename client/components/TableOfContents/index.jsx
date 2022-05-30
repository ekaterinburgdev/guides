import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPage } from '../../api/apiPage';
import styles from './TableOfContents.module.css';

function TableOfContents({ tableOfContentArr, currentPageUrl = [], anchorLinks }) {
  // useEffect(() => {
  //   let isMounted = true;
  //   console.log('якорные ссылки', anchorLinks);
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [anchorLinks])

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
        {currentPageUrl && tableOfContentArr.map((obj) => {
          console.log('срань', obj);
          return tableOfContentsLink(obj)})}
      </ul>
    </nav>
  );
}

export default TableOfContents;
