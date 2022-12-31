import React from 'react'
import styles from '../../components/ManualPage/Template.module.css'
import { API_HOST } from '../../consts/endpoints'

const getImage = (imageObj) => {
    const image = (
        <img
            className={styles.templateImage}
            src={`${API_HOST}/static/${imageObj.content.image_name}`}
            alt=""
        />
    )

    if (imageObj.content.image_data.caption.length === 0) {
        return image
    }

    return (
        <div>
            {image}
            <span>{imageObj.content.image_data.caption[0].plain_text}</span>
        </div>
    )
}

export default getImage
