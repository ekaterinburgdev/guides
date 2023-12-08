import React from 'react'
import { ProjectsPanel, PROJECT_GUIDES, PRODUCTION_PROJECTS, Theme } from 'ekb'

export function CommonLinks() {
    return (
        <ProjectsPanel
            projects={[PROJECT_GUIDES, ...PRODUCTION_PROJECTS]}
            activeProjectId={PROJECT_GUIDES.id}
            theme={Theme.LIGHT}
            toggleStyle={{
                width: 'calc(var(--sidebar-width) - 88px)',
            }}
            style={{ left: '8px', bottom: '8px', fontFamily: 'inherit', fontWeight: '400' }}
        />
    )
}
