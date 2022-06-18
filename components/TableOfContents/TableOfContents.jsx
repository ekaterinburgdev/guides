import React, {useState} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import cn from 'classnames';
import {createMedia} from '@artsy/fresnel';
import {useMediaQuery} from 'react-responsive';
import Logo from '../Logo/Logo';
import styles from './TableOfContents.module.css';
import tp from '../../utils/typograf/typograf.config';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

const {MediaContextProvider, Media} = createMedia({
  // breakpoints values can be either strings or integers
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1024,
    xl: 1192,
  },
});

function InnerLink({anchor, baseState, setState}) {
  const isDesktop = useMediaQuery({
    query: '(min-width: 768px)',
  });
  if (isDesktop) {
    return (
      <a className={styles.innerTableOfContentsLink} key={anchor.title} href={`#${anchor.id}`}>
        {anchor.title}
      </a>
    );
  }
  return (
    <a
      className={styles.innerTableOfContentsLink}
      key={anchor.title}
      href={`#${anchor.id}`}
      onClick={() => setState(!baseState)}
    >
      {anchor.title}
    </a>
  );
}

function TableOfContents({
  tableOfContentArr, currentPageUrl = [], anchorLinks, catalogTitle,
}) {
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
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
        </a>
      </Link>
      {currentPageUrl[1] && currentPageUrl[1] === url && anchorLinks.length > 0 && (
        <div className={styles.innerLinkContainer}>
          {anchorLinks.map((anchor) => (
            <InnerLink key={anchor.id} anchor={anchor} baseState={isOpen} setState={setIsOpen} />
          ))}
        </div>
      )}
    </li>
  );

  return (
    <>
      <Head>
        <title>{catalogTitle}</title>
      </Head>
      <MediaContextProvider>
        <Media lessThan="md">
          <HamburgerMenu baseState={isOpen} changeState={() => setIsOpen(!isOpen)} />
        </Media>
        <aside>
          <nav style={{display: !isOpen ? 'none' : 'block'}} className={styles.tableOfContents}>
            <Link
              href={{
                pathname: '/',
              }}
            >
              <a className={styles.linkToAllManuals} href="/">
                ←&nbsp;Городские руководства
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
            <ul className={styles.linkContainer}>
              {currentPageUrl && tableOfContentArr.map((obj) => tableOfContentsLink(obj))}
            </ul>
            <Logo logoSrc="/Avatar.svg" linkTo="https://ekaterinburg.design/" />
          </nav>
        </aside>
      </MediaContextProvider>
    </>
  );
}

export default TableOfContents;
