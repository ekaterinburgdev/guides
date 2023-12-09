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
                    backgroundColor: 'var(--guide-ecosystem-color)',
                    width: 'var(--guide-ecosystem-width)',
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
