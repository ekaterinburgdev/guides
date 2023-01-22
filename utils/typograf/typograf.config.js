import Typograf from 'typograf'

const tp = new Typograf({
    locale: ['ru', 'en-US'],
})

export const tpForAsideMenu = new Typograf({
    locale: ['ru', 'en-US'],
})

tpForAsideMenu.disableRule([
    'common/space/trimRight',
    'common/space/trimLeft',
    'common/space/delBeforePunctuation',
    'common/space/afterPunctuation',
    'common/nbsp/replaceNbsp',
    'ru/optalign/comma',
    'ru/punctuation/ano',
    'ru/punctuation/exclamation',
    'ru/punctuation/exclamationQuestion',
    'ru/punctuation/hellipQuestion',
])

tp.disableRule([
    'common/space/trimRight',
    'common/space/trimLeft',
    'common/space/delBeforePunctuation',
    'common/space/afterPunctuation',
    'common/nbsp/replaceNbsp',
])

export default tp
