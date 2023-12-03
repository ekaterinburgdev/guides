export function getNotionColor(colorKey) {
    if (!colorKey) {
        return 'inherit';
    }
    
    return {
        blue: 'rgb(51, 126, 169)',
        yellow: 'rgb(203, 145, 47)',
        red: 'rgb(212, 76, 71)',
        green: 'rgb(68, 131, 97)',
        gray: 'rgb(120, 119, 116)',
        default: 'inherit'
    }[colorKey];
}
