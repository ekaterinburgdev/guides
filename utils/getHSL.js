import Color from 'color'

export function getHSL(color) {
    const [h, s, l] = Color(color).hsl().color
    const round = (val) => Math.round(val * 1000) / 1000

    return {
        h: `${round(h)}deg`,
        s: `${round(s)}%`,
        l: `${round(l)}%`,
    }
}
