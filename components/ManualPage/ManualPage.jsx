import React from 'react'
import map from 'lodash/map'

import styles from './ManualPage.module.css'
import getImage from '../../utils/notionTypeParser/imageParser'
import { H1, H2, H3 } from '../NotionTypes/Headers/Headers'
import Bookmark from '../NotionTypes/Bookmark/Bookmark'
import UnorderedList from '../NotionTypes/Lists/Unordered/Unordered'
import OrderedList from '../NotionTypes/Lists/Ordered/Ordered'
import Paragraph from '../NotionTypes/Text/Paragraph/Paragraph'
import { PrevPage, NextPage } from '../ArrowNavLink/ArrowNavLink'
import Table from '../NotionTypes/Table/Table'
import Divider from '../NotionTypes/Text/Divider/Divider'

function ManualPage({
    pageList,
    pageName,
    tableOfContentArr,
    pageUrl,
    prevPageIndex,
    nextPageIndex,
    catalogIndex,
    children,
}) {
    const getLine = (columnList) => {
        if (!columnList.children.length) {
            return
        }

        return (
            <article className={`row gx-4 ${styles.Template__item}`}>
                {columnList.children.map((cols) => (
                    <div className="col" key={cols.id}>
                        {cols.children.map((col) => getColumnItem(col))}
                    </div>
                ))}
            </article>
        )
    }

    const getColumnItem = (columnItem) => {
        switch (columnItem.type) {
            case 'column_list':
                return <div className={styles.columnList}>{getLine(columnItem)}</div>

            case 'image':
                return getImage(columnItem)

            case 'heading_1':
                return <H1 columnItem={columnItem} />

            case 'heading_2':
                return <H2 columnItem={columnItem} />

            case 'heading_3':
                return <H3 columnItem={columnItem} />

            case 'paragraph':
                return <Paragraph columnItem={columnItem} />

            case 'bookmark':
                return <Bookmark columnItem={columnItem} />

            case 'bulleted_list':
                return <UnorderedList columnItem={columnItem} />

            case 'numbered_list':
                return <OrderedList columnItem={columnItem} />

            case 'table':
                return <Table columnItem={columnItem} />

            case 'divider':
                return <Divider />

            default:
                return <p>Unknown type</p>
        }
    }

    return (
        <div className={styles.templateColumn}>
            <h1 className={styles.pageName}>{pageName}</h1>
            {map(pageList, (cl) => getColumnItem(cl))}
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
        </div>
    )
}

export default ManualPage
