import React from 'react'

import styles from './SidePage.module.css'
import { Suggestions } from './Suggestions/Suggestions'
import { Loader } from '../Loader/Loader'

export const SidePage = ({ isClose, items, isLoading = false, query = '' }) => {
    return (
        <section className={styles.SidePage__container} hidden={isClose}>
            <Suggestions items={items} query={query} isLoading={isLoading} />
            {isLoading && <Loader />}
        </section>
    )
}
