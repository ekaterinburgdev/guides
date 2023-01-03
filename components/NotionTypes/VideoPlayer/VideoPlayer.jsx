import React from 'react'

import styles from './VideoPlayer.module.css'

function VideoPlayer({ columnItem }) {
    const url =
        columnItem?.content?.external?.url ?? 'https://www.youtube.com/watch?v=L_LUpnjgPso&t=7016s'

    return (
        <video className={styles.VideoPlayer} width="320" height="240" controls>
            <source src={url} />
        </video>
    )
}

export default VideoPlayer
