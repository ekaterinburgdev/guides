import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
// import Lightbox from 'yet-another-react-lightbox'
// import Zoom from 'yet-another-react-lightbox/plugins/zoom'

import { API_HOST } from '../../consts/endpoints'
import styles from '../../components/ManualPage/ManualPage.module.css'
import 'yet-another-react-lightbox/styles.css'

function GuideImage({ notionType }) {
    const cn = classNames(styles.Manual__image, {
        [styles.Manual__image_svg]: String(notionType.content.image_name).includes('svg'),
    })
    // const [openLightbox, setOpenLigtbox] = React.useState(false)
    // const maxZoomPixelRatio = 1
    // const zoomInMultiplier = 2
    // const doubleTapDelay = 300
    // const doubleClickDelay = 300
    // const doubleClickMaxStops = 2
    // const keyboardMoveDistance = 50
    // const wheelZoomDistanceFactor = 100
    // const pinchZoomDistanceFactor = 100
    // const scrollToZoom = false

    const image = (
        <>
            <Image
                className={cn}
                src={`${API_HOST}/static/${notionType.content.image_name}`}
                fill
            />
            {/* <Lightbox
                open={openLightbox}
                close={() => setOpenLigtbox(false)}
                slides={[{ src: `${API_HOST}/static/${notionType.content.image_name}` }]}
                plugins={[Zoom]}
                zoom={{
                    maxZoomPixelRatio,
                    zoomInMultiplier,
                    doubleTapDelay,
                    doubleClickDelay,
                    doubleClickMaxStops,
                    keyboardMoveDistance,
                    wheelZoomDistanceFactor,
                    pinchZoomDistanceFactor,
                    scrollToZoom,
                }}
            /> */}
        </>
    )

    if (notionType.content.image_data.caption.length === 0) {
        return <div className={styles.Manual__image__container}>{image}</div>
    }

    return (
        <div className={styles.Manual__image__container}>
            {image}
            <span className={styles.Manual__image_description}>
                {notionType.content.image_data.caption[0].plain_text}
            </span>
            {/* <Lightbox
                open={openLightbox}
                close={() => setOpenLigtbox(false)}
                slides={[{ src: `${API_HOST}/static/${notionType.content.image_name}` }]}
                render={{
                    buttonPrev: () => null,
                    buttonNext: () => null,
                    iconNext: () => null,
                    iconPrev: () => null,
                }}
                plugins={[Zoom]}
                zoom={{
                    maxZoomPixelRatio,
                    zoomInMultiplier,
                    doubleTapDelay,
                    doubleClickDelay,
                    doubleClickMaxStops,
                    keyboardMoveDistance,
                    wheelZoomDistanceFactor,
                    pinchZoomDistanceFactor,
                    scrollToZoom,
                }}
            /> */}
        </div>
    )
}

export default GuideImage
