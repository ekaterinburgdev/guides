import Color from 'color'

function getBackgroundColor(primaryColor) {
    return Color(primaryColor).alpha(0.8).lighten(0.6).rgb()
}

export default getBackgroundColor
