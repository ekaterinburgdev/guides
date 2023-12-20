import React from 'react'
import cn from 'classnames'
import { Button } from '../Button/Button'
import Github from './github.svg'

import styles from './ProjectLinks.module.css'

export function ProjectLinks() {
    return (
        <div className={cn(styles.ProjectLinks)}>
            <a
                className={cn(styles.ProjectLinks__github)}
                href="https://github.com/ekaterinburgdev/guides"
                target="_blank"
                aria-label="Код проекта на GitHub"
            >
                <Github />
            </a>
            <Button
                type="secondary"
                link="https://tally.so#tally-open=w5ZYXd&tally-width=650&tally-overlay=1&tally-emoji-animation=none"
            >
                Фидбек
            </Button>
        </div>
    )
}
