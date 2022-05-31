import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import useMatchMedia from 'use-match-media-hook';
import {getAllPage} from '../../api/apiPage';
import styles from './TableOfContents.module.css';

const queries = ['(max-width: 400px)', '(min-width: 800px)'];

function TableOfContents({tableOfContentArr, currentPageUrl = [], anchorLinks}) {
  // useEffect(() => {
  //   let isMounted = true;
  //   console.log('якорные ссылки', anchorLinks);
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [anchorLinks])
  const [mobile, desktop] = useMatchMedia(queries);
  let baseState;

  if (desktop) {
    baseState = false;
  } else {
    baseState = true;
  }

  const [isOpen, setIsOpen] = useState(baseState);

  const tableOfContentsLink = ({url, title, children}) => (
    <Link
      href={{
        pathname: '/[[...pageUrl]]',
        query: {pageUrl: [currentPageUrl[0], url]},
        as: `${currentPageUrl.join('/')}/${url}`,
      }}
    >
      <a className={styles.tableOfContentsLink} href={url}>
        {title}
      </a>
    </Link>
  );

  return (
    <>
      <button type="button" className={styles.openButton} onClick={() => setIsOpen(!isOpen)} />
      <nav
        style={{display: mobile || !isOpen ? 'none' : 'block'}}
        className={styles.tableOfContents}
      >
        <ul>
          {currentPageUrl
            && tableOfContentArr.map((obj) => {
              console.log('срань', obj);
              return tableOfContentsLink(obj);
            })}
        </ul>
      </nav>
    </>
  );
}

export default TableOfContents;
