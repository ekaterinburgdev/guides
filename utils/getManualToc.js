function getManualToc(tree, pageUrl) {
    if (!tree.children || !pageUrl) {
        return []
    }

    let tableOfContentArrForSet = []
    let currentPageChildren

    // eslint-disable-next-line no-restricted-syntax
    for (const currentPageUrl of pageUrl) {
        if (currentPageChildren) {
            currentPageChildren =
                currentPageChildren.find((obj) => obj.url === currentPageUrl)?.children || []
        }

        const manualSectionsRaw = tree.children?.find(
            (obj) => obj?.properties?.pageUrl?.url === currentPageUrl
        )?.children

        const manualSections = manualSectionsRaw
            ?.map((obj) => ({
                url: obj?.properties?.pageUrl?.url,
                order: obj?.properties?.order?.number,
                title: obj?.properties?.Name?.title[0]?.text?.content,
                children: [],
            }))
            // BUG Remove `order` field and sorting after https://github.com/ekaterinburgdev/guides-cache-service/issues/13
            ?.sort(({ order: orderA }, { order: orderB }) => orderA - orderB)

        if (!currentPageChildren) {
            tableOfContentArrForSet = manualSections
            currentPageChildren = tableOfContentArrForSet
        } else {
            currentPageChildren = manualSections
        }
    }
    return tableOfContentArrForSet || []
}

export default getManualToc
