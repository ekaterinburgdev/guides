import React from 'react'
import { Modal } from './Modal/Modal'
import { Team } from './Team/Team'
import { Logo } from '../Logo/Logo'
import { Button } from '../Button/Button'

import TelegramIcon from './icon-telegram.svg'
import GithubIcon from './icon-github.svg'

export function AboutProjectModal({ open, onClose: handleClose }) {
    return (
        <Modal open={open} onClose={handleClose}>
            <header>
                <Logo small />
                <h2>Городские стандарты в&nbsp;одном месте</h2>
            </header>

            <p>
                У администрации Екатеринбурга есть множество полезных руководств и методических
                рекомендаций о том, как правильно развивать город. Чтобы их было легко найти и
                изучить, мы&nbsp;разработали «Руководства Екатеринбурга»&nbsp;— сервис, где в одном
                месте собраны все официальные стандарты.
            </p>

            <h3>Цель</h3>
            <p>
                Мы&nbsp;создаём единую базу знаний о&nbsp;городе, которую легко изучать, развивать и
                дополнять. Вместо долгой вёрстки неповоротливых PDF-файлов авторы стандартов пишут
                их в удобном веб-интерфейсе, а читатель не тратит время на поиски и скачивание
                файлов.
            </p>

            <h3>Планы</h3>
            <p>
                Это первая версия сервиса. В&nbsp;будущем мы&nbsp;планируем добавить поиск, выгрузку
                стандартов в PDF (т. к. для официального утверждения требуется файл), заменить ноушн
                на другой редактор контента и&nbsp;много чего ещё. Чтобы ничего не&nbsp;пропустить
                подписывайтесь на&nbsp;
                <a href="https://t.me/ekaterinburgdev" target="_blank">
                    <TelegramIcon />
                    телеграм-канал
                </a>
                .
            </p>
            <p>
                Проект является полностью открытым. Кто угодно может в&nbsp;него законтрибьютить или
                форкнуть. Заходите&nbsp;на&nbsp;
                <a href="https://github.com/ekaterinburgdev/guides" target="_blank">
                    <GithubIcon />
                    гитхаб
                </a>
                .
            </p>
            <h3>Команда проекта</h3>
            <p>
                Мы&nbsp;— Код Екатеринбурга. Сообщество независимых энтузиастов, которые хотят
                сделать Екатеринбург лучше.
            </p>
            <p>
                В&nbsp;нашей команде участвуют крутые ребята из&nbsp;IT-компаний Екатеринбурга
                и&nbsp;других городов. И&nbsp;мы&nbsp;всегда ждём новых профессионалов, чтобы
                развивать город вместе. Если вы&nbsp;аналитик данных, гис-аналитик, бекендер,
                дизайнер интерфейсов, дизайнер карт или эксперты по&nbsp;парсингу данных, приходите
                к&nbsp;нам!
            </p>

            <Team />

            <footer>
                <center>
                    <h3>Присоединяйся к нам</h3>
                    <Button
                        size="large"
                        type="secondary"
                        link="https://tally.so#tally-open=wL9Vd1&tally-width=650&tally-overlay=1&tally-emoji-animation=none"
                        onClick={handleClose}
                    >
                        Стать частью команды или помочь проекту
                    </Button>
                </center>
            </footer>
        </Modal>
    )
}
