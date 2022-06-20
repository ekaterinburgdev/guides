import React from 'react'
import map from 'lodash/map'
import styles from './Template.module.css'
import { getTextContent } from '../../utils/notionTypeParser/textParser'
import getImage from '../../utils/notionTypeParser/imageParser'
import { H1, H2, H3 } from '../NotionTypes/Headers/Headers'
import Bookmark from '../NotionTypes/Bookmark/Bookmark'
import UnorderedList from '../NotionTypes/Lists/Unordered/Unordered'
import OrderedList from '../NotionTypes/Lists/Ordered/Ordered'
import Code from '../NotionTypes/Text/Code/Code'
import Paragraph from '../NotionTypes/Text/Paragraph/Paragraph'

function ManualPage({ pageList, pageName }) {
    const getLine = (columnList) => {
        if (!columnList.children.length) {
            return
        }

        return (
            <div className="row gx-5">
                {columnList.children.map((cols) => (
                    <div className="col" key={cols.id}>
                        {cols.children.map((col) => getColumnItem(col))}
                    </div>
                ))}
            </div>
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

            case 'code':
                return <Code columnItem={columnItem} />

            case 'table':
                return (
                    <div className={styles.tableContainer}>
                        <table className={styles.table1}>
                            {columnItem.children.map((child) => (
                                <tr key={child.id}>
                                    {child?.content?.cells?.map((cell) => (
                                        <td key={cell[0]?.plain_text}>{cell[0]?.plain_text}</td>
                                    ))}
                                </tr>
                            ))}
                        </table>
                    </div>
                )

            case 'video':
                return (
                    <video>
                        <source src={columnItem?.content?.file?.url} />
                    </video>
                )

            default:
                return <p>Unknown type</p>
        }
    }

    return (
        <div className={styles.templateColumn}>
            <h1 className={styles.pageName}>{pageName}</h1>
            {map(pageList, (cl) => getColumnItem(cl))}
        </div>
    )
}

export default ManualPage
