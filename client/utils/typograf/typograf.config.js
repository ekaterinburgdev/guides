const Typograf = require('typograf');

const tp = new Typograf({
  locale: ['ru', 'en-US'],
});

tp.disableRule([
  'common/space/afterPunctuation',
  'common/nbsp/replaceNbsp',
  'common/space/trimLeft',
  'common/space/trimRight',
]);

export default tp;
