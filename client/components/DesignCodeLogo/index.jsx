import React from 'react';
import Image from 'next/image';
import styles from './DesignCodeLogo.module.css';

function DesignCodeLogo() {
  return (
    <div className={styles.container}>
      <Image src="/../../public/assets/avatar.png" width={60} height={60} />
      <a href="https://ekaterinburg.design/" className={styles.text}>
        Дизайн-код Екатеринбурга
      </a>
    </div>
  );
}

export default DesignCodeLogo;
