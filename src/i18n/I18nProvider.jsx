"use client";

import { createInstance } from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { useMemo } from "react";

import { defaultLocale, normalizeLocale } from "./config";
import { resources } from "./resources";

export default function I18nProvider({ children, locale = defaultLocale }) {
  const resolvedLocale = normalizeLocale(locale);

  const i18n = useMemo(() => {
    const instance = createInstance();

    instance.use(initReactI18next).init({
      resources,
      lng: resolvedLocale,
      fallbackLng: defaultLocale,
      supportedLngs: Object.keys(resources),
      interpolation: { escapeValue: false },
      initImmediate: false,
    });

    return instance;
  }, [resolvedLocale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
