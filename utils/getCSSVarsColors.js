import { hexToHSL } from './hexToHSL'

export function getCSSVarsColors(color) {
    const { h } = hexToHSL(color)

    return {
        '--color-h': h,
        '--color-s': '45%',
        '--color-l': '45%',
        '--color-hsl': `var(--color-h) var(--color-s) var(--color-l)`,
        '--color': `hsl(var(--color-hsl))`,
    }
}
