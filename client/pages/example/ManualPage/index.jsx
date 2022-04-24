/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React from 'react';
import map from 'lodash/map';
import styles from './Template.module.css';
import { getPage } from '../../../api/apiPage';
import { api } from '../../../next.config';

function ManualPage({ pageId = '' }) {
  const [list, setList] = React.useState([]);
  const [pageName, setPageName] = React.useState('');

  React.useEffect(() => {
    getPage(pageId)
      .then((page) => {
        setList(page[pageId].children);
        setPageName(page[pageId].content.title);
      })
      .catch((err) => console.error('Ошибка при получении страницы', err));
  }, [pageId]);

  /*
  const wrapper = (obj, func) => {
    const item = obj[Object.keys(obj)[0]];
    return func(item);
  };
  */

  /*
  const makeText = (richTextEl) => (
    <p
      style={{
        fontWeight: richTextEl.annotations.bold ? 'bold' : 'normal',
      }}
    >
      {richTextEl.plain_text}
    </p>
  );
  */

  /*
  const makeContentBlock = (block) => {
    if (block.type === 'file') {
      return <img src={block.file.url} alt="фотка" />;
    }

    if (block.type === 'paragraph') {
      return <div>{block.rich_text.map((rt) => makeText(rt))}</div>;
    }
  };
  */

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

  const getTextContent = (columnItem) => columnItem.content.text.map((par, i) => (
    <span key={i}>{par && par.text && par.text.content}</span>
  ));

  const getColumnItem = (columnItem) => {
    switch (columnItem.type) {
      case 'column_list':
        return <div className={styles.columnList}>{getLine(columnItem)}</div>;

      case 'image':
        return getImage(columnItem);

      case 'heading_1':
        return <h1>{getTextContent(columnItem)}</h1>;

      case 'heading_2':
        return (
          <h2 className={styles.heading2}>{getTextContent(columnItem)}</h2>
        );

      case 'heading_3':
        return (
          <h3 className={styles.heading3}>{getTextContent(columnItem)}</h3>
        );

      case 'paragraph':
        return <p>{getTextContent(columnItem)}</p>;

      case 'bookmark':
        return (
          <a href={`${columnItem.content.url}`}>{columnItem.content.url}</a>
        );

      case 'bulleted_list':
        return (
          <ul>
            {columnItem.children.map((li, i) => (
              <li key={i}>
                {li.content.text.map((par) => (
                  <span key={i}>{par && par.text && par.text.content}</span>
                ))}
              </li>
            ))}
          </ul>
        );

      case 'numbered_list':
        return (
          <ol>
            {columnItem.children.map((li, i) => (
              <li key={i}>
                {li.content.text.map((par) => (
                  <span key={i}>{par && par.text && par.text.content}</span>
                ))}
              </li>
            ))}
          </ol>
        );

      default:
        return <p>Что я такое...</p>;
    }
  };

  const getLine = (columnList) => {
    if (!columnList.children.length) {
      return;
    }

    return (
      <div className="row gx-5">
        {columnList.children.map((cols, idx) => (
          <div className="col" key={idx}>
            {cols.children.map((col) => getColumnItem(col))}
          </div>
        ))}
      </div>
    );
  };

  /*
  const parseParagraph = (paragraph) => (
    <p>
      {paragraph.map((par, i) => (
        <span
          key={i}
          style={{
            fontWeight: par.annotations.bold ? 'bold' : 'normal',
          }}
        />
      ))}
    </p>
  );
  */

  return (
    <div className={styles.template__column}>
      <h1 className={styles.pageName}>{pageName}</h1>
      {map(list, (cl) => getColumnItem(cl))}
    </div>
  );
}

export default ManualPage;
