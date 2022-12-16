import Color from 'color'

function getManualColorScheme(baseColor) {
    const color = Color(baseColor)
    return {
        title: color.rgb(),
        bgLight: color.alpha(0.2).lighten(0.2).rgb(),
        bgDark: color.alpha(0.4).rgb(),
    }
}

export default getManualColorScheme
