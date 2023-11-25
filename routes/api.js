'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const translator = new Translator()
      const {text, locale} = req.body
      const translation = translator.translate(text, locale)
      return res.json(translation)
    });
};
