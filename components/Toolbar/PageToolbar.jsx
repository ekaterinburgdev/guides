import React, { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import rgbaToRgb from 'rgba-to-rgb'

import { PageContext } from '../../pages/manuals/[[...pageUrl]]'
import getManualColorScheme from '../../utils/getManualColorScheme'
import { PDF_HOST } from '../../consts/endpoints'
import { Toolbar } from './Toolbar.jsx'

export const PageToolbar = ({ isMain } = { isMain: false }) => {
    const { asPath } = useRouter()
    const colorContext = useContext(PageContext)
    const { colorMap, pdfUrlsMap } = colorContext
    const color = colorMap.filter((item) => asPath.includes(item.url))[0]?.color
    const currentUrl = pdfUrlsMap.filter((item) => asPath.includes(item.url))[0]
    const pdfUrl = currentUrl?.pdfUrl ?? ''
    const colorScheme = getManualColorScheme(color)
    const [generatePdfUrl, setGeneratePdfUrl] = useState('')
    const toolbarColor = rgbaToRgb(
        'rgb(255, 255, 255)',
        isMain
            ? '#f5f8fb'
            : `rgba(${Math.trunc(colorScheme.bgLight.color[0])}, ${Math.trunc(
                  colorScheme.bgLight.color[1]
              )}, ${Math.trunc(colorScheme.bgLight.color[2])}, ${colorScheme.bgLight.valpha})`
    )
    let finalUrl

    const getGeneratedPdfUrl = async () => {
        const existsPdf = await (await fetch(`${PDF_HOST}/guides/`, { mode: 'cors' })).json()
        const pdfList = existsPdf?.guides
        if (pdfList.includes(`${currentUrl?.url}.pdf`)) {
            setGeneratePdfUrl(`${PDF_HOST}/guides/${currentUrl?.url}.pdf`)
        }
    }

    useEffect(() => {
        //TODO: to uncomment you need to start the PDF_HOST server
        //getGeneratedPdfUrl()
    }, [])

    if (pdfUrl) {
        finalUrl = pdfUrl
    } else if (generatePdfUrl) {
        finalUrl = generatePdfUrl
    } else {
        finalUrl = false
    }

    return (
        <>
            <Toolbar toolbarColor={toolbarColor} colorTitle={colorScheme.title} pdfUrl={finalUrl} />
        </>
    )
}
