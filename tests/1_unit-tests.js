const chai = require('chai')
const assert = chai.assert

const Translator = require('../components/translator.js')

const Translate = new Translator()

suite('Unit Tests', () => {
  suite('Translate to British English', () => {
    test('Translate Mangoes are my favorite fruit.', (done) => {
      const result = Translate.translate('Mangoes are my favorite fruit.', 'american-to-british')
      assert.equal(result.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
      done()
    })
    test('Translate I ate yogurt for breakfast.', (done) => {
      const result = Translate.translate('I ate yogurt for breakfast.', 'american-to-british')
      assert.equal(result.translation, 'I ate <span class="highlight">yoghurt</span> for breakfast.')
      done()
    })
    test("Translate We had a party at my friend's condo.", (done) => {
      const result = Translate.translate("We had a party at my friend's condo.", 'american-to-british')
      assert.equal(result.translation, 'We had a party at my friend\'s <span class="highlight">flat</span>.')
      done()
    })
    test('Translate Can you toss this in the trashcan for me?', (done) => {
      const result = Translate.translate('Can you toss this in the trashcan for me?', 'american-to-british')
      assert.equal(result.translation, 'Can you toss this in the <span class="highlight">bin</span> for me?')
      done()
    })
    test('Translate The parking lot was full.', (done) => {
      const result = Translate.translate('The parking lot was full.', 'american-to-british')
      assert.equal(result.translation, 'The parking lot was full.')
      done()
    })
    test('Translate Like a high tech Rube Goldberg machine.', (done) => {
      const result = Translate.translate('Like a high tech Rube Goldberg machine.', 'american-to-british')
      assert.equal(result.translation, 'Like a high tech Rube Goldberg machine.')
      done()
    })
    test('Translate To play hooky means to skip class or work.', (done) => {
      const result = Translate.translate('To play hooky means to skip class or work.', 'american-to-british')
      assert.equal(result.translation, 'To play hooky means to skip class or work.')
      done()
    })
    test('Translate No Mr. Bond, I expect you to die.', (done) => {
      const result = Translate.translate('No Mr. Bond, I expect you to die.', 'american-to-british')
      assert.equal(result.translation, 'No <span class="highlight">Mr</span> Bond, I expect you to die.')
      done()
    })
    test('Translate Dr. Grosh will see you now.', (done) => {
      const result = Translate.translate('Dr. Grosh will see you now.', 'american-to-british')
      assert.equal(result.translation, '<span class="highlight">Dr</span> Grosh will see you now.')
      done()
    })
    test('Translate Lunch is at 12:15 today.', (done) => {
      const result = Translate.translate('Lunch is at 12:15 today.', 'american-to-british')
      assert.equal(result.translation, 'Lunch is at <span class="highlight">12.15</span> today.')
      done()
    })
  })
  suite('Translate to American English', () => {
    test('Translate We watched the footie match for a while.', (done) => {
      const result = Translate.translate('We watched the footie match for a while.', 'british-to-american')
      assert.equal(result.translation, 'We watched the <span class="highlight">soccer</span> match for a while.')
      done()
    })
    test('Translate Paracetamol takes up to an hour to work.', (done) => {
      const result = Translate.translate('Paracetamol takes up to an hour to work.', 'british-to-american')
      assert.equal(result.translation, '<span class="highlight">Tylenol</span> takes up to an hour to work.')
      done()
    })
    test('Translate First, caramelise the onions.', (done) => {
      const result = Translate.translate('First, caramelise the onions.', 'british-to-american')
      assert.equal(result.translation, 'First, <span class="highlight">caramelize</span> the onions.')
      done()
    })
    test('Translate I spent the bank holiday at the funfair.', (done) => {
      const result = Translate.translate('I spent the bank holiday at the funfair.', 'british-to-american')
      assert.equal(result.translation, 'I spent the bank holiday at the <span class="highlight">carnival</span>.')
      done()
    })
    test('Translate I had a bicky then went to the chippy.', (done) => {
      const result = Translate.translate('I had a bicky then went to the chippy.', 'british-to-american')
      assert.equal(result.translation, 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.')
      done()
    })
    test("Translate I've just got bits and bobs in my bum bag.", (done) => {
      const result = Translate.translate('I\'ve just got bits and bobs in my bum bag.', 'british-to-american')
      assert.equal(result.translation, 'I\'ve just got bits and bobs in my bum bag.')
      done()
    })
    test('Translate The car boot sale at Boxted Airfield was called off.', (done) => {
      const result = Translate.translate('The car boot sale at Boxted Airfield was called off.', 'british-to-american')
      assert.equal(result.translation, 'The car boot sale at Boxted Airfield was called off.')
      done()
    })
    test('Translate Have you met Mrs Kalyani?', (done) => {
      const result = Translate.translate('Have you met Mrs Kalyani?', 'british-to-american')
      assert.equal(result.translation, 'Have you met Mrs Kalyani?')
      done()
    })
    test("Translate Prof Joyner of King's College, London.", (done) => {
      const result = Translate.translate('Prof Joyner of King\'s College, London.', 'british-to-american')
      assert.equal(result.translation, 'Prof Joyner of King\'s College, London.')
      done()
    })
    test('Translate Tea time is usually around 4 or 4.30.', (done) => {
      const result = Translate.translate('Tea time is usually around 4 or 4.30.', 'british-to-american')
      assert.equal(result.translation, 'Tea time is usually around 4 or <span class="highlight">4:30</span>.')
      done()
    })
  })
  suite("Highlight translation", () => {
    test('Highlight translation in Mangoes are my favorite fruit.', (done) => {
      const result = Translate.translate('Mangoes are my favorite fruit.', 'american-to-british')
      assert.equal(result.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
      assert.equal(result.translation.includes('<span class="highlight">favourite</span>'), true)
      done()
    })
    test('Highlight translation in I ate yogurt for breakfast.', (done) => {
      const result = Translate.translate('I ate yogurt for breakfast.', 'american-to-british')
      assert.equal(result.translation, 'I ate <span class="highlight">yoghurt</span> for breakfast.')
      assert.equal(/<span class="highlight">([^<]*)<\/span>/g.test(result.translation), true)
      done()
    })
    test('Highlight translation in We watched the footie match for a while.', (done) => {
      const result = Translate.translate('We watched the footie match for a while.', 'british-to-american')
      assert.equal(result.translation, 'We watched the <span class="highlight">soccer</span> match for a while.')
      assert.equal(/<span class="highlight">([^<]*)<\/span>/g.test(result.translation), true)
      done()
    })
    test('Highlight translation in Paracetamol takes up to an hour to work.', (done) => {
      const result = Translate.translate('Paracetamol takes up to an hour to work.', 'british-to-american')
      assert.equal(result.translation, '<span class="highlight">Tylenol</span> takes up to an hour to work.')
      assert.equal(/<span class="highlight">([^<]*)<\/span>/g.test(result.translation), true)
      done()
    })
  })
})
