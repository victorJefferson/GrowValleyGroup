/**
 * Seed / refresh Who We Work With bento section (home + capabilities landing).
 * Run: node --env-file=.env scripts/seed-sanity-who-we-work-with.mjs
 */
import { createClient } from "@sanity/client";
import { whoWeWorkWithPayload } from "./data/who-we-work-with-payload.mjs";

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

await client.createOrReplace({
  _id: "who-we-work-with-consulting-main",
  _type: "who-we-work-with-consulting",
  ...whoWeWorkWithPayload,
});

console.log("Patched who-we-work-with-consulting-main");
