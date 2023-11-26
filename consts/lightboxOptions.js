import Zoom from 'yet-another-react-lightbox/plugins/zoom'

/** @type { import('yet-another-react-lightbox/dist/types.d.ts').LightboxProps } */
export const lightboxOptions = {
    plugins: [Zoom],
    carousel: {
        finite: true,
    },
    render: {
        buttonPrev: () => null,
        buttonNext: () => null,
    },
    zoom: {
        doubleClickMaxStops: 3,
        doubleTapDelay: 300,
        keyboardMoveDistance: 50,
        maxZoomPixelRatio: 10,
        pinchZoomDistanceFactor: 100,
        scrollToZoom: true,
        wheelZoomDistanceFactor: 100,
        zoomInMultiplier: 2,
    },
    animation: {
        fade: 250,
        zoom: 300,
    },
    controller: {
        closeOnBackdropClick: true,
        closeOnPullDown: true,
    },
    styles: {
        container: {
            background: 'white',
        },
        button: {
            filter: 'none',
            color: 'black',
        },
    },
}
