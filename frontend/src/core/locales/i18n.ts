import { createI18n } from 'vue-i18n'
import en from './messages/en.json'
import lv from './messages/lv.json'

type MessageSchema = typeof en

export enum Language {
    En = "en-US",
    Lv = "lv-LV"
}

const i18n = createI18n<[MessageSchema], Language>({
    legacy: false,
    locale: Language.En,
    fallbackLocale: Language.En,
    globalInjection: true,
    messages: {
        [Language.En]: en,
        [Language.Lv]: lv
    }
})

export function changeLang(lang: Language) {
    (i18n.global.locale as any).value = lang
}

export default i18n