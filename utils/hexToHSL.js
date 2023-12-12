export function hexToHSL(hex) {
    const { r, g, b } = hexToRgb(hex)
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)

    let h = (max + min) / 2
    let s = h
    let l = h

    if (max === min) {
        return { h: 0, s: 0, l }
    }

    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0)
            break
        case g:
            h = (b - r) / d + 2
            break
        case b:
            h = (r - g) / d + 4
            break
    }

    h /= 6

    const round = (val) => Math.round(val * 10) / 10

    return {
        h: `${round(360 * h)}deg`,
        s: `${round(s * 100)}%`,
        l: `${round(l * 100)}%`,
    }
}

function hexToRgb(hex) {
    const color = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!color) throw new Error('Color convert error. Wrong input hex value')

    return {
        r: parseInt(color[1], 16) / 255,
        g: parseInt(color[2], 16) / 255,
        b: parseInt(color[3], 16) / 255,
    }
}
