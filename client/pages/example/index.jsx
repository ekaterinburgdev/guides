/* eslint-disable consistent-return */
import React from 'react';
import map from 'lodash/map';
import styles from '../../styles/Template.module.css';

function GetPage() {
  // TODO: выводить что-то когда нет id-шника страницы
  return (
    <div className={styles.template__column}>
      <h1>{pageId}</h1>
      {map(list, (cl) => wrapper(cl, getColumnItem))}
      {/* {list.map((cl) => getLine(cl))} */}
    </div>
  );
}

export default GetPage;
