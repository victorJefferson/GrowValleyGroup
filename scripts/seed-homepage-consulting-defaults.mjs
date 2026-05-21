#!/usr/bin/env node
/**
 * Seeds all homepage-visible singletons so Studio matches deployed fallbacks — no gv_consulting_content.md needed.
 *
 * Writes: hero-consulting (home), homePage-consulting, data-section-consulting, solutions-consulting,
 * who-we-work-with-consulting, merges trustedByLine on siteSettings-consulting (preserves nav when present).
 *
 * Requires: NEXT_PUBLIC_SANITY_PROJECT_ID, SANITY_WRITE_TOKEN, optionally NEXT_PUBLIC_SANITY_DATASET (default production)
 */
import { createClient } from "@sanity/client";
import { homepageConsultingPayload } from "./data/homepage-consulting-payload.mjs";
import { solutionsConsultingDefaultsPayload } from "./data/solutions-consulting-defaults-payload.mjs";
import { dataSectionConsultingDefaultsPayload } from "./data/data-section-consulting-defaults-payload.mjs";
import { heroHomeConsultingDefaultsPayload } from "./data/home-hero-consulting-defaults-payload.mjs";
import { whoWeWorkWithPayload } from "./data/who-we-work-with-payload.mjs";

const TRUST_LINE =
  "Trusted by leading governments, corporates, and innovators across the region.";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN — load .env.local or export them.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2024-03-01",
});

function stripUploadMeta(doc) {
  if (!doc) return {};
  const { _createdAt, _updatedAt, _rev, ...rest } = doc;
  return rest;
}

async function upsertSiteSettingsTrustedLine() {
  const existing = stripUploadMeta(await client.fetch(`*[_type == "siteSettings-consulting"][0]`));

  const base = {
    _id: "siteSettings-consulting-main",
    _type: "siteSettings-consulting",
    title: "GrowValley Group Settings",
    trustedByLine: TRUST_LINE,
    newsletterHeading: "Subscribe to our newsletter",
    newsletterPlaceholder: "Enter Email",
    newsletterSubmitLabel: "Subscribe",
    footerTagline: "Enabling businesses to reach their highest potential.",
    footerCopyright: "© 2026 GrowValley Group | A subsidiary of GrowValley Group.",
    mainNavigation: [],
    footerNavigation: [],
  };

  const merged = {
    ...base,
    ...existing,
    _id: existing._id || base._id,
    _type: "siteSettings-consulting",
    trustedByLine: TRUST_LINE,
    mainNavigation: Array.isArray(existing.mainNavigation)
      ? existing.mainNavigation
      : base.mainNavigation,
    footerNavigation: Array.isArray(existing.footerNavigation)
      ? existing.footerNavigation
      : base.footerNavigation,
  };

  await client.transaction().createOrReplace(merged).commit();
}

async function main() {
  const tx = client.transaction();

  tx.createOrReplace({
    _id: "hero-consulting-home",
    _type: "hero-consulting",
    ...heroHomeConsultingDefaultsPayload,
  });

  tx.createOrReplace({
    _id: "homePage-consulting-main",
    _type: "homePage-consulting",
    ...homepageConsultingPayload,
  });

  tx.createOrReplace({
    _id: "data-section-consulting-main",
    _type: "data-section-consulting",
    ...dataSectionConsultingDefaultsPayload,
  });

  tx.createOrReplace({
    _id: "solutions-consulting-main",
    _type: "solutions-consulting",
    ...solutionsConsultingDefaultsPayload,
  });

  tx.createOrReplace({
    _id: "who-we-work-with-consulting-main",
    _type: "who-we-work-with-consulting",
    ...whoWeWorkWithPayload,
  });

  const res = await tx.commit();

  await upsertSiteSettingsTrustedLine();

  console.log("Homepage defaults seed OK. Transaction:", res.transactionId);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
