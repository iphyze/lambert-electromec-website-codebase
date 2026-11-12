import { getLocalizedContent } from "@/content";
import { normalizeLocale } from "@/i18n/config";

export const getContent = (locale = "en") =>
  getLocalizedContent(normalizeLocale(locale));
