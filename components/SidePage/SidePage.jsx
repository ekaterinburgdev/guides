import React, { useContext } from 'react'
import classNames from 'classnames'
import ClipLoader from 'react-spinners/ClipLoader'
import { useRouter } from 'next/router'
import { useStore } from '@nanostores/react'

import { PageContext } from '../../pages/manuals/[[...pageUrl]]'
import styles from './SidePage.module.css'
import { Suggestions } from './Suggestions/Suggestions'
import { loadingState } from '../Toolbar/Toolbar'

export const SidePage = ({ close, guideSuggestions }) => {
    const { asPath } = useRouter()
    const isLoading = useStore(loadingState)
    const sidePageClassNames = classNames(styles.SidePage__container, {
        [styles.SidePage__close]: close,
    })
    const colorContext = useContext(PageContext)
    const color = colorContext?.colorMap?.filter((item) => asPath?.includes(item.url))[0]?.color

    const override = {
        position: 'absolute',
        top: '20%',
        left: '33%',
    }

    return (
        <section id="SidePage" className={sidePageClassNames}>
            <Suggestions guideSuggestions={guideSuggestions} />
            <ClipLoader
                color={color}
                loading={isLoading}
                size={150}
                cssOverride={override}
                aria-label="Загрузка предложений"
                data-testid="loader"
            />
        </section>
    )
}
