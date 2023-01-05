import React from 'react'
import classNames from 'classnames'

import styles from './SidePage.module.css'
import { Suggestions } from './Suggestions/Suggestions'
import { mockDataForSearch } from '../../mocks/search.mock'

export const SidePage = ({ close }) => {
    const sidePageClassNames = classNames(styles.SidePage__container, {
        [styles.SidePage__close]: close,
    })
    return (
        <section id="SidePage" className={sidePageClassNames}>
            <Suggestions data={mockDataForSearch} />
        </section>
    )
}
