const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  translate(text, locale) {
    let newText = this.removePoint(text);
    newText = this.checkTitles(newText, locale);
    newText = this.checkTime(newText, locale);
    newText = this.translateWords(newText, locale);
    console.log({
        text,
        translation: `${newText.join(" ")}.`,
      });
      return {
        text,
        translation: `${newText.join(" ")}.`,
      };
  }

  translateWords(text, locale) {
    const words = text.map((word) => {
      if(locale = "american-to-british"){
        if (americanToBritishSpelling[word]) {
            return `<span class="highlight">${americanToBritishSpelling[word]}</span>`;
          }
          return word;
      }else {
        if (americanToBritishSpelling[word]) {
            replacement = Object.keys(americanToBritishSpelling).includes()
            return `<span class="highlight">${americanToBritishSpelling[word]}</span>`;
          }
          return word;
      }
    });
    return words
  }

  removePoint(text) {
    let words = text.split(" ");
    let lastWord = words[words.length - 1].split(".")[0];
    words.splice(words.length - 1, 1, lastWord);
    return words;
  }

  checkTitles(text, locale) {
    if (locale == "american-to-british") {
      return text.map((title) => {
        if (americanToBritishTitles[title.toLowerCase()]) {
          return `<span class="highlight">${
            americanToBritishTitles[title.toLowerCase()]
          }</span>`;
        }
        return title;
      });
    } else {
      return text.map((title) => {
        if (americanToBritishTitles[title.toLowerCase()]) {
          return americanToBritishTitles[title.toLowerCase()];
        }
        return title;
      });
    }
  }

  checkTime(text, locale) {
    text.forEach((word, idx) => {
      if (locale == "american-to-british") {
        if (/\d\d\:\d\d/.test(word)) {
          text[idx] = word.split(":").join(".");
        }
      } else {
        if (/\d\d\.\d\d/.test(word)) {
          text[idx] = word.split(".").join(":");
        }
      }
    });
    return text;
  }
}

module.exports = Translator;
