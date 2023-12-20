import React from 'react'
import cn from 'classnames'
import Image from 'next/image'
import styles from './TeamPerson.module.css'

export default function TeamPerson(person) {
    const { link } = person
    return link ? (
        <a
            className={cn('TeamPerson', 'TeamPerson_link')}
            href={link}
            target="_blank"
            rel="noopener noreferrer nofollow"
        >
            <TeamPersonInner {...person} />
        </a>
    ) : (
        <div className={cn('TeamPerson')}>
            <TeamPersonInner {...person} />
        </div>
    )
}

function TeamPersonInner({ name, role, photo }) {
    return (
        <figure className={cn(styles.TeamPerson__inner)}>
            {photo.length > 0 && (
                <div className={cn(styles.TeamPerson__photo)}>
                    <Image src={photo} width={300} height={300} loading="lazy" alt="" />
                </div>
            )}
            <figcaption className={cn(styles.TeamPerson__caption)}>
                {name && (
                    <div className={cn(styles.TeamPerson__name)}>
                        {/* eslint-disable-next-line react/no-danger */}
                        <span dangerouslySetInnerHTML={{ __html: name }} />
                    </div>
                )}
                {/* eslint-disable-next-line react/no-danger */}
                {role && (
                    <div
                        dangerouslySetInnerHTML={{ __html: role }}
                        className={cn(styles.TeamPerson__role)}
                    />
                )}
            </figcaption>
        </figure>
    )
}
