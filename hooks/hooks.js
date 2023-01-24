import { useState, useEffect } from 'react'

export const useDesktop = () => {
    const [desktop, setDesktop] = useState('')
    useEffect(() => {
        window
            .matchMedia('(min-width: 991px)')
            .addEventListener('change', (e) => e.matches && setDesktop(true))
        window
            .matchMedia('(min-width: 991px)')
            .addEventListener('change', (e) => e.matches && setDesktop(false))
    }, [])
    console.log(desktop)
    return desktop
}

export const useDark = () => {
    const [dark, setDark] = useState('')
    useEffect(() => {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (e) => e.matches && setDark(true))
        window
            .matchMedia('(prefers-color-scheme: light)')
            .addEventListener('change', (e) => e.matches && setDark(false))
    }, [])
    return dark
}
