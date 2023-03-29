import React from 'react'
import classNames from 'classnames'

import styles from './SidePage.module.css'
import { Suggestions } from './Suggestions/Suggestions'
import { Loader } from '../Loader/Loader'

export const SidePage = ({ isClose, items, isLoading = false, query = '' }) => {
    const sidePageClassNames = classNames(styles.SidePage__container, {
        [styles.SidePage__close]: isClose,
    })

    return (
        <section id="SidePage" className={sidePageClassNames}>
            <Suggestions items={items} query={query} isLoading={isLoading} />
            {isLoading && <Loader />}
        </section>
    )
}
