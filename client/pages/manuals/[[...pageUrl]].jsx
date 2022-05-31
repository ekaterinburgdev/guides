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

  const [prevPageIndex, setPrevPageIndex] = useState(-1);
  const [nexPageIndex, setNexPageIndex] = useState(9e13);
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
    if (tableOfContentArr.length === 0 || !pageUrl) {
      return;
    }

    const curPageUrl = pageUrl[pageUrl.length - 1]

    const curPageIndex = tableOfContentArr.findIndex((el) => el.url === curPageUrl);
    setPrevPageIndex(curPageIndex - 1);
    setNexPageIndex(curPageIndex + 1);
    console.log('Текущая страница массив', pageUrl);
    console.log('текущий индекс', curPageIndex);
    console.log('массив для навигации', tableOfContentArr);
  }, [tableOfContentArr, pageUrl])

  useEffect(() => {
    if (pageList.length === 0) {
      return;
    }

    const anchorLinksForSet = pageList.map(getColumnItem);

    setAnchorLinks(anchorLinksForSet.filter((l) => l && l.id));
  }, [pageList]);

  return (
    <>
      <TableOfContents
        tableOfContentArr={tableOfContentArr}
        currentPageUrl={pageUrl}
        anchorLinks={anchorLinks}
      />
      <ManualPage pageList={pageList} pageName={pageName} />
      {tableOfContentArr.length !== 0 && <nav className={styles.footNav}>
        {prevPageIndex >= 0 && (
          <Link
            href={{
              pathname: '/[[...pageUrl]]',
              query: {pageUrl: [pageUrl[0], tableOfContentArr[prevPageIndex].url]},
            }}
          >
            <a>
              ←
              {' '}
              {tableOfContentArr[prevPageIndex].title}
            </a>
          </Link>
        )}
        {nexPageIndex < tableOfContentArr.length && (
        <Link
          href={{
            pathname: '/[[...pageUrl]]',
            query: {pageUrl: [pageUrl[0], tableOfContentArr[nexPageIndex].url]},
          }}
        >
          <a>
            {tableOfContentArr[nexPageIndex].title}
            {' '}
            →
          </a>
        </Link>
        )}
      </nav>}
    </>
  );
}

export default GetPage;
