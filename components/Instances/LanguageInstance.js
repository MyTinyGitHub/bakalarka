let instance = null;

export default class LanguageInstance {
  constructor() {
    this.locale = "en-locale";
    this.text = require("../../lib/locale.json")[this.locale];
  }

  getText(type) {
    return this.text[type];
  }

  static getInstance() {
    if (!instance) {
      instance = new LanguageInstance();
    }
    return instance;
  }
}
