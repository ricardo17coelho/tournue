import i18n from '@/locales/i18n'

export default {
  /**
   * Rule validate required
   * @param {any} v the given value to validate
   * @param {any} allowFalse the given value to validate
   * @returns validate
   */
  ruleRequired: (
    v,
    { allowFalse }: Record<string, never | boolean> = { allowFalse: true }
  ) => {
    return (
      !!(allowFalse && v === false) ||
      !!v ||
      i18n.global.t('validation.required')
    )
  },
  /**
   * Rule validate min length
   * @param {any} v the given value to validate
   * @param {number} length min length to check
   * @returns validate
   */
  ruleMinLength: (v, length: number) => {
    return (
      String(v).length >= length || i18n.global.t('validation.min', { length })
    )
  },
  /**
   * Rule validate max length
   * @param {any} v the given value to validate
   * @param {number} length max length to check
   * @returns validate
   */
  ruleMaxLength: (v, length: number) => {
    return (
      String(v).length <= length || i18n.global.t('validation.max', { length })
    )
  },
  /**
   * Rule validate email
   * @param {any} v the given value to validate
   * @returns validate
   */
  ruleEmail: (v: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return !v || re.test(String(v)) || i18n.global.t('validation.email')
  },
  /**
   * Rule validate integer number
   * @param {any} v the given value to validate
   * @returns validate
   */
  ruleNumber: (v: number) => {
    return Number.isInteger(Number(v)) || i18n.global.t('validation.number')
  },
  /**
   * Rule validate contains uppercase
   * @param {string} v the given value to validate
   * @param {string} length format of the value to validate
   * @returns validate
   */
  ruleContainsUppercase: (v: string, length = 1) => {
    const pattern = '^(.*?[A-Z])'
    const regex = new RegExp(`${pattern}{${length},}`, 'g')
    return (
      regex.test(v) ||
      i18n.global.t('validation.contains_uppercase', length, {
        length,
      })
    )
  },
  /**
   * Rule validate contains lowercase
   * @param {string} v the given value to validate
   * @param {string} length format of the value to validate
   * @returns validate
   */
  ruleContainsLowercase: (v: string, length = 1) => {
    const pattern = '^(.*?[a-z])'
    const regex = new RegExp(`${pattern}{${length},}`, 'g')
    return (
      regex.test(v) ||
      i18n.global.t('validation.contains_lowercase', length, {
        length,
      })
    )
  },
  /**
   * Rule validate confirmed
   * @param {string} v the given value to validate
   * @param {string} options format of the value to validate
   * @returns validate
   */
  ruleConfirmed: (v: string, { value, fieldName }) => {
    return (
      v === value || i18n.global.t('validation.confirmed', { name: fieldName })
    )
  },
}
