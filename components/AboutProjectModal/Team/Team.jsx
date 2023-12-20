import React from 'react'
import cn from 'classnames'
import TeamPerson from './TeamPerson'
import team from './team.json'
import styles from './Team.module.css'

export function Team() {
    return (
        <ul className={cn(styles.Team)}>
            {team.map((person) => (
                <li className={cn(styles.Team__item)} key={person.name}>
                    <TeamPerson {...person} />
                </li>
            ))}
        </ul>
    )
}
