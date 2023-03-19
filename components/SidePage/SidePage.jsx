import React from 'react'
import classNames from 'classnames'

import styles from './SidePage.module.css'
import { Suggestions } from './Suggestions/Suggestions'
import { Loader } from '../Loader/Loader'

export const SidePage = ({ close, guideSuggestions, isLoading = false, currentQuery = '' }) => {
    const sidePageClassNames = classNames(styles.SidePage__container, {
        [styles.SidePage__close]: close,
    })

    return (
        <section id="SidePage" className={sidePageClassNames}>
            <Suggestions
                guideSuggestions={guideSuggestions}
                currentQuery={currentQuery}
                isLoading={isLoading}
            />
            <Loader isLoading={isLoading} />
        </section>
    )
}
