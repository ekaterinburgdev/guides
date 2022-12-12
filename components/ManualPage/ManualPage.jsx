import React from 'react'
import map from 'lodash/map'
import Image from 'next/image'

import styles from './ManualPage.module.css'
import tp from '../../utils/typograf/typograf.config'
import getImage from '../../utils/notionTypeParser/imageParser'
import { H1, H2, H3 } from '../NotionTypes/Headers/Headers'
import Bookmark from '../NotionTypes/Bookmark/Bookmark'
import UnorderedList from '../NotionTypes/Lists/Unordered/Unordered'
import OrderedList from '../NotionTypes/Lists/Ordered/Ordered'
import File from '../File/File'
import Paragraph from '../NotionTypes/Text/Paragraph/Paragraph'
import { PrevPage, NextPage } from '../ArrowNavLink/ArrowNavLink'
import Table from '../NotionTypes/Table/Table'
import Divider from '../NotionTypes/Text/Divider/Divider'
import VideoPlayer from '../NotionTypes/VideoPlayer/VideoPlayer'
import Code from '../NotionTypes/Text/Code/Code'
import { API_HOST } from '../../consts/endpoints'

function ManualPage({
    pageList,
    pageName,
    tableOfContentArr,
    pageUrl,
    prevPageIndex,
    nextPageIndex,
    catalogIndex,
    children,
    pageImage,
}) {
    const getLine = (columnList) => {
        if (!columnList.children.length) {
            return
        }

        return (
            <article className={`row gx-2 ${styles.Template__item}`}>
                {columnList.children.map((cols) => (
                    <div className="col" key={cols.id}>
                        {cols.children.map((col) => getColumnItem(col))}
                    </div>
                ))}
            </article>
        )
    }

    const getColumnItem = (notionType) => {
        switch (notionType.type) {
            case 'column_list':
                return <div className={styles.columnList}>{getLine(notionType)}</div>

            case 'image':
                return getImage(notionType)

            case 'heading_1':
                return <H1 columnItem={notionType} />

            case 'heading_2':
                return <H2 columnItem={notionType} />

            case 'heading_3':
                return <H3 columnItem={notionType} />

            case 'paragraph':
                return <Paragraph columnItem={notionType} />

            case 'bookmark':
                return <Bookmark columnItem={notionType} />

            case 'bulleted_list':
                return <UnorderedList columnItem={notionType} />

            case 'numbered_list':
                return <OrderedList columnItem={notionType} />

            case 'table':
                return <Table columnItem={notionType} />

            case 'divider':
                return <Divider />

            case 'video':
                return <VideoPlayer columnItem={notionType} />

            case 'file':
                return <File columnItem={notionType} />

            case 'code':
                return <Code columnItem={notionType} />

            default:
                return <p>Unknown type</p>
        }
    }

    return (
        <div className={styles.templateColumn}>
            {pageImage && (
                <div className={styles.previewImageContainer}>
                    <Image
                        className={styles.previewImage}
                        src={`${API_HOST}/static/${pageImage}`}
                        fill
                    />
                </div>
            )}
            <h1 className={styles.pageName}>{tp.execute(pageName)}</h1>
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
