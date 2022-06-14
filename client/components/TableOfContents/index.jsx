import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import cn from 'classnames';
import styles from './TableOfContents.module.css';
import tp from '../../utils/typograf/typograf.config';

function TableOfContents({
  tableOfContentArr, currentPageUrl = [], anchorLinks, catalogTitle,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log('каталог тайтл', catalogTitle);
  }, [catalogTitle]);

  useEffect(() => {
    console.log('якорные ссылки', anchorLinks);
  }, [anchorLinks]);
  useEffect(() => {
    console.log('текущий урл', currentPageUrl);
  }, [currentPageUrl]);

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
            {tp.execute(anchor.title)}
          </a>
        ))}
    </>
  );

  return (
    <>
      <button type="button" className={styles.openButton} onClick={() => setIsOpen(!isOpen)} />
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
        <a className={styles.logoContainer} href="https://ekaterinburg.design/">
          {/* <img src="../../public/assets/avatar.png" alt="Дизайн код логотип" /> */}
          <p className={styles.logoContainerText}>Дизайн-код Екатеринбурга</p>
        </a>
      </nav>
    </>
  );
}

export default TableOfContents;
