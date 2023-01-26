import React, { useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import 'yet-another-react-lightbox/styles.css'
import { API_HOST } from '../../consts/endpoints'
import styles from '../../components/ManualPage/ManualPage.module.css'
import {
    ANIMATION_DURATION,
    DOUBLE_CLICK_DELAY,
    DOUBLE_CLICK_MAX_STOPS,
    DOUBLE_TAP_DELAY,
    IS_FINITE,
    KEYBOARD_MOVE_DISTANCE,
    MAX_ZOOM_PIXEL_RATIO,
    PINCH_ZOOM_DISTANCE_FACTOR,
    SCROLL_TO_ZOOM,
    WHEEL_ZOOM_DISTANCE_FACTOR,
    ZOOM_IN_MULTIPLIER,
} from '../../consts/zoomOptions.consts'

function GuideImage({ notionType }) {
    const cn = classNames(styles.Manual__image, {
        [styles.Manual__image_svg]: String(notionType.content.image_name).includes('svg'),
    })

    const [open, setOpen] = useState(false)
    const [animationDuration, setAnimationDuration] = useState(ANIMATION_DURATION)
    const [maxZoomPixelRatio, setMaxZoomPixelRatio] = useState(MAX_ZOOM_PIXEL_RATIO)
    const [zoomInMultiplier, setZoomInMultiplier] = useState(ZOOM_IN_MULTIPLIER)
    const [doubleTapDelay, setDoubleTapDelay] = useState(DOUBLE_TAP_DELAY)
    const [doubleClickDelay, setDoubleClickDelay] = useState(DOUBLE_CLICK_DELAY)
    const [doubleClickMaxStops, setDoubleClickMaxStops] = useState(DOUBLE_CLICK_MAX_STOPS)
    const [keyboardMoveDistance, setKeyboardMoveDistance] = useState(KEYBOARD_MOVE_DISTANCE)
    const [wheelZoomDistanceFactor, setWheelZoomDistanceFactor] = useState(
        WHEEL_ZOOM_DISTANCE_FACTOR
    )
    const [pinchZoomDistanceFactor, setPinchZoomDistanceFactor] = useState(
        PINCH_ZOOM_DISTANCE_FACTOR
    )
    const [scrollToZoom, setScrollToZoom] = useState(SCROLL_TO_ZOOM)
    const [finite, setFinite] = useState(IS_FINITE)

    const srcUrl = `${API_HOST}/static/${notionType.content.image_name}`

    const zoomOptions = {
        maxZoomPixelRatio,
        zoomInMultiplier,
        doubleTapDelay,
        doubleClickDelay,
        doubleClickMaxStops,
        keyboardMoveDistance,
        wheelZoomDistanceFactor,
        pinchZoomDistanceFactor,
        scrollToZoom,
    }

    const image = (
        <>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src: srcUrl }]}
                plugins={[Zoom]}
                animation={{ zoom: animationDuration }}
                zoom={zoomOptions}
                carousel={{
                    finite,
                }}
                render={{
                    buttonPrev: () => null,
                    buttonNext: () => null,
                }}
            />
            <Image onClick={() => setOpen(true)} className={cn} src={srcUrl} fill />
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
