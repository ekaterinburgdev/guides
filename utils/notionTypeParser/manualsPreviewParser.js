import tp from '../typograf/typograf.config'

import HIDDEN_MANUALS from '../../consts/hidden-manuals'

function parseManualsPreview(tree) {
    // TODO Remove hard-code after back-end feature https://github.com/ekaterinburgdev/guides-api/issues/10
    const manualsVisible = tree.children.filter((manual) => {
        return !HIDDEN_MANUALS.includes(manual?.properties?.pageUrl?.url)
    })

    return manualsVisible
        .sort((a, b) => {
            const getOrder = ({ properties }) => properties?.order?.number
            return getOrder(b) - getOrder(a)
        })
        .map(({ properties }) => {
            const { Name, subtitle, pageUrl, color, status, publishedDate } = properties

            return {
                title: tp.execute(Name?.title[0]?.text?.content || ''),
                subtitle: tp.execute(subtitle?.rich_text[0]?.plain_text || ''),
                pageUrl: pageUrl?.url || null,
                color: color?.rich_text[0].plain_text || null,
                status: status?.select?.name || null,
                publishedDate: publishedDate?.date?.start || null,
                pattern: null, // TODO Add `previewPattern`
                image: null, // TODO Add `previewImage`
            }
        })
}

export default parseManualsPreview
