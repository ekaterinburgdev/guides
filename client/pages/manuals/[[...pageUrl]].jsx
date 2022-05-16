import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import findIndex from 'lodash/findIndex';
// import TableOfContents from '../components/TableOfContents';
import ManualPage from '../../components/ManualPage';
import { getPageByUrl } from '../../api/apiPage';

import styles from './page.module.css';

function GetPage() {
  const router = useRouter();
  const { pageUrl } = router.query;

  // const [prevPage, setPrevPage] = useState();
  // const [nexPage, setNextPage] = useState();

  // useEffect(() => {
  //   if (!pageUrl) {
  //     return;
  //   }

  //   getPageByUrl(pageUrl)
  //     .then((res) => {
  //       const pages = res.options;
  //       const pageIndex = findIndex(pages, (page) => page.id === pageUrl);
  //       setPrevPage(pages[pageIndex - 1]);
  //       setNextPage(pages[pageIndex + 1]);
  //     })
  //     .catch((err) => {
  //       throw new Error(err);
  //     });
  // }, [pageUrl]);

  return (
    <>
      {/* <TableOfContents /> */}
      <ManualPage pageUrl={pageUrl ? pageUrl[pageUrl.length - 1] : undefined} />
      {/* <nav className={styles.footNav}>
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
      </nav> */}
    </>
  );
}

export default GetPage;
