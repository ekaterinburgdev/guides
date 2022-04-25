/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import findIndex from 'lodash/findIndex';
import TableOfContents from '../../components/TableOfContents';
import ManualPage from './ManualPage';
import { getAllPage } from '../../api/apiPage';

import styles from './example.module.css';

function GetPage() {
  const router = useRouter();
  const { pageId } = router.query;

  const [prevPage, setPrevPage] = useState();
  const [nexPage, setNextPage] = useState();

  useEffect(() => {
    if (!pageId) {
      return;
    }

    getAllPage()
      .then((res) => {
        const pages = res.options;
        console.log(pages, 'страницы');
        const pageIndex = findIndex(pages, (page) => page.id === pageId);
        console.log('индекс', pageIndex);
        setPrevPage(pages[pageIndex - 1]);
        setNextPage(pages[pageIndex + 1]);
      })
      .catch((err) => console.error(err));
  }, [pageId]);

  return (
    <>
      <TableOfContents />
      <ManualPage pageId={pageId} />
      <nav className={styles.footNav}>
        {prevPage && prevPage.name_ru && (
          <Link
            href={{
              pathname: '/example/[pageId]',
              query: { pageId: prevPage.id },
            }}
          >
            <a href={prevPage.id}>
              ←
              {' '}
              {prevPage && prevPage.name_ru}
            </a>
          </Link>
        )}
        {nexPage && nexPage.name_ru && (
          <Link
            href={{
              pathname: '/example/[pageId]',
              query: { pageId: nexPage.id },
            }}
          >
            <a href={prevPage.id}>
              {nexPage && nexPage.name_ru}
              {' '}
              →
            </a>
          </Link>
        )}
      </nav>
    </>
  );
}

export default GetPage;
