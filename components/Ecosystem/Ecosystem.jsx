import React from 'react'
import { ProjectsPanel, PROJECT_GUIDES, PRODUCTION_PROJECTS, Theme } from 'ekb'

import styles from './Ecosystem.module.css'

export function Ecosystem() {
    return (
        <div className={styles.Ecosystem}>
            <ProjectsPanel
                projects={[PROJECT_GUIDES, ...PRODUCTION_PROJECTS]}
                activeProjectId={PROJECT_GUIDES.id}
                theme={Theme.LIGHT}
                toggleStyle={{
                    backgroundColor: `var(--ecosystem-color)`,
                    width: 'var(--ecosystem-width)',
                    '--projects-panel-text-color': 'var(--color)',
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
