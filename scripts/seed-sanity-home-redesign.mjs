/**
 * Seeds homepage redesign CMS: hero, homePage, footer navigation.
 *
 * Run: node --env-file=.env scripts/seed-sanity-home-redesign.mjs
 */
import { createClient } from "@sanity/client";
import {
  heroHomeRedesign,
  homePageRedesign,
  footerNavigationRedesign,
} from "./data/home-redesign-payloads.mjs";

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
  ...heroHomeRedesign,
});

tx.createOrReplace({
  _id: "homePage-consulting-main",
  _type: "homePage-consulting",
  ...homePageRedesign,
});

tx.patch("siteSettings-consulting-main", (p) =>
  p.set({ footerNavigation: footerNavigationRedesign }),
);

const res = await tx.commit();
console.log("Homepage redesign seed complete.");
console.log("Transaction:", res.transactionId);
