import { hexToHSL } from './hexToHSL'

export function getCSSVarsColors(color) {
    const { h, s, l } = hexToHSL(color)

    return {
        '--color-h': h,
        '--color-s': s,
        '--color-l': l,
        '--color-hsl': `var(--color-h) var(--color-s) var(--color-l)`,
        '--color': `hsl(var(--color-hsl))`,
    }
}
