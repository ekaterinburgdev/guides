import React, { useContext } from 'react'
import classNames from 'classnames'
import ClipLoader from 'react-spinners/ClipLoader'
import { useRouter } from 'next/router'

import { PageContext } from '../../pages/manuals/[[...pageUrl]]'
import styles from './SidePage.module.css'
import { Suggestions } from './Suggestions/Suggestions'
import { loadingState } from '../Toolbar/MainPageToolbar'

export const SidePage = ({ close, guideSuggestions }) => {
    const { asPath } = useRouter()
    const sidePageClassNames = classNames(styles.SidePage__container, {
        [styles.SidePage__close]: close,
    })
    const colorContext = useContext(PageContext)
    const { colorMap } = colorContext
    const color = colorMap.filter((item) => asPath.includes(item.url))[0]?.color

    const override = {
        position: 'absolute',
        top: '20%',
        left: '33%',
    }

    console.log(loadingState)

    return (
        <section id="SidePage" className={sidePageClassNames}>
            <Suggestions guideSuggestions={guideSuggestions} />
            <ClipLoader
                color={color}
                loading={false}
                size={150}
                cssOverride={override}
                aria-label="Загрузка предложений"
                data-testid="loader"
            />
        </section>
    )
}
