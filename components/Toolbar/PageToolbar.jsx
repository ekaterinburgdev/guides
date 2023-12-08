import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import rgbaToRgb from 'rgba-to-rgb'

import { PageContext } from '../../pages/manuals/[[...pageUrl]]'
import getManualColorScheme from '../../utils/getManualColorScheme'
import { Toolbar } from './Toolbar.jsx'

export const PageToolbar = ({ isMain, pagePdfUrl } = { isMain: false }) => {
    const { asPath } = useRouter()
    const colorContext = useContext(PageContext)
    const { colorMap } = colorContext
    const color = colorMap.filter((item) => asPath.includes(item.url))[0]?.color
    const colorScheme = getManualColorScheme(color)
    const toolbarColor = rgbaToRgb(
        'rgb(255, 255, 255)',
        isMain
            ? '#f5f8fb'
            : `rgba(${Math.trunc(colorScheme.bgLight.color[0])}, ${Math.trunc(
                  colorScheme.bgLight.color[1]
              )}, ${Math.trunc(colorScheme.bgLight.color[2])}, ${colorScheme.bgLight.valpha})`
    )

    return (
        <>
            <Toolbar
                toolbarColor={toolbarColor}
                colorTitle={colorScheme.title}
                pdfUrl={pagePdfUrl}
            />
        </>
    )
}
