import React from 'react'
import cn from 'classnames'
import { Button } from '../Button/Button'
import Github from './github.svg'

import styles from './ProjectLinks.module.css'

export function ProjectLinks({ onClickAboutProjects }) {
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
            <Button onClick={onClickAboutProjects}>О проекте</Button>
            <Button
                type="secondary"
                link="mailto:mail@ekaterinburg.design"
            >
                Фидбек
            </Button>
        </div>
    )
}
