export const defaultLocale = "en";
export const locales = ["en", "fr"];

export const isSupportedLocale = (locale) => locales.includes(locale);

export const normalizeLocale = (locale) =>
  isSupportedLocale(locale) ? locale : defaultLocale;

export const getLocaleFromPathname = (pathname = "/") =>
  pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : defaultLocale;

export const stripLocaleFromPathname = (pathname = "/") => {
  if (pathname === "/fr") return "/";
  if (pathname.startsWith("/fr/")) return pathname.slice(3) || "/";
  return pathname || "/";
};

export const withLocalePath = (href = "/", locale = defaultLocale) => {
  const resolvedLocale = normalizeLocale(locale);

  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {
    return href;
  }

  const normalizedHref = href.startsWith("/") ? href : `/${href}`;

  if (resolvedLocale === defaultLocale) {
    return normalizedHref;
  }

  if (normalizedHref === "/") {
    return `/${resolvedLocale}`;
  }

  return `/${resolvedLocale}${normalizedHref}`;
};

export const switchLocalePath = (pathname = "/", locale = defaultLocale) =>
  withLocalePath(stripLocaleFromPathname(pathname), locale);
