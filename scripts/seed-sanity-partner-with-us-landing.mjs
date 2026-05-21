/**
 * Partner With Us landing page seed (single-page narrative).
 * Run: node --env-file=.env scripts/seed-sanity-partner-with-us-landing.mjs
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
  _id: "partnerPage-consulting-landing",
  _type: "partnerPage-consulting",
  pageKey: "landing",
  heroEyebrow: "PARTNER WITH US",
  heroHeadline: "Partner With Us",
  heroAccent: "Expertise. Reach. Execution.",
  heroSubheadline:
    "GrowValley Group partners with experts, operators, platforms, and ecosystem builders who share a commitment to execution-led growth and long-term value creation.",
  heroCtaLabel: "Talk to Our Advisor",
  heroCtaLink: "/contact",
  whyHeadline: "Why Partner With GrowValley Group",
  whyBody:
    "GVC operates at the intersection of strategy and execution across complex, high-stakes mandates. Our partners extend that capability, bringing specialist depth, market reach, and platform infrastructure that strengthens what we deliver.\n\nPartnerships at GVC are structured, governed, and built for the long term. We do not work with vendors. We work with collaborators.",
  whyAccessHeadline: "What partners gain access to",
  whyAccessPoints: [
    "Complex, high-impact advisory mandates across growth, transformation, and venture building.",
    "Long-term institutional relationships across corporates, family offices, and leadership teams.",
    "Structured collaboration models with clear scope, governance, and accountability.",
    "A platform built on credibility, execution discipline, and measurable outcomes.",
  ],
  partnerTypes: [
    {
      _key: "pt-expert",
      key: "expert",
      title: "Expert Partners",
      tagline: "Bringing specialist depth to complex mandates.",
      body:
        "GVC engages senior experts who want to apply their experience to execution-led engagements where results are the only measure of success. This is not advisory in name only. You will be embedded in real mandates, working alongside leadership teams where stakes are high and outcomes are tracked.",
      whoForHeadline: "Who this is for",
      whoFor: [
        "Former CXOs and senior operators.",
        "Industry specialists in strategy, finance, operations, or transformation.",
        "Practitioners with deep domain expertise in specific sectors or functions.",
      ],
      howEngageHeadline: "How we engage",
      howEngage: [
        "Project-based or retainer advisory.",
        "Board and leadership advisory roles.",
        "Venture studio mentorship and oversight.",
        "Institutional transformation mandates.",
      ],
      whatGainHeadline: "What you gain",
      whatGain: [
        "Senior-level engagements with real scope and accountability.",
        "Long-term advisory relationships, not one-off projects.",
        "Platform leverage and institutional access beyond solo consulting.",
      ],
      ctaLabel: "Join Our Expert Network",
      ctaLink: "/contact",
    },
    {
      _key: "pt-technology",
      key: "technology",
      title: "Technology Partners",
      tagline: "Powering execution through platforms, tools, and systems.",
      body:
        "GVC integrates technology into how we design, manage, and scale client operations. We partner with platforms and solution providers whose tools are built for enterprise-grade execution, not surface-level automation.",
      whoForHeadline: "Who this is for",
      whoFor: [
        "Technology platforms and SaaS providers.",
        "AI, data, and automation companies.",
        "Systems and infrastructure providers relevant to business transformation, PMO, or venture operations.",
      ],
      howEngageHeadline: "How we engage",
      howEngage: [
        "Integration of your platform into GVC client engagements.",
        "Co-creation of execution tools aligned to GVC service delivery.",
        "Venture studio and PMO enablement.",
        "Technology-led transformation programs.",
      ],
      whatGainHeadline: "What you gain",
      whatGain: [
        "Enterprise and institutional access through GVC client relationships.",
        "Long-term platform adoption with credible reference cases.",
        "Strategic integration into complex, multi-stakeholder programs.",
      ],
      ctaLabel: "Partner as a Technology Provider",
      ctaLink: "/contact",
    },
    {
      _key: "pt-business",
      key: "business",
      title: "Business Partners",
      tagline: "Extending GVC's reach across markets and geographies.",
      body:
        "GVC's work is expanding across the region. We partner with operators and market specialists who can extend our delivery capability into new geographies, sectors, and client segments, under structured, governed collaboration models.",
      whoForHeadline: "Who this is for",
      whoFor: [
        "Regional operators with established market relationships.",
        "Growth and market-entry specialists.",
        "Firms with complementary service lines looking for a structured co-delivery model.",
      ],
      howEngageHeadline: "How we engage",
      howEngage: [
        "Market expansion and joint delivery initiatives.",
        "Local execution partnerships on GVC mandates.",
        "Distribution of GVC programs and frameworks where applicable.",
      ],
      whatGainHeadline: "What you gain",
      whatGain: [
        "Access to GVC's service IP and delivery methodology.",
        "Structured go-to-market models with clear governance.",
        "Regional growth opportunities through a credible institutional platform.",
      ],
      ctaLabel: "Explore Business Partnership",
      ctaLink: "/contact",
    },
    {
      _key: "pt-media",
      key: "media",
      title: "Media Partners",
      tagline: "Amplifying execution-led thinking across the ecosystem.",
      body:
        "GVC builds authority through substance, not noise. We partner with media platforms, event organizers, and ecosystem builders who want access to credible, practitioner-level content on growth, transformation, and venture building.",
      whoForHeadline: "Who this is for",
      whoFor: [
        "Business media platforms and publications.",
        "Event organizers and forum producers.",
        "Industry community and ecosystem builders.",
      ],
      howEngageHeadline: "How we engage",
      howEngage: [
        "Thought leadership and practitioner content.",
        "Events, roundtables, and executive forums.",
        "Co-branded initiatives aligned to GVC's positioning and audience.",
      ],
      whatGainHeadline: "What you gain",
      whatGain: [
        "Access to credible, execution-focused narratives.",
        "Institutional credibility through association with GVC's client base and mandate work.",
        "Long-term ecosystem collaboration, not transactional content deals.",
      ],
      ctaLabel: "Collaborate as a Media Partner",
      ctaLink: "/contact",
    },
  ],
  closingHeadline: "Let's Build Together.",
  closingBody:
    "GrowValley Group is not looking for vendors or sponsors. We are looking for collaborators who bring real capability, operate with discipline, and are committed to outcomes over appearances.\n\nIf that describes how you work, we should talk.\n\nStart a partnership conversation.",
  closingCtaLabel: "Talk to Our Advisor",
  closingCtaLink: "/contact",
});

tx.createOrReplace({
  _id: "hero-consulting-partner-with-us",
  _type: "hero-consulting",
  pageSlug: "partner-with-us",
  eyebrow: "PARTNER WITH US",
  headline: "Partner With Us",
  subheadline:
    "Expertise. Reach. Execution.\n\nGrowValley Group partners with experts, operators, platforms, and ecosystem builders who share a commitment to execution-led growth and long-term value creation.",
  hasCTA: true,
  ctaText: "Talk to Our Advisor",
  ctaHref: "/contact",
});

const res = await tx.commit();
console.log("Partner With Us landing seed complete.");
console.log("Transaction:", res.transactionId);
