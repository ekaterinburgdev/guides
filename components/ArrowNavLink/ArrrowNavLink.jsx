/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import styles from './arrow.module.css';

const getCatalogOptions = (catalog) => ({
  url: catalog.properties.pageUrl.url,
  title: catalog.properties.Name.title[0].plain_text,
});

function ArrowNavLink({
  children, direction, prevPageIndex, nextPageIndex, tableOfContentArr, catalogIndex, pageUrl,
}) {
  let href = {
    pathname: '/[[...pageUrl]]',
    query: {pageUrl: []},
  };
  let title = '';

  if (direction === 'prev') {
    if (prevPageIndex >= 0) {
      href.query.pageUrl = [pageUrl[0], tableOfContentArr[prevPageIndex].url];
      title = tableOfContentArr[prevPageIndex].title;
    } else {
      const prevCatalogIndex = catalogIndex - 1;
      if (Number.isNaN(prevCatalogIndex)) {
        return;
      }
      if (prevCatalogIndex <= -1) {
        title = 'Назад к руководствам';
        href = {pathname: '/'};
      } else {
        const prevCatalog = getCatalogOptions(children[prevCatalogIndex]);
        title = prevCatalog.title;
        href.query.pageUrl = [prevCatalog.url];
      }
    }
  } else if (direction === 'next') {
    if (nextPageIndex < tableOfContentArr.length) {
      href.query.pageUrl = [pageUrl[0], tableOfContentArr[nextPageIndex].url];
      title = tableOfContentArr[nextPageIndex].title;
    } else {
      const nextCatalogIndex = catalogIndex + 1;
      if (Number.isNaN(nextCatalogIndex)) {
        return;
      }
      if (nextCatalogIndex >= children.length) {
        title = 'Назад к руководствам';
        href = {pathname: '/'};
      } else {
        const nextCatalog = getCatalogOptions(children[nextCatalogIndex]);
        title = nextCatalog.title;
        href.query.pageUrl = [nextCatalog.url];
      }
    }
  } else {
    throw Error('Invalid direction')
  }

  return (
    <Link href={href} passHref>
      <a className={styles.arrowNavLink}>
        {direction === 'prev' ? '←' : ''}
        &nbsp;
        {title}
        &nbsp;
        {direction === 'next' ? '→' : ''}
      </a>
    </Link>
  );
}

export default ArrowNavLink;
