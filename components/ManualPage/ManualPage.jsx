import React, { Fragment } from 'react'
import t from '../../utils/typograf'
import Image from 'next/image'
import { H1, H2, H3 } from '../NotionTypes/Headings/Headings'
import Bookmark from '../NotionTypes/Bookmark/Bookmark'
import UnorderedList from '../NotionTypes/Lists/Unordered/Unordered'
import OrderedList from '../NotionTypes/Lists/Ordered/Ordered'
import File from '../File/File'
import Paragraph from '../NotionTypes/Text/Paragraph/Paragraph'
import { ArrowNavLink } from '../ArrowNavLink/ArrowNavLink'
import Table from '../NotionTypes/Table/Table'
import Divider from '../NotionTypes/Text/Divider/Divider'
import VideoPlayer from '../NotionTypes/VideoPlayer/VideoPlayer'
import Code from '../NotionTypes/Text/Code/Code'
import { API_HOST } from '../../consts/endpoints'
import GuideImage from '../NotionTypes/GuideImage/GuideImage'
import { Callout } from '../NotionTypes/Callout/Callout'
import { Iframe } from '../NotionTypes/Iframe/Iframe'
import { ManualTitle } from '../ManualTitle/ManualTitle'

import styles from './ManualPage.module.css'

export function ManualPage({
    pageName,
    pageList,
    tableOfContentArr,
    pageUrl,
    nextPageIndex,
    catalogIndex,
    catalogTitle,
    currentPageUrl,
    pageImage,
}) {
    const getLine = (columnList) => {
        if (!columnList.children.length) {
            return
        }

        return (
            <article className={`row gx-2 gy-1 ${styles.Template__item}`}>
                {columnList.children.map((cols, i) => (
                    <div className={`col-sm ${styles.Template__column}`} key={`${cols.id}${i}`}>
                        {cols.children.map((col, i) => (
                            <Fragment key={i}>{getColumnItem(col)}</Fragment>
                        ))}
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
                return <GuideImage notionType={notionType} />

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

            case 'callout':
                return <Callout columnItem={notionType} />

            case 'embed':
                return <Iframe src={notionType.content.url} />

            case 'table_of_contents':
                return <br />

            default:
                return <p>Unknown type</p>
        }
    }

    return (
        <div className={styles.templateColumn}>
            <div className={styles.column}>
                {pageImage && (
                    <div className={styles.previewImageContainer}>
                        <Image
                            className={styles.previewImage}
                            src={`${API_HOST}/static/${pageImage}`}
                            fill
                            priority
                            alt=""
                        />
                    </div>
                )}
                <div className={styles.manualName}>
                    <ManualTitle title={catalogTitle} pageUrl={currentPageUrl[0]} />
                </div>
                <h1 className={styles.pageName}>{t(pageName)}</h1>
                {pageList.map((cl) => (
                    <Fragment key={cl.id}>{getColumnItem(cl)}</Fragment>
                ))}
                {tableOfContentArr.length !== 0 && (
                    <nav className={styles.footNav}>
                        {Number.isInteger(nextPageIndex) && (
                            <ArrowNavLink
                                nextPageIndex={nextPageIndex}
                                tableOfContentArr={tableOfContentArr}
                                catalogIndex={catalogIndex}
                                pageUrl={pageUrl}
                            />
                        )}
                    </nav>
                )}
            </div>
        </div>
    )
}
