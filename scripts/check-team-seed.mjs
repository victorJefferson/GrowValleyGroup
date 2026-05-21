import { createClient } from "@sanity/client";

const c = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: "2024-03-01",
});

const ops = await c.fetch(
  `*[_type == "team-consulting" && category == "operations"] | order(_id asc) { _id, name, role }`
);
const hero = await c.fetch(`*[_id == "hero-consulting-team"][0]{ eyebrow, headline, subheadline, hasCTA }`);

console.log("operations count:", ops.length);
console.log(JSON.stringify(ops, null, 2));
console.log("hero:", JSON.stringify(hero, null, 2));
