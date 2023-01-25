import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'

import { API_HOST } from '../../consts/endpoints'
import styles from '../../components/ManualPage/ManualPage.module.css'

function GuideImage({ notionType }) {
    const cn = classNames(styles.Manual__image, {
        [styles.Manual__image_svg]: String(notionType.content.image_name).includes('svg'),
    })

    const [open, setOpen] = React.useState(false)
    const [animationDuration, setAnimationDuration] = React.useState(500)
    const [maxZoomPixelRatio, setMaxZoomPixelRatio] = React.useState(1)
    const [zoomInMultiplier, setZoomInMultiplier] = React.useState(2)
    const [doubleTapDelay, setDoubleTapDelay] = React.useState(300)
    const [doubleClickDelay, setDoubleClickDelay] = React.useState(300)
    const [doubleClickMaxStops, setDoubleClickMaxStops] = React.useState(2)
    const [keyboardMoveDistance, setKeyboardMoveDistance] = React.useState(50)
    const [wheelZoomDistanceFactor, setWheelZoomDistanceFactor] = React.useState(100)
    const [pinchZoomDistanceFactor, setPinchZoomDistanceFactor] = React.useState(100)
    const [scrollToZoom, setScrollToZoom] = React.useState(false)
    const [finite, setFinite] = React.useState(true)
    const src_url = `${API_HOST}/static/${notionType.content.image_name}`

    const image = (
        <>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src: src_url }]}
                plugins={[Zoom]}
                animation={{ zoom: animationDuration }}
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
                carousel={{
                    finite,
                }}
                render={{
                    buttonPrev: () => null,
                    buttonNext: () => null,
                }}
            />
            <Image onClick={() => setOpen(true)} className={cn} src={src_url} fill />
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
        </div>
    )
}

export default GuideImage
