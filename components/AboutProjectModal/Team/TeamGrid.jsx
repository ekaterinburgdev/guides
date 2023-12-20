import React from 'react'
import classNames from 'classnames/bind'
import team from './team.json'
import TeamPerson from './TeamPerson'
import styles from './TeamGrid.module.css'

const cx = classNames.bind(styles)

export function TeamGrid() {
    return (
        <ul className={cx('team-grid')}>
            {team.map((person) => (
                <li className={cx('team-grid__item')} key={person.name}>
                    <TeamPerson {...person} />
                </li>
            ))}
        </ul>
    )
}
