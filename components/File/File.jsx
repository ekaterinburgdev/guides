import Image from 'next/image'
import React from 'react'

function File({ columnItem }) {
    const src = columnItem?.content?.external?.url

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Image width={32} height={32} src="/pdfIcon.svg" />
            <a style={{ textDecoration: 'none' }} href={src}>
                Ссылка на файл
            </a>
        </div>
    )
}

export default File
