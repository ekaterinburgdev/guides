import React, { useEffect, useRef } from 'react'
import classNames from 'classnames/bind'

import Close from './close.svg'

import styles from './Modal.module.css'

const cn = classNames.bind(styles)

export function Modal({ open, maxWidth, onClose: handleClose, children }) {
    const ref = useRef(null)

    const close = () => {
        ref.current.close()
    }

    useEffect(() => {
        if (!open) {
            ref.current.close()
            return
        }

        ref.current.showModal()
        // Remove focus after open
        document.activeElement.blur()

        const handleClickOutside = (e) => {
            if (ref.current === e.target) {
                close()
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [open])

    return (
        <dialog className={cn(styles.Modal)} style={{ maxWidth }} onClose={handleClose} ref={ref}>
            <div className={cn(styles.ModalInner)}>
                <button className={cn(styles.ModalClose)} onClick={close} aria-label="Закрыть">
                    <Close />
                </button>

                <div className={cn(styles.ModalContent)}>{children}</div>
            </div>
        </dialog>
    )
}
