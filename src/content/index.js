import { enContent } from './en/index.js'
import { frContent } from './fr/index.js'

export const localizedContent = {
  en: enContent,
  fr: frContent,
}

export const getLocalizedContent = (language = 'en') => localizedContent[language] || localizedContent.en
