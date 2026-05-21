/**
 * Seeds only the /about-us/team page: hero (pageSlug team) + nine operations team members.
 * Run: node --env-file=.env scripts/seed-sanity-team-page.mjs
 */
import { createClient } from "@sanity/client";

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
  _id: "hero-consulting-team",
  _type: "hero-consulting",
  pageSlug: "team",
  eyebrow: "OUR TEAM",
  headline: "The people who do the work.",
  subheadline:
    "GrowValley is staffed by specialists. Each person owns a defined domain across formation, operations, finance, and international expansion. They work in coordination across functions, so nothing falls through the gaps between them.",
  hasCTA: false,
});

/** Retired V1 operations IDs (replaced by current roster). */
const legacyTeamIds = [
  "team-consulting-v1-01-faris",
  "team-consulting-v1-02-omar",
  "team-consulting-v1-03-kavya",
  "team-consulting-v1-04-matthias",
  "team-consulting-v1-05-imran",
  "team-consulting-v1-06-elena",
  "team-consulting-v1-07-nur",
  "team-consulting-v1-08-jihoon",
  "team-consulting-v1-09-viktor",
];

const teamOperationsV1 = [
  { _id: "team-consulting-v1-01-nadia", name: "Nadia Al Rashid", role: "Strategy & Scale Readiness" },
  { _id: "team-consulting-v1-02-tariq", name: "Tariq Mansour", role: "Performance Transformation" },
  { _id: "team-consulting-v1-03-leila", name: "Leila Okonkwo", role: "PMO & Execution Governance" },
  { _id: "team-consulting-v1-04-james", name: "James Whitfield", role: "Leadership & Organizational Design" },
  { _id: "team-consulting-v1-05-kai", name: "Kai Nakamura", role: "Venture Studio Operations" },
  { _id: "team-consulting-v1-06-sven", name: "Sven Hartmann", role: "Corporate Venture Building" },
  { _id: "team-consulting-v1-07-amara", name: "Amara Diallo", role: "Family Office Advisory" },
  { _id: "team-consulting-v1-08-rohan", name: "Rohan Mehta", role: "Business Structuring & Governance" },
  { _id: "team-consulting-v1-09-sofia", name: "Sofia Andrade", role: "Transformation & Change Management" },
];

for (const id of legacyTeamIds) {
  tx.delete(id);
}

for (const m of teamOperationsV1) {
  tx.createOrReplace({
    _id: m._id,
    _type: "team-consulting",
    name: m.name,
    role: m.role,
    category: "operations",
  });
}

const res = await tx.commit();
console.log("Team page seed complete.");
console.log("Transaction:", res.transactionId);
