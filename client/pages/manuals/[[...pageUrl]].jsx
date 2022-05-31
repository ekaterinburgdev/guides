/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable-next-line consistent-return */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import findIndex from 'lodash/findIndex';
import TableOfContents from '../../components/TableOfContents';
import ManualPage from '../../components/ManualPage';
import { getTree, getPageByUrl } from '../../api/apiPage';

import styles from './page.module.css';

function GetPage() {
  const router = useRouter();
  const { pageUrl } = router.query;

  // const [prevPage, setPrevPage] = useState();
  // const [nexPage, setNextPage] = useState();
  const [children, setChildren] = useState();
  const [tableOfContentArr, setTableOfContentArr] = useState([]);
  const [anchorLinks, setAnchorLinks] = useState([]);

  const [pageList, setPageList] = React.useState([]);
  const [pageName, setPageName] = React.useState('');

  const getColumnItem = (columnItem) => {
    const getLine = (columnList) => {
      if (!columnList.children.length) {
        return;
      }

      return columnList.children.map((cols) => cols.children.map((col) => getColumnItem(col)));
    };

    const getTextContent = (item) => item.content.text.map((par) => {
      const textContent = par && par.text && par.text.content;
      const stylePar = {
        fontWeight: par?.annotations?.bold ? '500' : '300',
      };
      if (!textContent) {
        return;
      }

      return textContent;
      // return (
      //   <span style={{ ...stylePar }} key={textContent}>
      //     {textContent}
      //   </span>
      // );
    });

    switch (columnItem.type) {
      case 'column_list':
        return <div className={styles.columnList}>{getLine(columnItem)}</div>;

      case 'heading_1':
        return { id: columnItem.id, title: getTextContent(columnItem) };

      case 'heading_2':
        return { id: columnItem.id, title: getTextContent(columnItem) };

      case 'heading_3':
        return { id: columnItem.id, title: getTextContent(columnItem) };

      default:
        return null;
    }
  };

  React.useEffect(() => {
    if (!pageUrl) {
      return;
    }

    getPageByUrl(pageUrl.join('/'))
      .then((page) => {
        setPageList(page.children);
        setPageName(page.content.title);
      })
      .catch((err) => {
        throw new Error('Page is not exist', err);
      });
  }, [pageUrl]);

  useEffect(() => {
    getTree()
      .then((tree) => {
        setChildren(tree?.children);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  useEffect(() => {
    if (!children || !pageUrl) {
      return;
    }

    let currentChildren = children;
    let tableOfContentArrForSet = [];
    let currentPageChildren;

    for (const currentPageUrl of pageUrl) {
      if (currentPageChildren) {
        currentPageChildren = currentPageChildren.find((obj) => obj.url === currentPageUrl)?.children || [];
      }

      currentChildren = currentChildren.find(
        (obj) => obj?.properties?.pageUrl?.url === currentPageUrl,
      )?.children;
      const b = currentChildren.map((obj) => ({
        url: obj?.properties?.pageUrl?.url,
        title: obj?.properties?.Name?.title[0]?.text?.content,
        children: [],
      }));

      if (!currentPageChildren) {
        tableOfContentArrForSet = b;
        currentPageChildren = tableOfContentArrForSet;
      } else {
        currentPageChildren = b;
      }
    }
    setTableOfContentArr(tableOfContentArrForSet);
  }, [children, pageUrl]);

  useEffect(() => {
    if (pageList.length === 0) {
      return;
    }

    const anchorLinksForSet = pageList.map(getColumnItem);

    setAnchorLinks(anchorLinksForSet.filter((l) => l && l.id));
  }, [pageList]);

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
      <TableOfContents
        tableOfContentArr={tableOfContentArr}
        currentPageUrl={pageUrl}
        anchorLinks={anchorLinks}
      />
      <ManualPage pageList={pageList} pageName={pageName} />
      {/* <nav className={styles.footNav}></nav>
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
