/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import findIndex from 'lodash/findIndex';
import TableOfContents from '../../components/TableOfContents';
import ManualPage from '../../components/ManualPage';
import { getTree } from '../../api/apiPage';

import styles from './page.module.css';

function GetPage() {
  const router = useRouter();
  const { pageUrl } = router.query;

  // const [prevPage, setPrevPage] = useState();
  // const [nexPage, setNextPage] = useState();
  const [children, setChildren] = useState();
  const [tabelOfContentArr, setTabelOfContentArr] = useState([]);

  useEffect(() => {
    getTree().then((tree) => {
      setChildren(tree?.children);
    }).catch((err) => {
      throw new Error(err);
    });
  }, []);

  useEffect(() => {
    if (!children || !pageUrl) {
      return;
    }

    let currentChildren = children;
    let tabelOfContentArrForSet = [];
    let currentPageChildren;

    for (const currentPageUrl of pageUrl) {
      if (currentPageChildren) {
        currentPageChildren = currentPageChildren.find((obj) => obj.url === currentPageUrl)?.children || [];
      }

      currentChildren = currentChildren.find((obj) => obj?.properties?.pageUrl?.url === currentPageUrl)?.children;
      const b = currentChildren.map((obj) => ({ url: obj?.properties?.pageUrl?.url, title: obj?.properties?.Name?.title[0]?.text?.content, children: [] }));

      if (!currentPageChildren) {
        tabelOfContentArrForSet = b;
        currentPageChildren = tabelOfContentArrForSet;
      } else {
        currentPageChildren = b;
      }
    }

    console.log('содержание', tabelOfContentArrForSet);

    setTabelOfContentArr(tabelOfContentArrForSet);
  }, [children, pageUrl]);

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
      <TableOfContents tabelOfContentArr={tabelOfContentArr} currentPageUrl={pageUrl} />
      <ManualPage pageUrl={pageUrl?.length ? pageUrl.join('/') : undefined} />
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
