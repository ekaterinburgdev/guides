import React from 'react'
import classNames from 'classnames'
import { useStore } from '@nanostores/react'

import styles from './SidePage.module.css'
import { Suggestions } from './Suggestions/Suggestions'
import { loadingState } from '../Toolbar/Toolbar'
import { Loader } from '../Loader/Loader'

export const SidePage = ({ close, guideSuggestions }) => {
    const isLoading = useStore(loadingState)
    const sidePageClassNames = classNames(styles.SidePage__container, {
        [styles.SidePage__close]: close,
    })

    return (
        <section id="SidePage" className={sidePageClassNames}>
            <Suggestions guideSuggestions={guideSuggestions} />
            <Loader isLoading={isLoading} />
        </section>
    )
}
