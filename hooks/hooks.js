import { useState, useEffect } from 'react'

const getMobileDetect = (userAgent) => {
    const isAndroid = () => Boolean(userAgent.match(/Android/i))
    const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i))
    const isOpera = () => Boolean(userAgent.match(/Opera Mini/i))
    const isWindows = () => Boolean(userAgent.match(/IEMobile/i))
    const isSSR = () => Boolean(userAgent.match(/SSR/i))
    const isMobile = () => Boolean(isAndroid() || isIos() || isOpera() || isWindows())
    const isDesktop = () => Boolean(!isMobile() && !isSSR())
    return {
        isMobile,
        isDesktop,
        isAndroid,
        isIos,
        isSSR,
    }
}

export const useMobileDetect = () => {
    useEffect(() => {}, [])
    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent
    return getMobileDetect(userAgent)
}

export const useDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(true)
    useEffect(() => {
        const onResize = () => {
            setIsDesktop(window.innerWidth > 991)
        }
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])
    return isDesktop
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
