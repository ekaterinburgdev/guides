import React, { useEffect, useState, createContext } from 'react'
import { useRouter } from 'next/router'
import { getTree, getPage } from '../../api/apiPage'
import TableOfContents from '../../components/TableOfContents/TableOfContents'
import ManualPage from '../../components/ManualPage/ManualPage'
import tp from '../../utils/typograf/typograf.config'
import getManualToc from '../../utils/getManualToc'
import { MANUAL_INDEX_PAGE } from '../../consts/manuals'
import { Toolbar } from '../../components/Toolbar/Toolbar'

import styles from './page.module.css'
import { CSSVarsColors } from '../../components/CSSVarsColors/CSSVarsColors'

export const PageContext = createContext(null)
export const TocStateContext = createContext(null)

function GetPage({
    catalogIndex,
    catalogTitle,
    catalogColor,
    pageIndex,
    pageName,
    pageList,
    pageImage,
    pagePdfUrl,
    manualToc,
}) {
    const router = useRouter()
    const { pageUrl } = router.query

    const [nextPageIndex, setNexPageIndex] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

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
                return { id: columnItem.id, title: getTextContent(columnItem) }

            case 'heading_2':
                return { id: columnItem.id, title: getTextContent(columnItem), type: 'heading_2' }

            default:
                return null
        }
    }

    useEffect(() => {
        if (manualToc.length === 0 || !pageUrl) {
            return
        }

        const curPageUrl = pageUrl.length > 1 ? pageUrl[pageUrl.length - 1] : undefined

        const curPageIndex = manualToc.findIndex((el) => el.url === curPageUrl)
        if (curPageIndex + 1 < manualToc.length) {
            setNexPageIndex(curPageIndex + 1)
        }
    }, [manualToc, pageUrl])

    let anchorLinks = []

    if (pageList.length > 0) {
        anchorLinks = pageList.map(getColumnItem)
        anchorLinks = anchorLinks.filter((l) => l?.id >= 0)
    }

    return (
        <>
            <CSSVarsColors color={catalogColor} />
            <div style={{ counterReset: `page-chapter ${pageIndex}` }}>
                <TocStateContext.Provider value={{ isOpen, setIsOpen }}>
                    <TableOfContents
                        tableOfContentArr={manualToc}
                        currentPageUrl={pageUrl}
                        anchorLinks={anchorLinks}
                        catalogTitle={catalogTitle}
                    />
                    <ManualPage
                        pageName={pageName}
                        pageList={pageList}
                        currentPageUrl={pageUrl}
                        tableOfContentArr={manualToc}
                        nextPageIndex={nextPageIndex}
                        catalogIndex={catalogIndex}
                        catalogTitle={catalogTitle}
                        pageUrl={pageUrl}
                        pageImage={pageImage}
                    />
                    <Toolbar pdf={pagePdfUrl} menuActive={isOpen} menuOnClick={setIsOpen} />
                </TocStateContext.Provider>
            </div>
        </>
    )
}

export async function getServerSideProps({ params: { pageUrl } }) {
    const tree = await getTree()
    const children = tree?.children
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

    const page = await getPage(pageUrl.join('/'))

    const catalogPage = await getPage(catalogPathname)
    const catalogIndex = children.findIndex((catalog) => catalog.id === catalogPage.id)
    const catalogTitle = catalogPage.content.title
    const catalogColor = children[catalogIndex]?.properties?.color?.rich_text[0]?.plain_text
    const pageIndex = page?.node_properties?.properties?.order?.number
    const pageName = page.content.title
    const pageList = page.children
    const pageImage = page?.node_properties?.cover
    const pagePdfUrl = children[catalogIndex]?.properties?.pdfUrl?.url

    return {
        props: {
            catalogIndex,
            catalogTitle,
            catalogColor,
            pageIndex,
            pageName,
            pageList,
            pageImage,
            pagePdfUrl,
            manualToc,
        },
    }
}

export default GetPage
