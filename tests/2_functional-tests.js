const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
    suite("POST request to /api/translate", () => {
        test("Translation with text and locale fields", (done) => {
            done()
        })
        test("Translation with text and invalid locale field", (done) => {
            done()
        })
        test("Translation with missing text field", (done) => {
            done()
        })
        test("Translation with missing locale field", (done) => {
            done()
        })
        test("Translation with empty text", (done) => {
            done()
        })
        test("Translation with text that needs no translation", (done) => {
            done()
        })
    })
});
