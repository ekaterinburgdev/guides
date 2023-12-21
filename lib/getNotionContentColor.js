export function getNotionColor(colorKey) {
    if (!colorKey) {
        return null
    }

    return {
        blue: 'var(--color-text-blue)',
        yellow: 'var(--color-text-yellow)',
        red: 'var(--color-text-red)',
        green: 'var(--color-text-green)',
        gray: 'var(--color-text-gray)',
        default: null,
    }[colorKey]
}
