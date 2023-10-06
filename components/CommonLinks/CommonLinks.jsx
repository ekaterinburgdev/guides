import React, { useContext } from 'react'
import rgbaToRgb from 'rgba-to-rgb'
import { useRouter } from 'next/router'
import { ProjectsPanel, PROJECT_GUIDES, PRODUCTION_PROJECTS, Theme } from 'ekb'
import { ThemeContext } from '../../pages/_app'
import { TocStateContext } from '../../pages/manuals/[[...pageUrl]]'

const WIDTH = 270

export function CommonLinks({ color, bgColor, mainPage }) {
    const isDark = useContext(ThemeContext)
    const { asPath } = useRouter()
    let isOpen = false
    if (asPath !== '/') {
        isOpen = useContext(TocStateContext).isOpen
    }
    const currentBgColor = bgColor ?? 'rgba(255, 255, 255, 1)'
    const mainPageColor = isDark ? '#1A1C1F' : '#f5f8fb'
    const commonColor = mainPage
        ? mainPageColor
        : rgbaToRgb(
              isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
              `rgba(${Math.trunc(currentBgColor.color[0])}, ${Math.trunc(
                  currentBgColor.color[1]
              )}, ${Math.trunc(currentBgColor.color[2])}, ${currentBgColor.valpha})`
          )

    return (
        <ProjectsPanel
            projects={[PROJECT_GUIDES, ...PRODUCTION_PROJECTS]}
            activeProjectId={PROJECT_GUIDES.id}
            theme={Theme.LIGHT}
            toggleStyle={{ width: WIDTH, backgroundColor: commonColor }}
            style={{ left: '8px', bottom: '8px', fontFamily: 'inherit', fontWeight: '400' }}
        />
    )
}
