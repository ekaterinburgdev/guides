function getManualToc(tree, pageUrl) {
    if (!tree.children || !pageUrl) {
        return []
    }

    let currentChildren = tree.children
    let tableOfContentArrForSet = []
    let currentPageChildren

    for (const currentPageUrl of pageUrl) {
        if (currentPageChildren) {
            currentPageChildren =
                currentPageChildren.find((obj) => obj.url === currentPageUrl)?.children || []
        }

        currentChildren = currentChildren?.find(
            (obj) => obj?.properties?.pageUrl?.url === currentPageUrl
        )?.children

        const b = currentChildren?.map((obj) => ({
            url: obj?.properties?.pageUrl?.url,
            title: obj?.properties?.Name?.title[0]?.text?.content,
            children: [],
        }))

        if (!currentPageChildren) {
            tableOfContentArrForSet = b
            currentPageChildren = tableOfContentArrForSet
        } else {
            currentPageChildren = b
        }
    }
    return tableOfContentArrForSet || []
}

export default getManualToc
