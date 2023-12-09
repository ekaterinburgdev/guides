import { hexToHSL } from './hexToHSL'

export function getHSLColorCSSVars(color) {
    const { h, s, l } = hexToHSL(color)

    return {
        '--guides-color': `hsl(${h} ${s} ${l})`,
        '--guides-color-hsl': `${h} ${s} ${l}`,
        '--guides-color-h': h,
        '--guides-color-s': s,
        '--guides-color-l': l,
    }
}
