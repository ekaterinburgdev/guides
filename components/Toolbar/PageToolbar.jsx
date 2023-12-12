import React from 'react'
import { Toolbar } from './Toolbar.jsx'

export const PageToolbar = ({ pagePdfUrl } = { isMain: false }) => {
    return <Toolbar pdfUrl={pagePdfUrl} />
}
