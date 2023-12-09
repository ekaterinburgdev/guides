import Color from 'color'

export function getHSLColorCSSVars(color) {
    const { h, s, l } = getHSL(color)

    return {
        '--guides-color': `hsl(${h} ${s} ${l})`,
        '--guides-color-hsl': `${h} ${s} ${l}`,
        '--guides-color-h': h,
        '--guides-color-s': s,
        '--guides-color-l': l,
    }
}

function getHSL(color) {
    const [h, s, l] = Color(color).hsl().color
    const round = (val) => Math.round(val * 1000) / 1000

    return {
        h: `${round(h)}deg`,
        s: `${round(s)}%`,
        l: `${round(l)}%`,
    }
}
