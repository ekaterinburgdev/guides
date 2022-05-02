/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React from 'react';
import map from 'lodash/map';
import styles from './Template.module.css';
import { getPage } from '../../../api/apiPage';
import { api } from '../../../next.config';

function ManualPage({ pageId = '4abb0781-ddb9-41d1-b45f-9bb16483ef1b' }) {
  const [list, setList] = React.useState([]);
  const [pageName, setPageName] = React.useState('');

  React.useEffect(() => {
    getPage(pageId)
      .then((page) => {
        setList(page[pageId].children);
        setPageName(page[pageId].content.title);
      })
      .catch((err) => {
        throw new Error('Page is not exist', err);
      });
  }, [pageId]);

  const getLine = (columnList) => {
    if (!columnList.children.length) {
      return;
    }

    return (
      <div className="row gx-5">
        {columnList.children.map((cols) => (
          <div className="col" key={cols.id}>
            {cols.children.map((col) => getColumnItem(col))}
          </div>
        ))}
      </div>
    );
  };

  const getImage = (imageObj) => {
    if (imageObj.content.image_data.caption.length === 0) {
      return (
        <img
          className={styles.template__image}
          src={`${api.HOST}/static/${imageObj.content.image_name}`}
          alt="фотка"
        />
      );
    }
    return (
      <div>
        <img
          className={styles.template__image}
          src={`${api.HOST}/static/${imageObj.content.image_name}`}
          alt={imageObj.content.image_data.caption[0].plain_text}
        />
        <span>{imageObj.content.image_data.caption[0].plain_text}</span>
      </div>
    );
  };

  const getTextContent = (item) => item.content.text.map((par) => {
    const textContent = par && par.text && par.text.content;
    const stylePar = {
      fontWeight: par?.annotations?.bold ? '500' : '300',
    };

    if (!textContent) {
      return;
    }

    return <span style={{ ...stylePar }} key={textContent}>{textContent}</span>;
  });

  const getListItem = (columnItem) => columnItem.children.map((li) => (
    <li key={li.id}>{getTextContent(li)}</li>
  ));

  const getColumnItem = (columnItem) => {
    switch (columnItem.type) {
      case 'column_list':
        return (
          <div className={styles.columnList}>
            {getLine(columnItem)}
          </div>
        );

      case 'image':
        return getImage(columnItem);

      case 'heading_1':
        return (
          <h1 className={styles.heading1}>
            {getTextContent(columnItem)}
          </h1>
        );

      case 'heading_2':
        return (
          <h2 className={styles.heading2}>
            {getTextContent(columnItem)}
          </h2>
        );

      case 'heading_3':
        return (
          <h3 className={styles.heading3}>
            {getTextContent(columnItem)}
          </h3>
        );

      case 'paragraph':
        return (
          <p>
            {getTextContent(columnItem)}
          </p>
        );

      case 'bookmark':
        return (
          <a href={`${columnItem.content.url}`}>
            {columnItem.content.url}
          </a>
        );

      case 'bulleted_list':
        return (
          <ul>
            {getListItem(columnItem)}
          </ul>
        );

      case 'numbered_list':
        return (
          <ol>
            {getListItem(columnItem)}
          </ol>
        );

      default:
        return <p>Что я такое...</p>;
    }
  };

  return (
    <div className={styles.template__column}>
      <h1 className={styles.pageName}>{pageName}</h1>
      {map(list, (cl) => getColumnItem(cl))}
    </div>
  );
}

export default ManualPage;
