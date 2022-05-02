import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import findIndex from 'lodash/findIndex';
import TableOfContents from '../../components/TableOfContents';
import ManualPage from './ManualPage';
import { getAllPage } from '../../api/apiPage';

import styles from './page.module.css';

function GetPage() {
  const router = useRouter();
  const { pageId } = router.query;

  const [prevPage, setPrevPage] = useState();
  const [nexPage, setNextPage] = useState();

  useEffect(() => {
    getAllPage()
      .then((res) => {
        const pages = res.options;
        const pageIndex = findIndex(pages, (page) => page.id === pageId);
        setPrevPage(pages[pageIndex - 1]);
        setNextPage(pages[pageIndex + 1]);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, [pageId]);

  return (
    <>
      <TableOfContents />
      <ManualPage pageId={pageId} />
      <nav className={styles.footNav}>
        {prevPage && prevPage.name_ru && (
          <Link
            href={{
              pathname: '/page/[pageId]',
              query: { pageId: prevPage.id },
            }}
          >
            <a href={prevPage?.id}>
              ←
              {' '}
              {prevPage && prevPage.name_ru}
            </a>
          </Link>
        )}
        {nexPage && nexPage.name_ru && (
          <Link
            href={{
              pathname: '/page/[pageId]',
              query: { pageId: nexPage.id },
            }}
          >
            <a href={prevPage?.id}>
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
