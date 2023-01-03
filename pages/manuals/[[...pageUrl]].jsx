import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import TableOfContents from '../../components/TableOfContents/TableOfContents'
import ManualPage from '../../components/ManualPage/ManualPage'
import { getTree, getPageByUrl } from '../../api/apiPage'
import tp from '../../utils/typograf/typograf.config'
import { API_HOST } from '../../consts/endpoints'
import styles from './page.module.css'
import getManualToc from '../../utils/getManualToc'
import { MANUAL_INDEX_PAGE } from '../../consts/manuals'

function GetPage({ tree, page, catalogPage, pageImage, color, colorMap, iconMap, manualToc }) {
    const router = useRouter()
    const { pageUrl } = router.query

    const [prevPageIndex, setPrevPageIndex] = useState(-1)
    const [nextPageIndex, setNexPageIndex] = useState(9e13)
    const [children, setChildren] = useState()
    const [anchorLinks, setAnchorLinks] = useState([])

    const [pageList, setPageList] = React.useState([])
    const [pageName, setPageName] = React.useState('')
    const [catalogTitle, setCatalogTitle] = React.useState('')
    const [catalogId, setCatalogId] = React.useState('')
    const [catalogIndex, setCatalogIndex] = React.useState()

    const getColumnItem = (columnItem) => {
        const getLine = (columnList) => {
            if (!columnList.children.length) {
                return
            }

            return columnList.children.map((cols) => cols.children.map((col) => getColumnItem(col)))
        }

        const getTextContent = (item) =>
            item.content.text.map((par) => {
                const textContent = tp.execute(par?.text?.content)
                if (!textContent) {
                    return
                }

                return textContent
            })

        switch (columnItem.type) {
            case 'column_list':
                return <div className={styles.columnList}>{getLine(columnItem)}</div>

            case 'heading_1':
                return { id: columnItem.id, title: getTextContent(columnItem, true) }

            case 'heading_2':
                return { id: columnItem.id, title: getTextContent(columnItem, true) }

            case 'heading_3':
                return { id: columnItem.id, title: getTextContent(columnItem, true) }

            default:
                return null
        }
    }

    useEffect(() => {
        if (!page) {
            return
        }

        setPageList(page.children)
        setPageName(page.content.title)
    }, [page])

    useEffect(() => {
        if (!catalogPage) {
            return
        }

        setCatalogTitle(catalogPage.content.title)
        setCatalogId(catalogPage.id)
    }, [catalogPage])

    useEffect(() => {
        if (!tree) {
            return
        }

        setChildren(tree?.children)
    }, [tree])

    useEffect(() => {
        if (!children || !catalogId || catalogId === '') {
            return
        }

        const catalogIndexForSet = children.findIndex((catalog) => catalog.id === catalogId)
        setCatalogIndex(catalogIndexForSet)
    }, [children, catalogId])

    useEffect(() => {
        if (manualToc.length === 0 || !pageUrl) {
            return
        }

        const curPageUrl = pageUrl.length > 1 ? pageUrl[pageUrl.length - 1] : undefined

        const curPageIndex = manualToc.findIndex((el) => el.url === curPageUrl)
        setPrevPageIndex(curPageIndex - 1)
        setNexPageIndex(curPageIndex + 1)
    }, [manualToc, pageUrl])

    useEffect(() => {
        if (pageList.length === 0) {
            return
        }
        const anchorLinksForSet = pageList.map(getColumnItem)
        setAnchorLinks(anchorLinksForSet.filter((l) => l?.id >= 0))
    }, [pageList])

    return (
        <>
            <TableOfContents
                tableOfContentArr={manualToc}
                currentPageUrl={pageUrl}
                anchorLinks={anchorLinks}
                catalogTitle={catalogTitle}
                color={color}
                colorMap={colorMap}
                iconMap={iconMap}
            />
            <ManualPage
                pageList={pageList}
                pageName={pageName}
                children={children}
                tableOfContentArr={manualToc}
                prevPageIndex={prevPageIndex}
                nextPageIndex={nextPageIndex}
                catalogIndex={catalogIndex}
                pageUrl={pageUrl}
                pageImage={pageImage}
                colorMap={colorMap}
            />
        </>
    )
}

export async function getServerSideProps({ params: { pageUrl } }) {
    const tree = await getTree()
    const manualPath = pageUrl
    const catalogPathname = pageUrl[0]
    const manualToc = getManualToc(tree, pageUrl)

    if (manualPath?.length === 0 || manualToc?.length === 0) {
        return {
            notFound: true,
        }
    }

    const isCatalogIndexPage = manualPath.includes(MANUAL_INDEX_PAGE)
    const hasCatalogIndexPage = manualToc.some((x) => x.url === MANUAL_INDEX_PAGE)

    if (isCatalogIndexPage && !hasCatalogIndexPage) {
        const firstTocPage = manualToc[0].url
        return {
            redirect: {
                destination: `/${catalogPathname}/${firstTocPage}`,
                permanent: false,
            },
        }
    }

    const page = await getPageByUrl(pageUrl.join('/'))
    const colorMap = tree.children.map((children) => {
        return {
            color: children?.properties?.color?.rich_text[0]?.plain_text ?? null,
            url: children?.properties?.pageUrl?.url ?? null,
        }
    })
    const iconMap = tree.children.map((children) => {
        return {
            imageUrl: `${API_HOST}/static/${children?.properties?.previewImage[0]}` ?? null,
            url: children?.properties?.pageUrl?.url ?? null,
        }
    })

    return {
        props: {
            tree,
            page,
            pageImage: page?.node_properties?.cover,
            catalogPage: await getPageByUrl(pageUrl[0]),
            colorMap,
            iconMap,
        },
    }
}

export default GetPage
