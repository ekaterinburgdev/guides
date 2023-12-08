import React, { useEffect, useState, createContext } from 'react'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'

import TableOfContents from '../../components/TableOfContents/TableOfContents'
import ManualPage from '../../components/ManualPage/ManualPage'
import { getTree, getPageByUrl } from '../../api/apiPage'
import tp from '../../utils/typograf/typograf.config'
import { API_HOST } from '../../consts/endpoints'
import styles from './page.module.css'
import getManualToc from '../../utils/getManualToc'
import { MANUAL_INDEX_PAGE } from '../../consts/manuals'
import { PageToolbar } from '../../components/Toolbar/PageToolbar.jsx'
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu'

export const PageContext = createContext(null)
export const TocStateContext = createContext(null)

function GetPage({
    catalogTitle,
    catalogIndex,
    pageIndex,
    pageName,
    pageList,
    pageImage,
    colorMap,
    pdfUrlsMap,
    manualToc,
}) {
    const router = useRouter()
    const { pageUrl } = router.query
    const isDesktop = useMediaQuery({
        query: '(min-width: 991px)',
    })

    const [nextPageIndex, setNexPageIndex] = useState(null)
    const [isOpen, setIsOpen] = useState(isDesktop)

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
            <PageContext.Provider
                value={{
                    colorMap,
                    pdfUrlsMap,
                }}
            >
                <HamburgerMenu state={isOpen} changeState={setIsOpen} colorMap={colorMap} />
                <TocStateContext.Provider value={{ isOpen, setIsOpen }}>
                    <TableOfContents
                        tableOfContentArr={manualToc}
                        currentPageUrl={pageUrl}
                        anchorLinks={anchorLinks}
                        catalogTitle={catalogTitle}
                    />
                    <ManualPage
                        pageIndex={pageIndex}
                        pageName={pageName}
                        pageList={pageList}
                        tableOfContentArr={manualToc}
                        nextPageIndex={nextPageIndex}
                        catalogIndex={catalogIndex}
                        pageUrl={pageUrl}
                        pageImage={pageImage}
                    />
                    <PageToolbar />
                </TocStateContext.Provider>
            </PageContext.Provider>
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

    const page = await getPageByUrl(pageUrl.join('/'))
    const pageList = page.children
    const pageName = page.content.title

    const colorMap = children.map((children) => {
        return {
            color: children?.properties?.color?.rich_text[0]?.plain_text ?? null,
            url: children?.properties?.pageUrl?.url ?? null,
        }
    })

    const pdfUrlsMap = children.map((children) => {
        return {
            pdfUrl: children?.properties?.pdfUrl?.url ?? null,
            url: children?.properties?.pageUrl?.url ?? null,
        }
    })

    const catalogPage = await getPageByUrl(catalogPathname)
    const catalogIndex = children.findIndex((catalog) => catalog.id === catalogPage.id)
    const catalogTitle = catalogPage.content.title
    const pageIndex = page?.node_properties?.properties?.order?.number
    const pageImage = page?.node_properties?.cover

    return {
        props: {
            catalogTitle,
            catalogIndex,
            pageIndex,
            pageName,
            pageList,
            pageImage,
            colorMap,
            pdfUrlsMap,
            manualToc,
        },
    }
}

export default GetPage
