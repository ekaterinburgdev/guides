import React from 'react'
import { ProjectsPanel, PROJECT_GUIDES, PRODUCTION_PROJECTS, Theme } from 'ekb'
import { DEFAULT_COLOR } from '../../consts/defaultColor'

import styles from './Ecosystem.module.css'

export function Ecosystem() {
    return (
        <div className={styles.Ecosystem}>
            <ProjectsPanel
                projects={[PROJECT_GUIDES, ...PRODUCTION_PROJECTS]}
                activeProjectId={PROJECT_GUIDES.id}
                theme={Theme.LIGHT}
                toggleStyle={{
                    backgroundColor: `var(--guides-ecosystem-color, ${DEFAULT_COLOR})`,
                    width: 'var(--guides-ecosystem-width)',
                }}
                style={{
                    left: '8px',
                    bottom: '8px',
                    fontFamily: 'inherit',
                    fontWeight: '400',
                }}
            />
        </div>
    )
}
