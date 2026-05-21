import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in environment."
  );
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: "2024-03-01",
});

const narrativeSections = [
  {
    _key: "a1",
    eyebrow: "WHAT GROWVALLEY IS",
    heading: "Not a setup company.",
    body: [
      "Most firms help businesses start. GrowValley is built for what comes after.",
      "The entity structures that have to hold under scrutiny. The compliance that cannot lapse when you are operating across jurisdictions. The payroll that runs on time, every month, regardless of where your people are. The regulatory filings that require institutional relationships, not a Google search.",
      "These are not tasks you can afford to fragment across vendors who do not talk to each other. They require a single firm that understands the full picture, owns the outcome, and keeps pace with how your business grows.",
      "That is what GrowValley does.",
    ].join("\n\n"),
  },
  {
    _key: "a2",
    eyebrow: "WHAT GROWVALLEY IS BUILT FOR",
    heading: "Execution, not advice.",
    body: [
      "Most professional services firms tell you what to do. GrowValley does it.",
      "We are not a consultancy. We do not produce reports or recommendations. We manage the legal, regulatory, and operational infrastructure your business runs on: the structures that have to hold, the filings that cannot be missed, the compliance that has to work across every jurisdiction you operate in.",
      "That work requires institutional knowledge, active relationships with government authorities, and enough depth across functions to catch what a single-discipline vendor would miss. That is what GrowValley is built around.",
    ].join("\n\n"),
  },
  {
    _key: "a3",
    eyebrow: "PHILOSOPHY",
    heading: "One firm. Full accountability.",
    body: [
      "The typical arrangement looks like this: a lawyer for your corporate structure, an accounting firm for your books, a PRO service you found through a referral, and a payroll provider that none of them have ever spoken to. When something goes wrong, it falls through the gap between all of them.",
      "GrowValley consolidates the functions that belong together. Company formation, entity management, regulatory compliance, accounting, payroll, HR administration, and cross-border structuring, all managed by one firm, all coordinated, all owned by us.",
      "You do not manage us. We manage the work.",
    ].join("\n\n"),
  },
  {
    _key: "a4",
    eyebrow: "WHO WE WORK WITH",
    heading: "Built for operators, not first-timers.",
    body: [
      "Our clients are not figuring out where to start. They have already built something. What brings them to GrowValley is usually one of the following:",
      "They are expanding into the UAE and need the full operational layer set up correctly from the start, not retrofitted later when the structure is already causing problems.",
      "They are running two or three entities across different jurisdictions and their current providers are not keeping pace. Things are getting missed. Reporting is inconsistent. Nobody has a complete picture.",
      "They have a compliance or regulatory situation that requires someone with direct government relationships and enough institutional knowledge to navigate it without escalating the problem.",
      "They have scaled quickly and their operational infrastructure, the structures, the filings, the payroll, the admin, has not kept up with where the business actually is.",
      "If any of these describe your situation, GrowValley is built for it.",
    ].join("\n\n"),
  },
  {
    _key: "a5",
    eyebrow: "THE LONG-TERM RELATIONSHIP",
    heading: "The firms that stay are the ones that have seen the alternative.",
    body: [
      "Operational failures rarely announce themselves in advance. A structure that was never maintained after formation, a compliance window that closed during a period of rapid growth, a payroll discrepancy that compounds quietly across multiple markets. By the time these surface, they are no longer small problems.",
      "The clients who have been through it once do not look for the cheapest option the second time. They look for a firm that stays close enough to the business to see problems coming, and has the depth to deal with them before they become material.",
      "That is the relationship GrowValley is built to have.",
    ].join("\n\n"),
  },
];

const subPagesNav = [
  { _key: "n1", label: "Meet the leadership team", href: "/about-us/leadership" },
  { _key: "n2", label: "The people behind the work", href: "/about-us/team" },
  { _key: "n3", label: "How we have worked with clients", href: "/expertise" },
];

const aboutUsDoc = {
  _id: "aboutUsPage-consulting-main",
  _type: "aboutUsPage-consulting",
  title: "About Us Page Content",
  narrativeSections,
  subPagesNav,
  ctaHeadline: "Most operational problems are easier to fix before they compound.",
  ctaSubline:
    "If something in your setup is not working the way it should, tell us what you are dealing with. We will give you a straight answer on what it takes to fix it.",
  ctaButtonLabel: "See where I stand",
  ctaButtonLink: "/contact",
};

// Hero copy that the dedicated Hero block reads from
const aboutHeroDoc = {
  _id: "hero-consulting-about",
  _type: "hero-consulting",
  pageSlug: "about",
  eyebrow: "ABOUT GROWVALLEY",
  headline: "We run what your business can't afford to get wrong.",
  subheadline:
    "GrowValley handles the legal, regulatory, and operational infrastructure that keeps serious businesses running. The work that has to be done correctly, every time, without you having to think about it.",
  hasCTA: true,
  ctaText: "See where I stand",
  ctaHref: "/contact",
};

const tx = client.transaction();
tx.createOrReplace(aboutUsDoc);
tx.createOrReplace(aboutHeroDoc);

const res = await tx.commit();

console.log("About Us seed complete.");
console.log("Transaction:", res.transactionId);
console.log("Narrative sections:", narrativeSections.length);
console.log("Sub-page nav links:", subPagesNav.length);
