/* eslint-disable no-case-declarations */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React from 'react';
import map from 'lodash/map';
import styles from './Template.module.css';
import { getHeaderContent, getTextContent, getListItem } from '../../utils/notionTypeParser/textParser';
import getTableContent from '../../utils/notionTypeParser/tableParser';
import getImage from '../../utils/notionTypeParser/imageParser';

function ManualPage({pageList, pageName}) {
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

  const getColumnItem = (columnItem) => {
    switch (columnItem.type) {
      case 'column_list':
        return <div className={styles.columnList}>{getLine(columnItem)}</div>;

      case 'image':
        return getImage(columnItem);

      case 'heading_1':
        return (
          <h1 id={columnItem.id} className={styles.heading1}>
            {getHeaderContent(columnItem)}
          </h1>
        );

      case 'heading_2':
        return (
          <h2 id={columnItem.id} className={styles.heading2}>
            {getHeaderContent(columnItem)}
          </h2>
        );

      case 'heading_3':
        return (
          <h3 id={columnItem.id} className={styles.heading3}>
            {getHeaderContent(columnItem)}
          </h3>
        );

      case 'paragraph':
        const textContent = getTextContent(columnItem);
        console.log("текст ", textContent);
        return textContent.length ? <p>{textContent}</p> : <br />;

      case 'bookmark':
        return <a href={`${columnItem.content.url}`}>{columnItem.content.url}</a>;

      case 'bulleted_list':
        return <ul>{getListItem(columnItem)}</ul>;

      case 'numbered_list':
        return <ol>{getListItem(columnItem)}</ol>;

      case 'code':
        return <code>{getTextContent(columnItem)}</code>;

      case 'table':
        return <div className={styles.tableContainer}>
          <table className={styles.table1}>
            {columnItem.children.map((child) => <tr key={child.id}>
              {child?.content?.cells?.map((cell) => <td key={cell[0]?.plain_text}>
                {cell[0]?.plain_text}
              </td>)}
            </tr>)}
          </table>
        </div>

      default:
        return <p>Unknown type</p>;
    }
  };

  return (
    <div className={styles.templateColumn}>
      <h1 className={styles.pageName}>{pageName}</h1>
      {map(pageList, (cl) => getColumnItem(cl))}
    </div>
  );
}

export default ManualPage;
