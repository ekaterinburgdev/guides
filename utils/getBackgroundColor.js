import Color from 'color'

function getBackgroundColor(primaryColor) {
    return Color(primaryColor).alpha(0.2).lighten(0.2).rgb()
}

export default getBackgroundColor
