import { createClient } from "@sanity/client";

const c = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: "2024-03-01",
});

const aboutUs = await c.fetch(
  `*[_id == "aboutUsPage-consulting-main"][0]{
    narrativeSections[]{eyebrow,heading,body},
    subPagesNav,
    ctaHeadline,
    ctaSubline,
    ctaButtonLabel,
    ctaButtonLink
  }`
);

const aboutHero = await c.fetch(
  `*[_id == "hero-consulting-about"][0]{
    pageSlug,
    eyebrow,
    headline,
    subheadline,
    hasCTA,
    ctaText,
    ctaHref
  }`
);

console.log("=== aboutUsPage-consulting-main ===");
console.log(JSON.stringify(aboutUs, null, 2));
console.log("\n=== hero-consulting-about ===");
console.log(JSON.stringify(aboutHero, null, 2));
