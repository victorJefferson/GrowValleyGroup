import { TrustGuardConfig } from "trust-guard-js";

export const trustGuardConfig: TrustGuardConfig = {
  active: true, // Toggle the entire system
  branding: {
    name: "GrowValley",
    logo: "/gv-logo-white.png", // Using navy blue logo to match theme
    colors: {
      primary: "#1a1f2e", // Dark charcoal (matches --color-primary)
      text: "#e0e0e0", // Light text for dark background
      background: "#0a0a0a", // Near-black canvas (matches --color-white)
    },
  },
  categories: {
    necessary: {
      id: "necessary",
      title: "Necessary",
      description: "Required for the site to function properly. These cookies ensure basic functionality and security features of the website, anonymously.",
      isAlwaysEnabled: true,
    },
  },
  links: {
    privacyPolicy: "/privacy-policy",
    cookiePolicy: "/cookie-policy",
    aboutText: "This website uses cookies to improve your experience. We'll assume you're ok with this, but you can opt-out if you wish.",
  },
  audit: {
    enabled: true,
    endpoint: "/api/consent", // This calls your internal API route
  },
  debug: true, // Logs to console in development
};
