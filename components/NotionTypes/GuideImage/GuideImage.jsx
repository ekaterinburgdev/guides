import React, { useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import { API_HOST } from '../../../consts/endpoints'

import 'yet-another-react-lightbox/styles.css'
import styles from '../../ManualPage/ManualPage.module.css'

import {
    ANIMATION_DURATION_SETTINGS,
    CONTROLLER_SETTINGS,
    LIGHTBOX_STYLES,
    ZOOM_SETTINGS,
} from '../../../consts/lightboxOptions'

function GuideImage({ notionType }) {
    const cn = classNames(styles.Manual__image, {
        [styles.Manual__image_svg]: String(notionType.content.image_name).includes('svg'),
    })

    const [open, setOpen] = useState(false)
    const srcUrl = `${API_HOST}/static/${notionType.content.image_name}`

    const image = (
        <>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    /* Fix sizing */
                    .yarl__slide_image {
                        max-width: 100% !important;
                        max-height: 100% !important;
                    }

                    /* Add zoom pointer */
                    .yarl__root:has([aria-label="Zoom out"]:not(:disabled)) .yarl__slide_image {
                        cursor: zoom-out;
                    }

                    .yarl__root:has([aria-label="Zoom in"]:not(:disabled)) .yarl__slide_image {
                        cursor: zoom-in;
                    }
            `,
                }}
            />
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={[{ src: srcUrl }]}
                plugins={[Zoom]}
                zoom={ZOOM_SETTINGS}
                animation={ANIMATION_DURATION_SETTINGS}
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