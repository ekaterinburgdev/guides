import React from 'react';
import styles from '../styles/Template.module.css';

const superagent = require('superagent');

function GetPage() {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    const req = async () => {
      const resp = await superagent.get(
        'http://localhost:48655/api/content?id=b90d7274-8dd8-4eea-85de-9609b532b78a',
      );
      setList(resp.body.content);
    };
    req();
  }, []);

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
      return <img src={block.file.url} />;
    }

    if (block.type === 'paragraph') {
      return <div>{block.rich_text.map((rt) => makeText(rt))}</div>;
    }
  };

  const getLine = (columnList) => {
    if (!columnList.columns.length) {
      return;
    }

    return (
      <div className="row gx-5">
        {columnList.columns.map((cols, idx) => (
          <div className="col" key={idx}>
            {cols.columnsItems.map((col) => getColumnItem(col))}
          </div>
        ))}
      </div>
    );
  };

  const getColumnItem = (columnItem) => {
    switch (columnItem.type) {
      case 'image':
        return (
          <img className={styles.template__image} src={columnItem.image} />
        );

      case 'paragraph':
        return (
          <p>
            {console.log(columnItem.paragraph)}
            {columnItem.paragraph.map((par) => (
              <span>{par.text.content}</span>
            ))}
          </p>
        );
    }
  };

  const parseParagraph = (paragraph) => (
    <p>
      {paragraph.map((par) => (
        <span
          style={{
            fontWeight: par.annotations.bold ? 'bold' : 'normal',
          }}
        />
      ))}
    </p>
  );

  return (
    <div className={styles.template__column}>
      {list.map((cl) => getLine(cl))}
    </div>
  );
}

export default GetPage;
