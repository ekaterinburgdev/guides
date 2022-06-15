import React, {useState } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import Logo from '../Logo/Logo';
import styles from './TableOfContents.module.css';
import tp from '../../utils/typograf/typograf.config';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

function TableOfContents({
  tableOfContentArr, currentPageUrl = [], anchorLinks, catalogTitle,
}) {
  const [isOpen, setIsOpen] = useState(true);

  // TODO: Сделать для большой вложенности...
  const tableOfContentsLink = ({url, title, children}) => (
    <>
      <Link
        href={{
          pathname: '/[[...pageUrl]]',
          query: {pageUrl: [currentPageUrl[0], url]},
          as: `${currentPageUrl.join('/')}/${url}`,
        }}
      >
        <a
          className={cn(styles.tableOfContentsLink, {
            [styles.active]: currentPageUrl[1] && currentPageUrl[1] === url,
          })}
          href={url}
        >
          {title}
        </a>
      </Link>
      {currentPageUrl[1]
        && currentPageUrl[1] === url
        && anchorLinks.map((anchor) => (
          <a className={styles.innerTableOfContentsLink} key={anchor.title} href={`#${anchor.id}`}>
            {anchor.title}
          </a>
        ))}
    </>
  );

  return (
    <>
      <HamburgerMenu baseState={isOpen} changeState={() => setIsOpen(!isOpen)} />
      <nav style={{display: !isOpen ? 'none' : 'block'}} className={styles.tableOfContents}>
        <Link
          href={{
            pathname: '/',
          }}
        >
          <a className={styles.linkToAllManuals} href="/">
            Все руководства
          </a>
        </Link>
        <Link
          href={{
            pathname: '/[[...pageUrl]]',
            query: {pageUrl: [currentPageUrl[0]]},
          }}
        >
          <a className={styles.catalogTitle} href="/">
            {tp.execute(catalogTitle)}
          </a>
        </Link>
        <ul>{currentPageUrl && tableOfContentArr.map((obj) => tableOfContentsLink(obj))}</ul>
        <Logo logoSrc="/Avatar.svg" linkTo="https://ekaterinburg.design/" />
      </nav>
    </>
  );
}

export default TableOfContents;
