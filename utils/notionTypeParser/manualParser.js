import HIDDEN_MANUALS from '../../consts/hidden-manuals'

export default function parseManuals(tree) {
    // TODO Remove hard-code after back-end feature https://github.com/ekaterinburgdev/guides-api/issues/10
    const manualsVisible = tree.children.filter((manual) => {
        return !HIDDEN_MANUALS.includes(manual?.properties?.pageUrl?.url)
    })

    return manualsVisible
        .sort((a, b) => {
            const orderA = a.properties?.order?.number
            const orderB = b.properties?.order?.number
            return orderB - orderA
        })
        .map(({ properties }) => {
            return {
                title: properties?.Name?.title[0]?.text?.content || null,
                subtitle: properties?.subtitle?.rich_text[0]?.plain_text || null,
                pageUrl: properties?.pageUrl?.url || null,
                color: properties?.color?.rich_text[0].plain_text || null,
                status: properties?.status?.select?.name || null,
                publishedDate: properties?.publishedDate?.date?.start || null,
                pattern: null, // TODO Add `previewPattern`
                image: null, // TODO Add `previewImage`
            }
        })
}
