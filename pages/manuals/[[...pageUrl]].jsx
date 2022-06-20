/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import TableOfContents from '../../components/TableOfContents/TableOfContents'
import ManualPage from '../../components/ManualPage/ManualPage'
import { getTree, getPageByUrl } from '../../api/apiPage'
import tp from '../../utils/typograf/typograf.config'
import styles from './page.module.css'
import { PrevPage, NextPage } from '../../components/ArrowNavLink/ArrrowNavLink'

function GetPage() {
    const router = useRouter()
    const { pageUrl } = router.query

    const [prevPageIndex, setPrevPageIndex] = useState(-1)
    const [nextPageIndex, setNexPageIndex] = useState(9e13)
    const [children, setChildren] = useState()
    const [tableOfContentArr, setTableOfContentArr] = useState([])
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
                return { id: columnItem.id, title: getTextContent(columnItem) }

            case 'heading_2':
                return { id: columnItem.id, title: getTextContent(columnItem) }

            case 'heading_3':
                return { id: columnItem.id, title: getTextContent(columnItem) }

            default:
                return null
        }
    }

    React.useEffect(() => {
        if (!pageUrl) {
            return
        }

        getPageByUrl(pageUrl.join('/'))
            .then((page) => {
                setPageList(page.children)
                setPageName(page.content.title)
            })
            .catch((err) => {
                throw new Error('Page is not exist', err)
            })

        const catalogUrl = sessionStorage.getItem('catalogUrl')
        const catalogTitleFromStorage = sessionStorage.getItem('catalogTitle')
        const catalogIdFromStorage = sessionStorage.getItem('catalogId')

        if (
            !catalogUrl ||
            !catalogTitleFromStorage ||
            !catalogIdFromStorage ||
            pageUrl[0] !== catalogUrl
        ) {
            getPageByUrl(pageUrl[0])
                .then((page) => {
                    const catalogTitleForSet = page.content.title
                    const catalogIdForSet = page.id
                    setCatalogTitle(catalogTitleForSet)
                    setCatalogId(catalogIdForSet)
                    sessionStorage.setItem('catalogUrl', pageUrl[0])
                    sessionStorage.setItem('catalogTitle', catalogTitleForSet)
                    sessionStorage.setItem('catalogId', catalogIdForSet)
                })
                .catch((err) => {
                    throw new Error('Page is not exist', err)
                })
        } else {
            // eslint-disable-next-line no-undef
            const catalogTitleForSet = sessionStorage.getItem('catalogTitle')
            // eslint-disable-next-line no-undef
            const catalogIdForSet = sessionStorage.getItem('catalogId')
            setCatalogTitle(catalogTitleForSet)
            setCatalogId(catalogIdForSet)
        }
    }, [pageUrl])

    useEffect(() => {
        getTree()
            .then((tree) => {
                setChildren(tree?.children)
            })
            .catch((err) => {
                throw new Error(err)
            })
    }, [])

    useEffect(() => {
        if (!children || !catalogId || catalogId === '') {
            return
        }

        const catalogIndexForSet = children.findIndex((catalog) => catalog.id === catalogId)
        setCatalogIndex(catalogIndexForSet)
    }, [children, catalogId])

    useEffect(() => {
        if (!children || !pageUrl) {
            return
        }

        let currentChildren = children
        let tableOfContentArrForSet = []
        let currentPageChildren

        for (const currentPageUrl of pageUrl) {
            if (currentPageChildren) {
                currentPageChildren =
                    currentPageChildren.find((obj) => obj.url === currentPageUrl)?.children || []
            }

            currentChildren = currentChildren.find(
                (obj) => obj?.properties?.pageUrl?.url === currentPageUrl
            )?.children
            const b = currentChildren.map((obj) => ({
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
        setTableOfContentArr(tableOfContentArrForSet)
    }, [children, pageUrl])

    useEffect(() => {
        if (tableOfContentArr.length === 0 || !pageUrl) {
            return
        }

        const curPageUrl = pageUrl.length > 1 ? pageUrl[pageUrl.length - 1] : undefined

        const curPageIndex = tableOfContentArr.findIndex((el) => el.url === curPageUrl)
        setPrevPageIndex(curPageIndex - 1)
        setNexPageIndex(curPageIndex + 1)
    }, [tableOfContentArr, pageUrl])

    useEffect(() => {
        if (pageList.length === 0) {
            return
        }

        const anchorLinksForSet = pageList.map(getColumnItem)

        setAnchorLinks(anchorLinksForSet.filter((l) => l?.id))
    }, [pageList])

    return (
        <>
            <TableOfContents
                tableOfContentArr={tableOfContentArr}
                currentPageUrl={pageUrl}
                anchorLinks={anchorLinks}
                catalogTitle={catalogTitle}
            />
            <ManualPage pageList={pageList} pageName={pageName} />
            {tableOfContentArr.length !== 0 && (
                <nav className={styles.footNav}>
                    {(Number.isInteger(prevPageIndex) || Number.isInteger(catalogIndex)) && (
                        <PrevPage
                            children={children}
                            prevPageIndex={prevPageIndex}
                            tableOfContentArr={tableOfContentArr}
                            catalogIndex={catalogIndex}
                            pageUrl={pageUrl}
                        />
                    )}
                    {(Number.isInteger(nextPageIndex) || Number.isInteger(catalogIndex)) && (
                        <NextPage
                            nextPageIndex={nextPageIndex}
                            children={children}
                            tableOfContentArr={tableOfContentArr}
                            catalogIndex={catalogIndex}
                            pageUrl={pageUrl}
                        />
                    )}
                </nav>
            )}
        </>
    )
}

export default GetPage
