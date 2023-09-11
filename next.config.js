import { NEXT_PUBLIC_IMAGE_DOMAIN } from './consts/endpoints.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [NEXT_PUBLIC_IMAGE_DOMAIN],
        unoptimized: true,
    },
    async rewrites() {
        return [
            {
                source: '/:pageUrl',
                destination: '/:pageUrl/_index',
            },
            {
                source: '/:pageUrl*',
                destination: '/manuals/:pageUrl*',
            }
        ]
    },
}

export default nextConfig;