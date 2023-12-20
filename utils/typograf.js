import Typograf from 'typograf'

const TYPOGRAF_DEFAULT_SETTINGS = {
    locale: ['ru', 'en-US'],
    disableRule: [
        'common/space/trimRight',
        'common/space/trimLeft',
        'common/space/delBeforePunctuation',
        'common/space/afterPunctuation',
        'common/nbsp/replaceNbsp',
    ],
}

const typograf = new Typograf(TYPOGRAF_DEFAULT_SETTINGS)
const typografUI = new Typograf(TYPOGRAF_DEFAULT_SETTINGS)

typografUI.disableRule([
    'ru/punctuation/ano',
    'ru/punctuation/exclamation',
    'ru/punctuation/exclamationQuestion',
    'ru/punctuation/hellipQuestion',
])

export default function t(string) {
    return typograf.execute(string)
}

export function tUI(string) {
    return typografUI.execute(string)
}
