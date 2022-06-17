import React, {useState} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import cn from 'classnames';
import Logo from '../Logo/Logo';
import styles from './TableOfContents.module.css';
import tp from '../../utils/typograf/typograf.config';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

function TableOfContents({tableOfContentArr, currentPageUrl = [], anchorLinks, catalogTitle}) {
  const [isOpen, setIsOpen] = useState(true);

  // TODO: Сделать для большой вложенности...
  const tableOfContentsLink = ({url, title}) => (
    <li className={styles.link}>
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
      {currentPageUrl[1] &&
        currentPageUrl[1] === url &&
        anchorLinks.map(anchor => (
          <a className={styles.innerTableOfContentsLink} key={anchor.title} href={`#${anchor.id}`}>
            {anchor.title}
          </a>
        ))}
    </li>
  );

  return (
    <>
      <Head>
        <title>{catalogTitle}</title>
      </Head>
      <div className={styles.menuContainer}>
        <HamburgerMenu baseState={isOpen} changeState={() => setIsOpen(!isOpen)} />
      </div>
      <aside>
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
          <ul className={styles.linkContainer}>{currentPageUrl && tableOfContentArr.map(obj => tableOfContentsLink(obj))}</ul>
          <Logo logoSrc="/Avatar.svg" linkTo="https://ekaterinburg.design/" />
        </nav>
      </aside>
    </>
  );
}

export default TableOfContents;
