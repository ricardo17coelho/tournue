import { createI18n } from 'vue-i18n'

// app locales
import deCh from './deCH.json'
import enGB from './enGB.json'

// `createI18n` options is almost same vue-i18n-next (vue-i18n@v9.x) API
const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_I18N_LOCALE || 'deCh',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'deCh',
  silentTranslationWarn: true,
  warnHtmlMessage: false,
  globalInjection: true,
  messages: {
    deCh,
    enGB,
  },
})

export default i18n
