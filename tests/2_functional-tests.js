const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert
const server = require('../server.js')

chai.use(chaiHttp)

const Translator = require('../components/translator.js')
const ENDPOINT = '/api/translate'

/**
  { locale: 'american-to-british' }
  { text: '', locale: 'american-to-british' }
  { text: "Ceci n'est pas une pipe", locale: 'french-to-american' }
  {
    text: 'SaintPeter and nhcarrigan give their regards!',
    locale: 'british-to-american'
  }
 */

suite('Functional Tests', () => {
  suite('POST request to /api/translate', () => {
    test('Translation with text and locale fields', (done) => {
      chai
      .request(server)
      .post(ENDPOINT)
      .send({ text: 'Mangoes are my favorite fruit.', locale: 'american-to-british' })
      .end((req, res) => {
        assert.equal(res.status, 200)
        assert.property(res.body, 'text')
        assert.equal(res.body.text, 'Mangoes are my favorite fruit.')
        assert.property(res.body, 'translation')
        assert.equal(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
        done()
      })
    })
    test('Translation with text and invalid locale field', (done) => {
      chai
      .request(server)
      .post(ENDPOINT)
      .send({ text: "Ceci n'est pas une pipe", locale: 'french-to-american' })
      .end((req, res) => {
        assert.equal(res.status, 200)
        assert.property(res.body, 'error')
        assert.equal(res.body.error, 'Invalid value for locale field')
        done()
      })
    })
    test('Translation with missing text field', (done) => {
      chai
      .request(server)
      .post(ENDPOINT)
      .send({ locale: 'american-to-british' })
      .end((req, res) => {
        assert.equal(res.status, 200)
        assert.property(res.body, 'error')
        assert.equal(res.body.error, 'Required field(s) missing')
        done()
      })
    })
    test('Translation with missing locale field', (done) => {
      chai
      .request(server)
      .post(ENDPOINT)
      .send({ text: 'Mangoes are my favorite fruit.' })
      .end((req, res) => {
        assert.equal(res.status, 200)
        assert.property(res.body, 'error')
        assert.equal(res.body.error, 'Required field(s) missing')
        done()
      })
    })
    test('Translation with empty text', (done) => {
      chai
      .request(server)
      .post(ENDPOINT)
      .send({ text: '', locale: 'american-to-british' })
      .end((req, res) => {
        assert.equal(res.status, 200)
        assert.property(res.body, 'error')
        assert.equal(res.body.error, 'No text to translate')
        done()
      })
    })
    test('Translation with text that needs no translation', (done) => {
      chai
      .request(server)
      .post(ENDPOINT)
      .send({ text: 'SaintPeter and nhcarrigan give their regards!', locale: 'british-to-american' })
      .end((req, res) => {
        assert.equal(res.status, 200)
        assert.property(res.body, 'text')
        assert.equal(res.body.text, 'SaintPeter and nhcarrigan give their regards!')
        assert.property(res.body, 'translation')
        assert.equal(res.body.translation, 'Everything looks good to me!')
        done()
      })
    })
  })
})
