import React, { Fragment, useContext, useMemo } from 'react'
import map from 'lodash/map'
import Image from 'next/image'
import { useRouter } from 'next/router'
import rgbaToRgb from 'rgba-to-rgb'

import styles from './ManualPage.module.css'
import tp from '../../utils/typograf/typograf.config'
import { H1, H2, H3 } from '../NotionTypes/Headings/Headings'
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
import GuideImage from '../../utils/notionTypeParser/imageParser'
import { PageContext } from '../../pages/manuals/[[...pageUrl]]'
import getManualColorScheme from '../../utils/getManualColorScheme'
import { Callout } from '../NotionTypes/Callout/Callout'
import { ThemeContext } from '../../pages/_app'

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
    const { asPath } = useRouter()
    const colorContext = useContext(PageContext)
    const { colorMap } = colorContext
    const color = useMemo(() => colorMap.filter((item) => asPath.includes(item.url))[0]?.color)
    const colorScheme = getManualColorScheme(color)
    const isDark = useContext(ThemeContext)
    const arrowColor = rgbaToRgb(
        isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
        `rgba(${Math.trunc(colorScheme.bgLight.color[0])}, ${Math.trunc(
            colorScheme.bgLight.color[1]
        )}, ${Math.trunc(colorScheme.bgLight.color[2])}, ${colorScheme.bgLight.valpha})`
    )

    const getLine = (columnList) => {
        if (!columnList.children.length) {
            return
        }

        return (
            <article className={`row gx-2 ${styles.Template__item}`}>
                {columnList.children.map((cols, i) => (
                    <div className={`col ${styles.Template__column}`} key={`${cols.id}${i}`}>
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
                <h1 className={styles.pageName}>{tp.execute(pageName)}</h1>
                <style
                    dangerouslySetInnerHTML={{
                        __html: `body { counter-reset: page-chapter ${pageName.replace(
                            /\. .*/,
                            ''
                        )} }`,
                    }}
                />
                {map(pageList, (cl) => (
                    <Fragment key={cl.id}>{getColumnItem(cl)}</Fragment>
                ))}
                {tableOfContentArr.length !== 0 && (
                    <nav className={styles.footNav}>
                        {Number.isInteger(prevPageIndex) && (
                            <PrevPage
                                backgroundColor={arrowColor}
                                children={children}
                                prevPageIndex={prevPageIndex}
                                tableOfContentArr={tableOfContentArr}
                                catalogIndex={catalogIndex}
                                pageUrl={pageUrl}
                                color={color}
                            />
                        )}
                        {Number.isInteger(nextPageIndex) && (
                            <NextPage
                                backgroundColor={arrowColor}
                                nextPageIndex={nextPageIndex}
                                children={children}
                                tableOfContentArr={tableOfContentArr}
                                catalogIndex={catalogIndex}
                                pageUrl={pageUrl}
                                color={color}
                            />
                        )}
                    </nav>
                )}
            </div>
        </div>
    )
}

export default ManualPage
