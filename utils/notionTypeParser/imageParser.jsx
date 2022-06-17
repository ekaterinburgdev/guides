import React from 'react';
import {api} from '../../next.config';
import styles from '../../components/ManualPage/Template.module.css';

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

export default getImage;
