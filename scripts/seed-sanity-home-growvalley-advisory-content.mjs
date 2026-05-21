/**
 * Seeds homepage-visible CMS documents for the "GrowValley Advisory" narrative.
 * Does not modify React layout — only Sanity singletons:
 *   hero-consulting-home, homePage-consulting-main, data-section-consulting-main,
 *   solutions-consulting-main, who-we-work-with-consulting-main
 *
 * BREAKING / EXPECTATION NOTES (ask stakeholders):
 * 1. Branding: copy uses "GrowValley Advisory" while site legal/footer may still say "Consulting".
 * 2. Homepage section order is fixed in code (see scripts/data/home-growvalley-advisory-payloads.mjs header).
 * 3. Solutions band is a vertical pillar list, not tabbed UI — tab "cards" are flattened into body text.
 * 4. Home hero switches from immersive stacked lines to standard hero (immersionMode: false).
 * 5. Project pillar link uses id `project-advisory` and href `/our-capabilities/project-advisory`.
 *
 * Run: node --env-file=.env scripts/seed-sanity-home-growvalley-advisory-content.mjs
 */
import { createClient } from "@sanity/client";
import {
  heroHomeGrowValleyAdvisory,
  homePageGrowValleyAdvisory,
  dataSectionGrowValleyAdvisory,
  solutionsGrowValleyAdvisory,
  whoWeWorkWithGrowValleyAdvisory,
} from "./data/home-growvalley-advisory-payloads.mjs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN.");
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2024-03-01",
});

const tx = client.transaction();

tx.createOrReplace({
  _id: "hero-consulting-home",
  _type: "hero-consulting",
  ...heroHomeGrowValleyAdvisory,
});

tx.createOrReplace({
  _id: "homePage-consulting-main",
  _type: "homePage-consulting",
  ...homePageGrowValleyAdvisory,
});

tx.createOrReplace({
  _id: "data-section-consulting-main",
  _type: "data-section-consulting",
  ...dataSectionGrowValleyAdvisory,
});

tx.createOrReplace({
  _id: "solutions-consulting-main",
  _type: "solutions-consulting",
  ...solutionsGrowValleyAdvisory,
});

tx.createOrReplace({
  _id: "who-we-work-with-consulting-main",
  _type: "who-we-work-with-consulting",
  ...whoWeWorkWithGrowValleyAdvisory,
});

const res = await tx.commit();
console.log("Home (GrowValley Advisory) CMS seed complete.");
console.log("Transaction:", res.transactionId);
