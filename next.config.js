/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/,
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
                use: ['@svgr/webpack'],
            },
        )

        fileLoaderRule.exclude = /\.svg$/i

        return config
    },
    images: {
        unoptimized: true,
    },
    output: 'export',
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