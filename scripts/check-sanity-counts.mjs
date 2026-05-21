import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: "2024-03-01",
});

const q = async (type) => client.fetch(`count(*[_type == "${type}"])`);

const out = {
  hero: await q("hero-consulting"),
  pillar: await q("pillar-consulting"),
  service: await q("service-consulting"),
  insight: await q("insight-consulting"),
  partner: await q("partnerPage-consulting"),
  joinUs: await q("joinUsPage-consulting"),
  about: await q("aboutUsPage-consulting"),
  home: await q("homePage-consulting"),
  site: await q("siteSettings-consulting"),
  expertise: await q("expertisePage-consulting"),
  capabilities: await q("capabilitiesPage-consulting"),
  solutions: await q("solutions-consulting"),
  who: await q("who-we-work-with-consulting"),
  legal: await q("legalPage-consulting"),
};

console.log(JSON.stringify(out, null, 2));
