export default function setCacheHeaders(res) {
    res.setHeader('Cache-Control', 'public, s-maxage=0, stale-while-revalidate=0')
}
