import localFont from 'next/font/local'

export const IsetSans = localFont({
    src: [
        {
            path: 'IsetSans-Light.woff2',
            weight: '300',
        },
        {
            path: 'IsetSans-Medium.woff2',
            weight: '500',
        },
        {
            path: 'IsetSans-SemiBold.woff2',
            weight: '600',
        },
        {
            path: 'IsetSans-Regular.woff2',
            weight: '400',
        },
        {
            path: 'IsetSans-Regular-Italic.woff2',
            weight: '400',
            style: 'italic',
        },
    ],
})
