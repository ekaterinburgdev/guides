import localFont from '@next/font/local'

export const isetSansFont = localFont({
    src: [
        {
            path: '../styles/fonts/IsetSans-Light.woff2',
            weight: '300',
        },
        {
            path: '../styles/fonts/IsetSans-Medium.woff2',
            weight: '500',
        },
        {
            path: '../styles/fonts/IsetSans-SemiBold.woff2',
            weight: '600',
        },
        {
            path: '../styles/fonts/IsetSans-Regular.woff2',
            weight: '400',
        },
        {
            path: '../styles/fonts/IsetSans-Regular-Italic.woff2',
            weight: '400',
            style: 'italic',
        },
    ],
})
