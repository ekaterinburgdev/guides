import { getCSSVarsColors } from '../../utils/getCSSVarsColors'

export function CSSVarsColors({ color }) {
    const inlineStyle = Object.entries(getCSSVarsColors(color))
        .map(([prop, value]) => {
            return `${prop}: ${value}`
        })
        .join(';')

    return <style dangerouslySetInnerHTML={{ __html: `:root { ${inlineStyle} }` }} />
}
