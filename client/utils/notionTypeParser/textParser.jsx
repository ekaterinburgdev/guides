import React from 'react';
import tp from '../typograf/typograf.config';

export const getHeaderContent = (item) => item.content.text.map((par) => {
  const textContent = tp.execute(par?.text?.content);

  if (!textContent) {
    return;
  }

  // eslint-disable-next-line consistent-return
  return textContent;
});

export const getTextContent = (item) => item.content.text.map((par) => {
  const textContent = tp.execute(par?.text?.content);
  const stylePar = {
    fontWeight: par?.annotations?.bold ? '500' : '300',
  };

  if (!textContent) {
    return;
  }

  // eslint-disable-next-line consistent-return
  return (
    <span style={{...stylePar}} key={textContent}>
      {textContent}
    </span>
  );
});

export const getListItem = (columnItem) => {
  columnItem.children.map((li) => <li key={li.id}>{getTextContent(li)}</li>);
};
