export const siteConfig = {
  name: "Lambert Electromec",
  legalName: "Lambert Electromec Ltd",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lambertelectromec.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@lambertelectromec.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+234 91 393 827 69",
  colors: { green: "#48A750", graphite: "#383A3D" },
  socials: {
    linkedin:
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ||
      "https://www.linkedin.com/company/lambert-electromec-ltd/",
    instagram:
      process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ||
      "https://instagram.com/lambertelectromec?igshid=YmMyMTA2M2Y=",
    facebook:
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ||
      "https://www.facebook.com/LambertElectromec",
    x:
      process.env.NEXT_PUBLIC_SOCIAL_X ||
      "https://twitter.com/LambertElecLtd?t=yMl94Fmx8GbpNS2zPJWZoQ&s=09",
  },
};
