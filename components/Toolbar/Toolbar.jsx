import React from 'react'
import cn from 'classnames'

import Close from './close.svg'
import Download from './download.svg'
import Menu from './menu.svg'

import styles from './Toolbar.module.css'

export const Toolbar = ({ pdf, menuActive, menuOnClick }) => {
    return (
        <>
            <div className={styles.Toolbar}>
                <>
                    {pdf && (
                        <a
                            className={styles.Toolbar__item}
                            href={pdf}
                            target="_blank"
                            aria-label="Скачать .pdf"
                        >
                            <Download />
                        </a>
                    )}

                    {menuActive !== undefined && (
                        <button
                            className={cn(styles.Toolbar__item, styles.Toolbar__item_menu)}
                            onClick={() => menuOnClick(!menuActive)}
                        >
                            {menuActive ? <Close /> : <Menu />}
                        </button>
                    )}
                </>
            </div>
        </>
    )
}
