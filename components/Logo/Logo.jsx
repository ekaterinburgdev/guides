import React from 'react';
import styles from './logo.module.css';

export default function Logo({ linkTo, logoSrc, ...props }) {
  return (
    <a className={styles.logoContainer} href={linkTo}>
      <img src={logoSrc} alt="Дизайн код логотип" />
      <p className={styles.logoContainerText}>
        Дизайн-код
        <br />
        Екатеринбурга
      </p>
    </a>
  );
}
