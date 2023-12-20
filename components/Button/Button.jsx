import cn from 'classnames'
import styles from './Button.module.css'

export function Button({ link, type = 'primary', size = 'small', onClick, children }) {
    const className = cn(
        styles.Button,
        styles[`Button_type-${type}`],
        styles[`Button_size-${size}`]
    )

    return link ? (
        <a className={className} href={link} target="_blank" rel="noreferrer" onClick={onClick}>
            {children}
        </a>
    ) : (
        <button type="button" className={className} onClick={onClick}>
            {children}
        </button>
    )
}
