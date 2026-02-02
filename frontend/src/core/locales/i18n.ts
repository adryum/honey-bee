import { createI18n } from 'vue-i18n'
import en from './en.json'
import lv from './lv.json'

export enum Language {
    En = "en-US",
    Lv = "lv-LV"
}

const i18n = createI18n({
  legacy: false, // required to use Composition API
  locale: Language.En, // default language
  fallbackLocale: Language.En,
  messages: {
    [Language.En] : en,
    [Language.Lv]: lv
  }
})

export function changeLang(lang: Language) {
    i18n.global.locale.value = lang
}

export default i18n