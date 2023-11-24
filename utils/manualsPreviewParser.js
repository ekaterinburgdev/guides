import tp from './typograf/typograf.config'

import { MANUALS_HIDDEN } from '../consts/manuals'
import { API_HOST } from '../consts/endpoints'

function parseManualsPreview(tree) {
    // TODO Remove hard-code after back-end feature https://github.com/ekaterinburgdev/guides-api/issues/10
    const manualsVisible = tree.children.filter((manual) => {
        return !MANUALS_HIDDEN.includes(manual?.properties?.pageUrl?.url)
    })

    return manualsVisible
        .sort((a, b) => {
            const getOrder = ({ properties }) => properties?.order?.number
            return getOrder(b) - getOrder(a)
        })
        .map((manualData) => {
            const {
                Name,
                subtitle,
                pageUrl,
                color,
                status,
                publishedDate,
                previewImage,
                previewPattern,
            } = manualData.properties

            return {
                title: tp.execute(Name?.title[0]?.text?.content || ''),
                subtitle: tp.execute(subtitle?.rich_text[0]?.plain_text || ''),
                pageUrl: pageUrl?.url || null,
                color: color?.rich_text[0]?.plain_text || null,
                status: status?.select?.name || null,
                publishedDate: publishedDate?.date?.start || null,
                pattern: `${API_HOST}/static/${previewPattern}`,
                image: `${API_HOST}/static/${previewImage}`,
                cover: `${API_HOST}/static/${manualData.cover}`,
            }
        })
}

export default parseManualsPreview
