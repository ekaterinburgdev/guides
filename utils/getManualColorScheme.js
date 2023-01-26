import Color from 'color'

function getManualColorScheme(baseColor) {
    const color = Color(baseColor)
    return {
        title: color.rgb(),
        manual: color.alpha(0.05).lighten(0.2).rgb(),
        bgLight: color.alpha(0.1).lighten(0.2).rgb(),
        bgDark: color.alpha(0.4).rgb(),
    }
}

export default getManualColorScheme
