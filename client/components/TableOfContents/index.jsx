import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { getAllPage } from '../../api/apiPage';
import styles from "./TableOfContents.module.css";

function TableOfContents() {
  const [sections, setSections] = useState([]);
  const [generalProvisions, setGeneralProvisions] = useState([]);

  useEffect(() => {
    getAllPage()
      .then((res) => {
        setGeneralProvisions([res.general_provisions]);
        setSections(res.sections);
      })
      .catch((err) => console.error("Ошибка при получении всех страниц", err));
  }, []);

  return (
    <nav className={styles.tableOfContents}>
      <ul>
        {generalProvisions.map((page) => (
          <li key={page.id}>
            <Link
              key={page.id}
              href={{
                pathname: "/example/[pageId]",
                query: { pageId: page.id },
              }}
            >
              {page.name_ru}
            </Link>
          </li>
        ))}
        {sections.map((page) => (
          <li key={page.id}>
            <Link
              href={{
                pathname: "/example/[pageId]",
                query: { pageId: page.id },
              }}
            >
              {page.name_ru}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;
