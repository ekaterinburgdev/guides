export default function setCacheHeaders(res) {
    res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=900')
}
