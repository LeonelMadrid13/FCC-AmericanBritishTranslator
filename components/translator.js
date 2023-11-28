const americanOnly = require('./american-only.js')
const americanToBritishSpelling = require('./american-to-british-spelling.js')
const americanToBritishTitles = require('./american-to-british-titles.js')
const britishOnly = require('./british-only.js')

const UpperCaseAlphabet = /[A-Z]/

function flipObject (obj) {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key]
    acc[value] = key
    return acc
  }, {})
}

const britishToAmerican = flipObject(americanToBritishSpelling)

class Translator {
  translate (text, locale) {
    let newText = this.removePoint(text)
    // console.log(`first: ${newText}`)
    newText = this.checkTitles(newText, locale)
    // console.log(`checkTitles: ${newText}`)
    newText = this.checkTime(newText, locale)
    // console.log(`checkTime: ${newText}`)
    newText = this.translateWords(newText, locale)
    // console.log(`translateWords: ${newText}`)
    if (/\.$/.test(text)) {
      return {
        text,
        translation: `${newText.join(' ')}.`
      }
    } else {
      return {
        text,
        translation: `${newText.join(' ')}`
      }
    }
  }

  translateWords (text, locale) {
    // console.log(text)
    const words = text.map((word) => {
      let replacement
      if (locale === 'american-to-british') {
        replacement = americanToBritishSpelling[word.toLowerCase()] || americanOnly[word]
        if (americanToBritishSpelling[word.toLowerCase()]) {
          if (UpperCaseAlphabet.test(word)) {
            replacement = this.Capitalize(americanToBritishSpelling[word.toLowerCase()])
          }
          return `<span class="highlight">${replacement}</span>`
        }
        if (americanOnly[word]) {
          if (UpperCaseAlphabet.test(word)) {
            replacement = this.Capitalize(americanOnly[word.toLowerCase()])
          }
          return `<span class="highlight">${replacement}</span>`
        }
      }
      if (locale === 'british-to-american') {
        replacement = britishToAmerican[word.toLowerCase()] || britishOnly[word.toLowerCase()]
        // console.log(replacement)
        if (britishToAmerican[word.toLowerCase()]) {
          if (UpperCaseAlphabet.test(word)) {
            replacement = this.Capitalize(britishToAmerican[word.toLowerCase()])
          }
          return `<span class="highlight">${replacement}</span>`
        }
        if (britishOnly[word.toLowerCase()]) {
          if (UpperCaseAlphabet.test(word)) {
            replacement = this.Capitalize(britishOnly[word.toLowerCase()])
          }
          return `<span class="highlight">${replacement}</span>`
        }
      }
      return word
    })
    return words
  }

  removePoint (text) {
    const words = text.split(' ')
    const lastWord = words[words.length - 1].replace(/\.$/, '')
    words.splice(words.length - 1, 1, lastWord)
    return words
  }

  Capitalize (word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  checkTitles (text, locale) {
    if (locale === 'american-to-british') {
      return text.map((title) => {
        let replacement = americanToBritishTitles[title.toLowerCase()]
        if (americanToBritishTitles[title.toLowerCase()]) {
          if (UpperCaseAlphabet.test(title)) {
            replacement = this.Capitalize(americanToBritishTitles[title.toLowerCase()])
          }
          return `<span class="highlight">${replacement}</span>`
        }
        return title
      })
    } else {
      return text.map((title) => {
        if (americanToBritishTitles[title.toLowerCase()]) {
          return `<span class="highlight">${
            americanToBritishTitles[title.toLowerCase()]
          }.</span>`
        }
        return title
      })
    }
  }

  checkTime (text, locale) {
    text.forEach((word, idx) => {
      if (locale === 'american-to-british') {
        if (/\d{1,2}\:\d{1,2}/.test(word)) {
          // console.log(`american-to-british --> word: ${word}, idx: ${idx}`)
          text[idx] = `<span class="highlight">${word.replace(/\:/g, '.')}</span>`
        }
      }
      if (locale === 'british-to-american') {
        if (/\d{1,2}\.\d{1,2}/.test(word)) {
          // console.log(`british-to-american --> word: ${word}, idx: ${idx}`)
          text[idx] = `<span class="highlight">${word.replace(/\./g, ':')}</span>`
        }
      }
    })
    return text
  }
}

module.exports = Translator
