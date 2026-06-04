/**
 * One-off: align Sanity footerNavigation with GrowValley Group routes.
 * Run: node scripts/patch-footer-navigation.mjs
 */
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in .env");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const footerNavigation = [
  {
    columnTitle: "Company",
    links: [
      { name: "About", href: "/about-us" },
      { name: "Leadership", href: "/about-us/leadership" },
    ],
  },
  {
    columnTitle: "Reach us",
    links: [
      { name: "Join", href: "/join" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

const docs = await client.fetch(
  `*[_type == "siteSettings-consulting"]{ _id, footerNavigation }`,
);

if (!docs.length) {
  console.log("No siteSettings-consulting documents found in dataset:", dataset);
  process.exit(0);
}

for (const { _id } of docs) {
  await client
    .patch(_id)
    .set({
      footerNavigation,
      footerCopyright: "© 2026 GrowValley Group. All rights reserved.",
    })
    .commit();
  console.log("Patched", _id);
}
