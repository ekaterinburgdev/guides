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
    children,
    pageList,
    pageName,
    catalogPage,
    pageImage,
    colorMap,
    iconMap,
    pdfUrlsMap,
    manualToc,
}) {
    const router = useRouter()
    const { pageUrl } = router.query
    const isDesktop = useMediaQuery({
        query: '(min-width: 991px)',
    })

    const [nextPageIndex, setNexPageIndex] = useState(null)
    const [anchorLinks, setAnchorLinks] = useState([])
    const [isOpen, setIsOpen] = useState(isDesktop)

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
                return { id: columnItem.id, title: getTextContent(columnItem) }

            case 'heading_2':
                return { id: columnItem.id, title: getTextContent(columnItem), type: 'heading_2' }

            default:
                return null
        }
    }

    useEffect(() => {
        if (!catalogPage) {
            return
        }

        setCatalogTitle(catalogPage.content.title)
        setCatalogId(catalogPage.id)
    }, [catalogPage])

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
        if (curPageIndex + 1 < manualToc.length) {
            setNexPageIndex(curPageIndex + 1)
        }
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
            <PageContext.Provider
                value={{
                    colorMap,
                    iconMap,
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
                        pageList={pageList}
                        pageName={pageName}
                        children={children}
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
    const iconMap = children.map((children) => {
        return {
            imageUrl: `${API_HOST}/static/${children?.properties?.previewImage[0]}` ?? null,
            url: children?.properties?.pageUrl?.url ?? null,
        }
    })
    const pdfUrlsMap = children.map((children) => {
        return {
            pdfUrl: children?.properties?.pdfUrl?.url ?? null,
            url: children?.properties?.pageUrl?.url ?? null,
        }
    })

    return {
        props: {
            children,
            pageName,
            pageList,
            pageImage: page?.node_properties?.cover,
            catalogPage: await getPageByUrl(pageUrl[0]),
            colorMap,
            iconMap,
            pdfUrlsMap,
            manualToc,
        },
    }
}

export default GetPage
