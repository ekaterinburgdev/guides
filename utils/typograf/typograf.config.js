const Typograf = require('typograf')

const tp = new Typograf({
    locale: ['ru', 'en-US'],
})

tp.disableRule(['common/space/trimRight'])

export default tp
