import React from 'react'

import cn from 'classnames'

import styles from './ProjectLinks.module.css'

import Github from './github.svg'

export function ProjectLinks() {
    return (
        <div className={styles.ProjectLinks}>
            <a href="https://github.com/ekaterinburgdev/guides" target="_blank">
                <Github />
            </a>
            <a
                className={cn(styles.ProjectLinks__button, styles.ProjectLinks__button_feedback)}
                href="https://tally.so#tally-open=w5ZYXd&tally-width=650&tally-overlay=1&tally-emoji-animation=none"
            >
                Фидбек
            </a>
        </div>
    )
}
