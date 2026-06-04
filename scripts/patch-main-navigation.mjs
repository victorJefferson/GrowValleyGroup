/**
 * Patch Sanity mainNavigation: remove Team from About, Join → single /join link.
 * Run: node --env-file=.env scripts/patch-main-navigation.mjs
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

const mainNavigation = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "/about-us",
    children: [
      {
        name: "About GrowValley Group",
        href: "/about-us",
        description:
          "A multi-company ecosystem operating across advisory, investments, venture building, and operational infrastructure.",
      },
      {
        name: "Leadership",
        href: "/about-us/leadership",
        description:
          "Operators, investors, strategists, and venture builders with experience across advisory, investments, and enterprise development.",
      },
    ],
  },
  {
    name: "Companies",
    href: "/companies",
    children: [
      {
        name: "GrowValley Advisory",
        href: "/companies/advisory",
        description:
          "Strategic advisory, growth execution, restructuring, and transformation support.",
      },
      {
        name: "GrowValley Capital",
        href: "/companies/capital",
        description:
          "Private equity, venture investments, private markets, and strategic acquisitions.",
      },
      {
        name: "GrowValley Studios",
        href: "/companies/studios",
        description:
          "Startup validation, MVP development, founder support, and venture acceleration.",
      },
      {
        name: "GrowValley Ventures",
        href: "/companies/ventures",
        description: "Venture building, startup ecosystems, and company creation.",
      },
      {
        name: "GrowValley Works",
        href: "/companies/works",
        description:
          "Business setup, compliance, finance, payroll, and international expansion support.",
      },
    ],
  },
  { name: "Insights", href: "/insights" },
  { name: "Join", href: "/join" },
];

const docs = await client.fetch(`*[_type == "siteSettings-consulting"]{ _id }`);

if (!docs.length) {
  console.log("No siteSettings-consulting documents found in dataset:", dataset);
  process.exit(0);
}

for (const { _id } of docs) {
  await client.patch(_id).set({ mainNavigation }).commit();
  console.log("Patched mainNavigation on", _id);
}

console.log("Done.");
