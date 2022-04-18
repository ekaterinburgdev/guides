/* eslint-disable consistent-return */
import React from 'react';
import map from 'lodash/map';
import styles from '../styles/Template.module.css';

const superagent = require('superagent');

function GetPage() {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    const req = async () => {
      const resp = await superagent.get(
        'http://localhost:48655/api/content?id=b90d7274-8dd8-4eea-85de-9609b532b78a',
      );
      setList(resp.body['b90d7274-8dd8-4eea-85de-9609b532b78a'].children);
    };
    req();
  }, []);

  const wrapper = (obj, func) => {
    const item = obj[Object.keys(obj)[0]];
    return func(item);
  };

  const getItem = (obj) => obj[Object.keys(obj)[0]];

  const makeText = (richTextEl) => (
    <p
      style={{
        fontWeight: richTextEl.annotations.bold ? 'bold' : 'normal',
      }}
    >
      {richTextEl.plain_text}
    </p>
  );

  const makeContentBlock = (block) => {
    if (block.type === 'file') {
      return <img src={block.file.url} alt="фотка" />;
    }

    if (block.type === 'paragraph') {
      return <div>{block.rich_text.map((rt) => makeText(rt))}</div>;
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
            {getItem(cols).children.map((col) => wrapper(col, getColumnItem))}
          </div>
        ))}
      </div>
    );
  };

  const getImage = (imageObj) => {
    console.log(imageObj);

    if (imageObj.content.image_data.caption.length === 0) {
      return (
        <img
          className={styles.template__image}
          src={`http://localhost:48655/static/${imageObj.content.image_name}`} // TODO: хост вынести в переменную
          alt="фотка"
        />
      );
    }
    return (
      <div>
        <img
          className={styles.template__image}
          src={`http://localhost:48655/static/${imageObj.content.image_name}`} // TODO: хост вынести в переменную
          alt="фотка"
        />
        <span>{imageObj.content.image_data.caption[0].plain_text}</span>
      </div>
    );
  };

  const getColumnItem = (columnItem) => {
    switch (columnItem.type) {
      case 'column_list':
        return <>{getLine(columnItem)}</>;

      case 'image':
        return getImage(columnItem);

      case 'heading_1':
        return (
          <h1>
            {columnItem.content.text.map((par, i) => (
              <span key={i}>{par && par.text && par.text.content}</span>
            ))}
          </h1>
        );

      case 'heading_2':
        return (
          <h2>
            {columnItem.content.text.map((par, i) => (
              <span key={i}>{par && par.text && par.text.content}</span>
            ))}
          </h2>
        );

      case 'heading_3':
        return (
          <h3>
            {columnItem.content.text.map((par, i) => (
              <span key={i}>{par && par.text && par.text.content}</span>
            ))}
          </h3>
        );

      case 'paragraph':
        return (
          <p>
            {columnItem.content.text.map((par, i) => (
              <span key={i}>{par && par.text && par.text.content}</span>
            ))}
          </p>
        );

        // case 'table':
        //   return ()

      default:
        return <p>Что я такое...</p>;
    }
  };

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

  return (
    <div className={styles.template__column}>
      {map(list, (cl) => wrapper(cl, getColumnItem))}
      {/* {list.map((cl) => getLine(cl))} */}
    </div>
  );
}

export default GetPage;
