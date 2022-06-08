import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {getAllPage} from '../../api/apiPage';
import styles from './TableOfContents.module.css';

// const queries = ['(max-width: 400px)', '(min-width: 800px)'];

function TableOfContents({tableOfContentArr, currentPageUrl = [], anchorLinks}) {
  const router = useRouter();

  useEffect(() => {
    console.log('якорные ссылки', anchorLinks);
  }, [anchorLinks]);
  useEffect(() => {
    console.log('текущий урл', currentPageUrl);
  }, [currentPageUrl]);

  // const [mobile, desktop] = useMatchMedia(queries);
  // let baseState;

  // if (desktop) {
  //   baseState = false;
  // } else {
  //   baseState = true;
  // }

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
        <a className={styles.tableOfContentsLink} href={url}>
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
      <button type="button" className={styles.openButton} onClick={() => setIsOpen(!isOpen)} />
      <nav style={{display: !isOpen ? 'none' : 'block'}} className={styles.tableOfContents}>
        <ul>{currentPageUrl && tableOfContentArr.map((obj) => tableOfContentsLink(obj))}</ul>
        <a className={styles.logoContainer} href="https://ekaterinburg.design/">
          {/* <img src="../../public/assets/avatar.png" alt="Дизайн код логотип" /> */}
          <p className={styles.logoContainerText}>
            Дизайн-код Екатеринбурга
          </p>
        </a>
      </nav>
    </>
  );
}

export default TableOfContents;
