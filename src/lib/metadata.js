import { siteConfig } from "@/config/site.config";
import { defaultLocale, withLocalePath } from "@/i18n/config";
import { defaultMetaDescription } from "@/utils/seo";

const defaultSocialImage = {
  url: "/images/home-slides/Slider-1.webp",
  width: 1408,
  height: 768,
  alt: siteConfig.name,
};

export const siteMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultMetaDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: defaultMetaDescription,
    url: siteConfig.url,
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: defaultMetaDescription,
    images: [defaultSocialImage.url],
  },
};

const withTrailingSlash = (pathname) =>
  pathname === '/' || pathname.endsWith('/') ? pathname : `${pathname}/`;

export const buildPageMetadata = ({
  title,
  absoluteTitle,
  description = defaultMetaDescription,
  pathname = "/",
  locale = defaultLocale,
  keywords,
  image,
  imageAlt,
}) => {
  const englishPath = withTrailingSlash(withLocalePath(pathname, 'en'));
  const frenchPath = withTrailingSlash(withLocalePath(pathname, 'fr'));
  const canonical = locale === 'fr' ? frenchPath : englishPath;
  const socialImage = image
    ? {
        url: image,
        alt: imageAlt || title || siteConfig.name,
      }
    : defaultSocialImage;
  const resolvedTitle = absoluteTitle || title;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical,
      languages: {
        en: englishPath,
        fr: frenchPath,
        "x-default": englishPath,
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: resolvedTitle,
      description,
      url: canonical,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? ['en_US'] : ['fr_FR'],
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [socialImage.url],
    },
  };
};
