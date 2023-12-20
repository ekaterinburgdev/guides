import Image from 'next/image'
import React from 'react'

import cn from 'classnames'

import logo from './logo.svg?url'

import styles from './Logo.module.css'

export function Logo() {
    return (
        <div className={cn(styles.Logo)}>
            <Image className={styles.LogoImage} src={logo} alt="" />
            <span className={styles.LogoCaption}>
                Руководства
                <br />
                Екатеринбурга
            </span>
        </div>
    )
}
