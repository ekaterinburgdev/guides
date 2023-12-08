import React from 'react'
import rgbaToRgb from 'rgba-to-rgb'
import { ProjectsPanel, PROJECT_GUIDES, PRODUCTION_PROJECTS, Theme } from 'ekb'

export function CommonLinks({ bgColor, mainPage }) {
    const currentBgColor = bgColor ?? 'rgba(255, 255, 255, 1)'
    const mainPageColor = '#f5f8fb'
    const commonColor = mainPage
        ? mainPageColor
        : rgbaToRgb(
              'rgb(255, 255, 255)',
              `rgba(${Math.trunc(currentBgColor.color[0])}, ${Math.trunc(
                  currentBgColor.color[1]
              )}, ${Math.trunc(currentBgColor.color[2])}, ${currentBgColor.valpha})`
          )

    return (
        <ProjectsPanel
            projects={[PROJECT_GUIDES, ...PRODUCTION_PROJECTS]}
            activeProjectId={PROJECT_GUIDES.id}
            theme={Theme.LIGHT}
            toggleStyle={{
                width: 'calc(var(--sidebar-width) - 88px)',
                backgroundColor: commonColor,
            }}
            style={{ left: '8px', bottom: '8px', fontFamily: 'inherit', fontWeight: '400' }}
        />
    )
}
