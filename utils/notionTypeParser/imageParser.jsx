import React, { useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import { API_HOST } from '../../consts/endpoints'

import 'yet-another-react-lightbox/styles.css'
import styles from '../../components/ManualPage/ManualPage.module.css'

import {
    ANIMATION_DURATION,
    CAROUSEL_SETTINGS,
    CONTROLLER_SETTINGS,
    DOUBLE_CLICK_DELAY,
    DOUBLE_CLICK_MAX_STOPS,
    DOUBLE_TAP_DELAY,
    KEYBOARD_MOVE_DISTANCE,
    LIGHTBOX_STYLES,
    MAX_ZOOM_PIXEL_RATIO,
    PINCH_ZOOM_DISTANCE_FACTOR,
    SCROLL_TO_ZOOM,
    WHEEL_ZOOM_DISTANCE_FACTOR,
    ZOOM_IN_MULTIPLIER,
} from '../../consts/lightboxOptions'

function GuideImage({ notionType }) {
    const cn = classNames(styles.Manual__image, {
        [styles.Manual__image_svg]: String(notionType.content.image_name).includes('svg'),
    })

    const [open, setOpen] = useState(false)
    const srcUrl = `${API_HOST}/static/${notionType.content.image_name}`

    const zoomOptions = {
        doubleClickDelay: DOUBLE_CLICK_DELAY,
        doubleClickMaxStops: DOUBLE_CLICK_MAX_STOPS,
        doubleTapDelay: DOUBLE_TAP_DELAY,
        keyboardMoveDistance: KEYBOARD_MOVE_DISTANCE,
        maxZoomPixelRatio: MAX_ZOOM_PIXEL_RATIO,
        pinchZoomDistanceFactor: PINCH_ZOOM_DISTANCE_FACTOR,
        scrollToZoom: SCROLL_TO_ZOOM,
        wheelZoomDistanceFactor: WHEEL_ZOOM_DISTANCE_FACTOR,
        zoomInMultiplier: ZOOM_IN_MULTIPLIER,
    }

    const image = (
        <>
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src: srcUrl }]}
                plugins={[Zoom]}
                animation={{ zoom: ANIMATION_DURATION }}
                zoom={zoomOptions}
                carousel={CAROUSEL_SETTINGS}
                controller={CONTROLLER_SETTINGS}
                styles={LIGHTBOX_STYLES}
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
