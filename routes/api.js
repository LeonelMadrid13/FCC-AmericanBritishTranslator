'use strict'

const Translator = require('../components/translator.js')

function removeSpanTags (inputString) {
  const pattern = /<span class="highlight">([^<]*)<\/span>/g

  const result = inputString.replace(pattern, '$1')

  return result
}

module.exports = function (app) {
  const translator = new Translator()

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body
      // console.log(req.body)

      if (text === undefined || !locale) {
        return res.json({ error: 'Required field(s) missing' })
      }

      if (text === '') return res.json({ error: 'No text to translate' })

      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' })
      }

      let translation = translator.translate(text, locale)
      const cleanTranslation = removeSpanTags(translation.translation)

      if (text === cleanTranslation) {
        translation = {
          text,
          translation: 'Everything looks good to me!'
        }
      }

      // console.log('\n---------------------------------')
      // console.log(`input text: ${text}`)
      // console.log(`translation: ${cleanTranslation}`)
      // console.log('---------------------------------')
      // console.table(translation)
      // console.log('---------------------------------')

      return res.json(translation)
    })
}
