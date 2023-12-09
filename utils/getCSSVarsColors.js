import { hexToHSL } from './hexToHSL'

export function getCSSVarsColors(color) {
    const { h, s, l } = hexToHSL(color)

    return {
        // HSL values for control colors from CSS
        '--color-h': h,
        '--color-s': s,
        '--color-l': l,
        '--color-hsl': `${h} ${s} ${l}`,

        // Colors presets
        '--text': `hsl(${h} ${s} ${l})`,
        '--underline': `hsl(${h} ${s} ${l} / 30%)`,
        '--bg-light': `hsl(${h} ${s} calc(${l} + 10%) / 10%)`,
        '--bg-dark': `hsl(${h} ${s} ${l} / 30%)`,
    }
}
