/**
 * Seed script — GrowValley Group
 *
 * Seeds ALL GrowValley Group content into Sanity:
 *   - siteSettings-consulting  (navigation, footer, copyright)
 *   - hero-consulting           (per page)
 *   - homePage-consulting       (full home page)
 *   - capabilitiesPage-consulting (Companies page)
 *   - solutions-consulting      (companies grid)
 *   - who-we-work-with-consulting (companies page + home)
 *   - pillar-consulting         (5 company detail pages)
 *   - service-consulting        (sub-capabilities, rendered inline)
 *   - aboutUsPage-consulting    (about page)
 *   - leadership-consulting     (4 leaders)
 *   - partnerPage-consulting    (join: experts, partners, investors)
 *
 * Run: node scripts/seed-growvalley-group.mjs
 */

import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

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

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

async function upsert(doc, typeOverride) {
    const fullDoc = typeOverride ? { _type: typeOverride, ...doc } : doc;
    const existing = await client.fetch(`*[_id == $id][0]._id`, { id: fullDoc._id });
    if (existing) {
        const { _id, _type, ...rest } = fullDoc;
        await client.patch(_id).set(rest).commit();
        console.log(`  ✔ Updated  ${_type} [${_id}]`);
    } else {
        await client.create(fullDoc);
        console.log(`  ✔ Created  ${fullDoc._type} [${fullDoc._id}]`);
    }
}

async function upsertByTypeAndKey(type, keyField, keyValue, doc) {
    const existing = await client.fetch(
        `*[_type == $type && ${keyField} == $val][0]._id`,
        { type, val: keyValue }
    );
    if (existing) {
        await client.patch(existing).set(doc).commit();
        console.log(`  ✔ Updated  ${type} [${keyField}=${keyValue}]`);
    } else {
        await client.create({ _type: type, ...doc });
        console.log(`  ✔ Created  ${type} [${keyField}=${keyValue}]`);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. SITE SETTINGS
// ─────────────────────────────────────────────────────────────────────────────

async function seedSiteSettings() {
    console.log("\n▸ Site Settings");
    await upsertByTypeAndKey("siteSettings-consulting", "_type", "siteSettings-consulting", {
        title: "GrowValley Group Settings",
        trustedByLine: "Trusted by established businesses, family offices, institutions, and governments across the region.",
        footerTagline: "Building the next generation of businesses, ventures, and institutions.",
        footerCopyright: "© 2026 GrowValley Group. All rights reserved.",
        mainNavigation: [
            { name: "Home", href: "/" },
            {
                name: "About",
                href: "/about-us",
                children: [
                    { name: "About GrowValley Group", href: "/about-us", description: "A multi-company ecosystem operating across advisory, investments, venture building, and operational infrastructure." },
                    { name: "Leadership", href: "/about-us/leadership", description: "Operators, investors, strategists, and venture builders with experience across advisory, investments, and enterprise development." },
                    { name: "Team", href: "/about-us/team", description: "The people behind the GrowValley Group ecosystem." },
                ],
            },
            {
                name: "Companies",
                href: "/companies",
                children: [
                    { name: "GrowValley Advisory", href: "/companies/advisory", description: "Strategic advisory, growth execution, restructuring, and transformation support." },
                    { name: "GrowValley Capital", href: "/companies/capital", description: "Private equity, venture investments, private markets, and strategic acquisitions." },
                    { name: "GrowValley Studios", href: "/companies/studios", description: "Startup validation, MVP development, founder support, and venture acceleration." },
                    { name: "GrowValley Ventures", href: "/companies/ventures", description: "Venture building, startup ecosystems, and company creation." },
                    { name: "GrowValley Works", href: "/companies/works", description: "Business setup, compliance, finance, payroll, and international expansion support." },
                ],
            },
            { name: "Insights", href: "/insights" },
            {
                name: "Join",
                href: "/partner-with-us",
                children: [
                    { name: "Experts", href: "/partner-with-us/experts", description: "Experienced operators, advisors, and execution partners across strategy, finance, and venture building." },
                    { name: "Partners", href: "/partner-with-us/partners", description: "Strategic relationships built for long-term alignment across markets, clients, and opportunities." },
                    { name: "Investors", href: "/partner-with-us/investors", description: "Capital with long-term alignment across venture opportunities, private markets, and acquisitions." },
                ],
            },
            { name: "Contact", href: "/contact" },
        ],
        footerNavigation: [
            {
                columnTitle: "Company",
                links: [
                    { name: "About", href: "/about-us" },
                    { name: "Leadership", href: "/about-us/leadership" },
                    { name: "Team", href: "/about-us/team" },
                ],
            },
            {
                columnTitle: "Reach us",
                links: [
                    { name: "Careers", href: "/join-us/careers" },
                    { name: "Partner with us", href: "/partner-with-us" },
                    { name: "Contact", href: "/contact" },
                ],
            },
        ],
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. HERO DOCUMENTS
// ─────────────────────────────────────────────────────────────────────────────

async function seedHeroes() {
    console.log("\n▸ Heroes");

    const heroes = [
        {
            _id: "hero-home",
            pageSlug: "home",
            eyebrow: "GROWVALLEY GROUP",
            headline: "One Ecosystem. Every Stage of Growth.",
            subheadline: "GrowValley Group brings together five specialized companies operating across advisory, capital, venture building, investment, and business operations.",
            ctaText: "Talk to Us",
            ctaHref: "/contact",
            hasCTA: true,
            trustBarText: "Trusted by established businesses, family offices, institutions, and governments across the region.",
        },
        {
            _id: "hero-companies",
            pageSlug: "companies",
            eyebrow: "GrowValley Group",
            headline: "The companies behind the ecosystem.",
            subheadline: "Strategy, capital, venture building, operations, and innovation infrastructure structured through specialized companies designed to work together.",
            hasCTA: false,
        },
        {
            _id: "hero-about-us",
            pageSlug: "about-us",
            eyebrow: "ABOUT US",
            headline: "Built to connect capital, execution, and growth.",
            subheadline: "GrowValley Group is a multi-company ecosystem operating across advisory, investments, venture building, operational infrastructure, and innovation.",
            ctaText: "Talk to Our Team",
            ctaHref: "/contact",
            hasCTA: true,
        },
        {
            _id: "hero-leadership",
            pageSlug: "leadership",
            eyebrow: "LEADERSHIP",
            headline: "Built by operators.",
            subheadline: "GrowValley Group is led by operators, investors, strategists, and venture builders with experience across advisory, investments, venture creation, operations, and long-term enterprise development.",
            hasCTA: false,
        },
        {
            _id: "hero-companies-advisory",
            pageSlug: "advisory",
            eyebrow: "GROWVALLEY ADVISORY",
            headline: "Strategy. Structure. Execution.",
            subheadline: "GrowValley Advisory works with founders, boards, institutions, and leadership teams on the decisions that determine whether businesses scale, raise capital, or build long-term enterprise value.\n\nWe integrate strategy, capital, and execution into one accountable advisory system.",
            ctaText: "Talk to Our Advisor",
            ctaHref: "/contact",
            hasCTA: true,
            trustBarText: "Trusted by leading governments, corporates, and innovators across the region.",
        },
        {
            _id: "hero-companies-capital",
            pageSlug: "capital",
            eyebrow: "GROWVALLEY CAPITAL",
            headline: "Institutional Capital. Long-Term Thinking.",
            subheadline: "GrowValley Capital is the investment arm of the GrowValley ecosystem, operating across private equity, venture investments, private markets, and strategic acquisitions.\n\nWe invest alongside founders, operators, family offices, and institutional partners with a long-term approach built around value creation, discipline, and execution.",
            ctaText: "Talk to Our Team",
            ctaHref: "/contact",
            hasCTA: true,
        },
        {
            _id: "hero-companies-ventures",
            pageSlug: "ventures",
            eyebrow: "GROWVALLEY VENTURES",
            headline: "Built by operators. Run for outcomes.",
            subheadline: "GrowValley Ventures works with founders, investors, family offices, and operators across wealth management, private markets, venture building, and succession planning.\n\nThe firm combines operating experience with capital strategy, helping clients protect, deploy, structure, and grow wealth with long-term discipline.",
            ctaText: "Talk to an Advisor",
            ctaHref: "/contact",
            hasCTA: true,
        },
        {
            _id: "hero-companies-works",
            pageSlug: "works",
            eyebrow: "GROWVALLEY WORKS",
            headline: "The Firm Behind the Firm.",
            subheadline: "Company formation, government compliance, accounting, payroll, and international expansion. Handled by one firm.\n\nGrowValley Works manages the operational infrastructure businesses rely on to stay compliant, structured, and scalable across jurisdictions.",
            ctaText: "Let's Work",
            ctaHref: "/contact",
            hasCTA: true,
        },
        {
            _id: "hero-companies-studios",
            pageSlug: "studios",
            eyebrow: "GROWVALLEY STUDIOS",
            headline: "Build faster. Launch smarter.",
            subheadline: "GrowValley Studios helps founders and startups validate ideas, build products, and reach traction with structured execution systems, operator support, and startup-focused infrastructure.\n\nThe goal is simple.\n\nReduce wasted time, avoid expensive mistakes, and help companies move from idea to execution with clarity.",
            ctaText: "Visit Website",
            ctaHref: "https://www.gv.studio/",
            hasCTA: true,
        },
        {
            _id: "hero-contact",
            pageSlug: "contact",
            eyebrow: "CONTACT",
            headline: "Start the conversation.",
            subheadline: "Whether you are building a company, expanding internationally, exploring investments, scaling operations, or looking to collaborate with the GrowValley ecosystem, our team will route you to the right company and leadership team.",
            ctaText: "Schedule a Conversation",
            ctaHref: "#contact-form",
            hasCTA: true,
        },
        {
            _id: "hero-join",
            pageSlug: "join",
            eyebrow: "JOIN GROWVALLEY",
            headline: "Build With Us.",
            subheadline: "GrowValley Group works with operators, experts, investors, founders, and strategic partners building businesses, ventures, and long-term opportunities across multiple sectors and markets.\n\nWe are an ecosystem of companies, operators, and partnerships designed around execution.",
            ctaText: "Start the Conversation",
            ctaHref: "/contact",
            hasCTA: true,
        },
    ];

    for (const hero of heroes) {
        const { _id, ...rest } = hero;
        await upsertByTypeAndKey("hero-consulting", "pageSlug", hero.pageSlug, rest);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. HOME PAGE
// ─────────────────────────────────────────────────────────────────────────────

async function seedHomePage() {
    console.log("\n▸ Home Page");
    await upsertByTypeAndKey("homePage-consulting", "_type", "homePage-consulting", {
        title: "Home Page Content",
        stats: [
            { metricValue: "$3B+", metricLabel: "Revenue Generated", supportingLabel: "" },
            { metricValue: "$1B+", metricLabel: "Capital Raised", supportingLabel: "" },
            { metricValue: "500+", metricLabel: "Mandates Delivered", supportingLabel: "" },
            { metricValue: "5+", metricLabel: "Companies, One Group", supportingLabel: "" },
        ],
        positioningEyebrow: "The Problem We Solve",
        positioningHeadline: "Businesses today rarely grow through one capability alone.",
        positioningSupportingCopy: "Strategic advisory, capital access, venture development, investment, and operational infrastructure increasingly need to work together for organizations to scale effectively.\n\nGrowValley Group brings these functions together through five specialized companies operating across distinct but connected domains.\n\nEach company serves a specific role within the ecosystem. Together, they create a more connected approach to growth, execution, and long-term enterprise building.",
        painPointCards: [
            "Scale without structural readiness",
            "Raise capital without investment readiness",
            "Build ventures without execution discipline",
            "Operate without consolidated infrastructure",
        ],
        positioningStatement: "Five companies. One ecosystem.",
        positioningCtaText: "Talk to Us",
        positioningCtaHref: "/contact",
        ecosystemHeadline: "The GrowValley Group Ecosystem",
        ecosystemSupportingCopy: "GrowValley Group brings together five specialized companies operating across strategy, capital, venture building, investment, and business operations.\n\nEach company was built to solve a different part of the growth equation. Together, they create an ecosystem designed to support businesses from foundation to expansion, from investment readiness to operational scale.\n\nDifferent companies. One direction. One standard. One ecosystem.",
        serviceBlocks: [
            {
                title: "GrowValley Advisory",
                shortDescription: "Strategy. Structure. Execution.",
                supportingCopy: "GrowValley Advisory is the strategy and advisory arm of the Group. We work directly with founders, boards, and leadership teams on the decisions that determine whether a business grows, raises capital, or builds the next generation of its enterprise.\n\nOur work spans five integrated capabilities: growth strategy and transformation, capital strategy and investment readiness, innovation and venture building, project advisory and execution, and family office setup and governance.\n\nWe do not produce reports. We build the systems leadership teams execute against.",
                featureHighlights: ["Growth strategy and transformation", "Capital strategy and investment readiness", "Innovation and venture building", "Project advisory and execution", "Family office setup and governance"],
                sideCardEyebrow: "GrowValley Advisory",
                sideCardHeadline: "Strategy. Structure. Execution.",
                sideCardCtaText: "Build With GrowValley Advisory",
                sideCardCtaHref: "/companies/advisory",
                pillarHref: "/companies/advisory",
            },
            {
                title: "GrowValley Capital",
                shortDescription: "Private Equity. Investment. Growth Capital.",
                supportingCopy: "GrowValley Capital is the private equity and investment firm of GrowValley Group.\n\nThe firm focuses on investments, capital partnerships, and opportunities where strategic value can be created through the broader GrowValley ecosystem.\n\nBeyond capital, GrowValley Capital provides access to advisory expertise, venture-building capability, operational infrastructure, and institutional relationships across the Group.\n\nWe back businesses where long-term value creation matters more than short-term participation.",
                featureHighlights: ["Private equity investments", "Capital partnerships", "Venture-building access", "Operational infrastructure", "Institutional relationships"],
                sideCardEyebrow: "GrowValley Capital",
                sideCardHeadline: "Private Equity. Investment. Growth Capital.",
                sideCardCtaText: "Partner With GrowValley Capital",
                sideCardCtaHref: "/companies/capital",
                pillarHref: "/companies/capital",
            },
            {
                title: "GrowValley Studios",
                shortDescription: "Validate. Build. Scale.",
                supportingCopy: "GrowValley Studios is the Group's venture-building company. We take validated concepts through design, development, governance, and go-to-market execution — building new businesses with the structure and capital readiness that serious organizations demand.\n\nThis is not an accelerator. We do not run programs or cohorts. We build the venture alongside our clients and stay accountable to the outcome.",
                featureHighlights: ["Venture validation", "MVP development", "Go-to-market execution", "Governance structure", "Capital readiness"],
                sideCardEyebrow: "GrowValley Studios",
                sideCardHeadline: "Validate. Build. Scale.",
                sideCardCtaText: "Build With GrowValley Studios",
                sideCardCtaHref: "/companies/studios",
                pillarHref: "/companies/studios",
            },
            {
                title: "GrowValley Ventures",
                shortDescription: "Capital Behind the Right Builders.",
                supportingCopy: "GrowValley Ventures invests in early-stage companies where the Group can contribute more than a check. Portfolio companies access the full capability of the GrowValley ecosystem: advisory, operational infrastructure, venture-building expertise, and institutional relationships built over years of execution work.\n\nWe invest where we can make the outcome better, not just the cap table larger.",
                featureHighlights: ["Early-stage investments", "Advisory access", "Operational infrastructure", "Venture-building expertise", "Institutional relationships"],
                sideCardEyebrow: "GrowValley Ventures",
                sideCardHeadline: "Capital Behind the Right Builders.",
                sideCardCtaText: "Explore Investment Opportunities",
                sideCardCtaHref: "/companies/ventures",
                pillarHref: "/companies/ventures",
            },
            {
                title: "GrowValley Works",
                shortDescription: "The Operational Backbone of Serious Businesses.",
                supportingCopy: "GrowValley Works manages the legal, regulatory, and operational infrastructure that businesses cannot afford to get wrong. Company formation, entity management, compliance, accounting, payroll, and cross-border structuring — consolidated under one firm, coordinated across every function, and accountable for the outcome.\n\nMost businesses fragment these across multiple vendors who have never spoken to each other. Works consolidates them. When something needs to hold, it holds.",
                featureHighlights: ["Company formation", "Entity management", "Compliance", "Accounting and payroll", "Cross-border structuring"],
                sideCardEyebrow: "GrowValley Works",
                sideCardHeadline: "The Operational Backbone of Serious Businesses.",
                sideCardCtaText: "Streamline Operations With GrowValley Works",
                sideCardCtaHref: "/companies/works",
                pillarHref: "/companies/works",
            },
        ],
        whoHeadline: "Who We Work With",
        whoSupportingCopy: "GrowValley Group partners with organizations where complexity, ambition, and capital decisions carry real weight. Our work is board-level, founder-level, and built for the long term.",
        whoClientTypes: [
            { label: "Established Businesses", icon: "building" },
            { label: "Corporations and Enterprises", icon: "briefcase" },
            { label: "Universities and Institutions", icon: "graduation" },
            { label: "Family Offices", icon: "family" },
            { label: "Governments and Authorities", icon: "government" },
            { label: "Scale-Stage Startups", icon: "trending" },
        ],
        whoPositioningText: "Five specialized companies. One connected ecosystem.",
        whoCtaText: "Talk to Us",
        whoCtaHref: "/contact",
        whyHeadline: "Why GrowValley Group",
        whySupportingCopy: "Most firms operate within a single discipline. GrowValley Group is built as an ecosystem.\n\nFive specialized companies. Connected by one direction, one standard, and one long-term vision for growth.\n\nAdvisory. Capital. Venture Building. Investment. Operations.\n\nEach company solves a different challenge. Together, they create a platform designed to support businesses through every stage of growth and scale.",
        whyBullets: [
            "Specialized companies operating across connected domains",
            "Shared standards across strategy, capital, execution, and operations",
            "Long-term ecosystem thinking instead of isolated services",
            "Institutional capability built around real-world execution",
            "A structure designed for scale, not short-term transactions",
            "An ecosystem built to move businesses forward",
        ],
        whyClosingStatement: "Different companies. One ecosystem.",
        whyCtaText: "Talk to Us",
        whyCtaHref: "/contact",
        expertiseHeadline: "Where Our Expertise Sits",
        expertiseSubheadline: "Our teams are drawn from senior advisory, investment, operational, and executive roles.",
        expertiseLead: "Our teams are drawn from senior advisory, investment, operational, and executive roles. The depth is real. The engagements reflect it.",
        expertiseItems: [
            "Strategy, Transformation, and Business Growth",
            "Private Equity, Investment, and Growth Capital",
            "Capital Structuring and Investment Readiness",
            "Venture Building and Startup Development",
            "Innovation, Product, and Ecosystem Development",
            "Corporate Structuring and Operational Infrastructure",
            "Company Formation and Cross-Border Expansion",
            "Family Office Structuring and Governance",
            "Regulatory Operations and Business Compliance",
            "Accounting, Payroll, and Workforce Operations",
            "Project Advisory and Enterprise Execution",
        ],
        expertiseClosingStatement: "Every engagement is scoped to your stage, your complexity, and your priorities. We do not apply templates. We design fit-for-purpose systems that evolve as the business evolves.",
        expertiseCtaText: "Talk to Us",
        expertiseCtaHref: "/contact",
        finaleHeadline: "Start the Conversation",
        finaleSupportingCopy: "The businesses that work with GrowValley Group are not looking for another advisor. They are looking for a firm that owns the outcome alongside them.\n\nIf that is what you need, tell us where you are. We will tell you what it takes to get where you are going.",
        finaleCtaText: "Talk to Us",
        finaleCtaHref: "/contact",
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. COMPANIES PAGE (capabilitiesPage-consulting)
// ─────────────────────────────────────────────────────────────────────────────

async function seedCompaniesPage() {
    console.log("\n▸ Companies Page");
    await upsertByTypeAndKey("capabilitiesPage-consulting", "_type", "capabilitiesPage-consulting", {
        title: "Companies Page Content",
        introHeading: "Different companies. One operating standard.",
        introParagraph: "GrowValley Group operates through specialized companies across advisory, investments, venture building, operational infrastructure, and innovation.\n\nEach company is built with a focused mandate while remaining connected through one group structured for long-term execution.\n\nThis allows founders, investors, operators, institutions, and businesses to access the right expertise without navigating fragmented providers across every stage of growth.",
        darkBlockStatement: "Different companies. One standard.",
        darkBlockBody: "GrowValley Group operates through specialized companies across advisory, investments, venture building, operations, and innovation.\n\nEach company is built with a focused mandate.\nTogether, they form an integrated operating platform designed for long-term growth.",
        statsStrip: [
            "5 Specialized companies",
            "Operator-led leadership",
            "Advisory, capital, ventures, and infrastructure under one group",
            "Built for long-term execution across multiple markets",
        ],
        bottomCtaHeadline: "Most relationships start with one company. They expand across the group from there.",
        bottomCtaButtonText: "Talk to GrowValley →",
        bottomCtaButtonLink: "/contact",
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. SOLUTIONS (companies grid)
// ─────────────────────────────────────────────────────────────────────────────

async function seedSolutions() {
    console.log("\n▸ Solutions (Companies Grid)");
    await upsertByTypeAndKey("solutions-consulting", "_type", "solutions-consulting", {
        headline: "The GrowValley Group Ecosystem",
        description: "GrowValley Group brings together five specialized companies operating across strategy, capital, venture building, investment, and business operations.",
        capabilitiesLeadIn: "Each company was built to solve a different part of the growth equation.",
        items: [
            {
                id: "advisory",
                title: "GrowValley Advisory",
                tagline: "Strategy. Structure. Execution.",
                body: "Strategic advisory, growth execution, restructuring, and transformation support for companies navigating scale, expansion, and operational complexity.",
                subtitle: "Strategic advisory, growth execution, restructuring, and transformation support for companies navigating scale, expansion, and operational complexity.",
                howNeedsMet: "Strategy, capital, innovation, governance, and execution — integrated into one advisory model.",
                ctaPrompt: "Explore GrowValley Advisory →",
                href: "/companies/advisory",
            },
            {
                id: "capital",
                title: "GrowValley Capital",
                tagline: "Private Equity. Investment. Growth Capital.",
                body: "Private equity, venture investments, private markets, and strategic acquisitions managed through a long-term institutional investment approach.",
                subtitle: "Private equity, venture investments, private markets, and strategic acquisitions managed through a long-term institutional investment approach.",
                howNeedsMet: "Long-term investment philosophy with institutional and operator-led approach.",
                ctaPrompt: "Explore GrowValley Capital →",
                href: "/companies/capital",
            },
            {
                id: "ventures",
                title: "GrowValley Ventures",
                tagline: "Capital Behind the Right Builders.",
                body: "Venture building, startup ecosystems, and company creation focused on turning ideas into scalable businesses with operational discipline.",
                subtitle: "Venture building, startup ecosystems, and company creation focused on turning ideas into scalable businesses with operational discipline.",
                howNeedsMet: "Operator-led advisory with access to private market opportunities and long-term capital discipline.",
                ctaPrompt: "Explore GrowValley Ventures →",
                href: "/companies/ventures",
            },
            {
                id: "works",
                title: "GrowValley Works",
                tagline: "The Operational Backbone of Serious Businesses.",
                body: "Business setup, compliance, finance, payroll, operational infrastructure, and international expansion support across multiple jurisdictions.",
                subtitle: "Business setup, compliance, finance, payroll, operational infrastructure, and international expansion support across multiple jurisdictions.",
                howNeedsMet: "Legal, compliance, finance, payroll, and administration integrated into one operating system.",
                ctaPrompt: "Explore GrowValley Works →",
                href: "/companies/works",
            },
            {
                id: "studios",
                title: "GrowValley Studios",
                tagline: "Validate. Build. Scale.",
                body: "Startup validation, MVP development, founder support, and venture acceleration designed around fast execution and measurable traction.",
                subtitle: "Startup validation, MVP development, founder support, and venture acceleration designed around fast execution and measurable traction.",
                howNeedsMet: "Structured startup execution with validation before scale and sprint-based delivery systems.",
                ctaPrompt: "Explore GrowValley Studios →",
                href: "/companies/studios",
            },
        ],
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. WHO WE WORK WITH
// ─────────────────────────────────────────────────────────────────────────────

async function seedWhoWeWorkWith() {
    console.log("\n▸ Who We Work With");
    await upsertByTypeAndKey("who-we-work-with-consulting", "_type", "who-we-work-with-consulting", {
        headline: "Who we work with",
        description: "GrowValley Group partners with organizations where complexity, ambition, and capital decisions carry real weight.",
        categories: [
            { title: "Founders building and scaling ventures", description: "" },
            { title: "Family offices managing long-term capital", description: "" },
            { title: "Investors and private market participants", description: "" },
            { title: "International businesses entering new markets", description: "" },
            { title: "Growth-stage companies requiring operational support", description: "" },
            { title: "Institutions and strategic ecosystem partners", description: "" },
            { title: "Operators restructuring fragmented systems", description: "" },
            { title: "Businesses navigating expansion and transformation", description: "" },
        ],
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. COMPANY PILLARS
// ─────────────────────────────────────────────────────────────────────────────

async function seedPillars() {
    console.log("\n▸ Company Pillars");

    const pillars = [
        // ── GrowValley Advisory ──────────────────────────────────────────
        {
            _id: "pillar-advisory",
            _type: "pillar-consulting",
            title: "GrowValley Advisory",
            slug: { _type: "slug", current: "advisory" },
            heroHeadline: "Strategy. Structure. Execution.",
            heroSubheadline: "GrowValley Advisory works with founders, boards, institutions, and leadership teams on the decisions that determine whether businesses scale, raise capital, or build long-term enterprise value.\n\nWe integrate strategy, capital, and execution into one accountable advisory system.",
            challengesHeadline: "The Problems We Solve",
            challengesIntro: "Most businesses do not lack ambition.\n\nThey struggle because strategy, capital, and execution are pursued in isolation instead of operating as one integrated system.\n\nAs a result, organisations attempt to:",
            challengesBullets: [
                "Scale without structural readiness",
                "Raise capital without investment readiness",
                "Build ventures without execution readiness",
                "Transform operations without governance discipline",
                "Launch initiatives without accountability infrastructure",
            ],
            challengesClosing: "This leads to stalled growth, weak capital outcomes, and transformation programs that fail to deliver.\n\nGrowValley Advisory exists to close these gaps by integrating growth, capital, governance, and execution into one strategic framework.",
            servicesEyebrow: "ADVISORY CAPABILITIES",
            servicesHeadline: "Advisory Capabilities",
            servicesSubheadline: "GrowValley Advisory operates across five integrated areas:\n\nEach capability is designed to help organisations scale with stronger strategy, governance, execution, and capital readiness.",
            cardGridEyebrow: "WHO WE WORK WITH",
            cardGridHeadline: "Who We Work With",
            cardGridBody: "GrowValley Advisory partners with organisations where complexity, ambition, and capital decisions carry real weight.\n\nOur work is board-level, founder-level, and built for the long term.",
            whoWeWorkWith: [
                "Established Businesses",
                "Corporations & Enterprises",
                "Universities & Institutions",
                "Family Offices",
                "Governments & Authorities",
                "Scale-Stage Startups",
            ],
            positioningText: "We do not sell advice.\n\nWe build systems by integrating strategy, capital, and execution with discipline and accountability.",
            engagementModelsHeadline: "Why GrowValley Advisory",
            engagementModelsIntro: "Most firms operate within a single discipline.\n\nGrowValley Advisory integrates growth, capital, innovation, governance, and execution into one connected advisory model.\n\nWhat defines the way we operate:",
            engagementModels: [
                "Integrated advisory across growth, capital, and innovation",
                "Execution-led, not report-driven",
                "Institutional standards with entrepreneurial clarity",
                "Structure before scale, discipline before acceleration",
                "Independent and conflict-free advisory",
                "Metrics-driven engagement models",
                "Strategy and execution integrated into one mandate",
            ],
            nextSectionTitle: "Start the Conversation.",
            nextSectionBody: "The organisations that work with GrowValley Advisory are not looking for another consultant.\n\nThey are looking for a partner that understands strategy, capital, governance, and execution at the same time.\n\nIf that is what you need, tell us where you are.\n\nWe will tell you what it takes to move forward.",
            nextSectionCtaLabel: "Talk to Our Advisor",
            nextSectionCtaHref: "/contact",
            aboutUsSubtitle: "Strategic advisory, growth execution, and transformation.",
        },

        // ── GrowValley Capital ───────────────────────────────────────────
        {
            _id: "pillar-capital",
            _type: "pillar-consulting",
            title: "GrowValley Capital",
            slug: { _type: "slug", current: "capital" },
            heroHeadline: "Institutional Capital. Long-Term Thinking.",
            heroSubheadline: "GrowValley Capital is the investment arm of the GrowValley ecosystem, operating across private equity, venture investments, private markets, and strategic acquisitions.\n\nWe invest alongside founders, operators, family offices, and institutional partners with a long-term approach built around value creation, discipline, and execution.",
            challengesHeadline: "What We Do",
            challengesIntro: "GrowValley Capital focuses on opportunities where operational capability and strategic alignment matter as much as capital.\n\nCore investment areas include:",
            challengesBullets: [
                "Private Equity",
                "Venture Investments",
                "Private Markets",
                "Mergers & Acquisitions",
                "Strategic Investments",
            ],
            challengesClosing: "We back businesses, operators, and opportunities positioned for long-term growth.",
            servicesEyebrow: "INVESTMENT AREAS",
            servicesHeadline: "Core Investment Areas",
            servicesSubheadline: "GrowValley Capital focuses on opportunities where operational capability and strategic alignment matter as much as capital.",
            cardGridHeadline: "Who We Work With",
            cardGridBody: "GrowValley Capital works with:\n\nWe partner with people building for the long term.",
            whoWeWorkWith: [
                "Founders and operators",
                "Family offices",
                "Institutional investors",
                "Private investment groups",
                "Growth-stage businesses",
                "Strategic partners",
            ],
            positioningText: "We do not chase noise.\n\nWe back businesses built to last.",
            engagementModelsHeadline: "Why GrowValley Capital",
            engagementModelsIntro: "Most investment firms understand capital.\n\nFew understand operators.\n\nGrowValley Capital combines institutional thinking with real operating experience across venture building, business growth, and long-term enterprise development.\n\nWhat defines the firm:",
            engagementModels: [
                "Long-term investment philosophy",
                "Institutional and operator-led approach",
                "Global investment outlook",
                "Strategic partnership mindset",
                "Discipline over speculation",
                "Execution-focused investment strategy",
            ],
            nextSectionTitle: "Built for long-term value.",
            nextSectionBody: "GrowValley Capital invests in businesses, founders, and opportunities where structure, execution, and long-term alignment create lasting enterprise value.",
            nextSectionCtaLabel: "Talk to Our Team",
            nextSectionCtaHref: "/contact",
            aboutUsSubtitle: "Private equity, venture investments, and strategic acquisitions.",
        },

        // ── GrowValley Ventures ──────────────────────────────────────────
        {
            _id: "pillar-ventures",
            _type: "pillar-consulting",
            title: "GrowValley Ventures",
            slug: { _type: "slug", current: "ventures" },
            heroHeadline: "Built by operators. Run for outcomes.",
            heroSubheadline: "GrowValley Ventures works with founders, investors, family offices, and operators across wealth management, private markets, venture building, and succession planning.\n\nThe firm combines operating experience with capital strategy, helping clients protect, deploy, structure, and grow wealth with long-term discipline.",
            challengesHeadline: "What We Do",
            challengesIntro: "GrowValley Ventures operates across four core areas:\n\nEvery service is designed around one principle:\n\nCapital should be managed by people who understand how it was actually built.",
            challengesBullets: [
                "Wealth Management",
                "Family Office Services",
                "Private Market Access",
                "Wealth & Succession Planning",
            ],
            servicesEyebrow: "CORE AREAS",
            servicesHeadline: "Core Areas",
            servicesSubheadline: "GrowValley Ventures operates across four core areas, each designed around one principle: capital should be managed by people who understand how it was actually built.",
            cardGridHeadline: "Who We Work With",
            cardGridBody: "GrowValley Ventures works with:\n\nOur clients want more than portfolio management.\n\nThey want experienced operators involved in capital decisions.",
            whoWeWorkWith: [
                "HNW individuals and families",
                "Entrepreneurs and founders",
                "Family offices",
                "Qualified investors",
                "Cross-border investors",
                "Business owners following liquidity events",
            ],
            positioningText: "We do not manage wealth like a retail platform.\n\nWe manage it like people who have actually deployed capital themselves.",
            engagementModelsHeadline: "Why GrowValley Ventures",
            engagementModelsIntro: "Most wealth firms understand markets.\n\nGrowValley Ventures understands operators, transactions, capital deployment, and business building.\n\nThat changes how decisions are made.\n\nWhat defines the firm:",
            engagementModels: [
                "Operator-led advisory",
                "Access to private market opportunities",
                "Independent, conflict-free mandates",
                "Cross-border structuring expertise",
                "Long-term capital discipline",
                "Institutional thinking with entrepreneurial execution",
            ],
            nextSectionTitle: "Let's talk about your capital.",
            nextSectionBody: "Whether you are protecting wealth, deploying capital, planning succession, or exploring private markets, the first step is a direct conversation.\n\nNo pitch decks. No pressure. Just clarity.",
            nextSectionCtaLabel: "Talk to an Advisor",
            nextSectionCtaHref: "/contact",
            aboutUsSubtitle: "Venture building, startup ecosystems, and growth execution.",
        },

        // ── GrowValley Works ─────────────────────────────────────────────
        {
            _id: "pillar-works",
            _type: "pillar-consulting",
            title: "GrowValley Works",
            slug: { _type: "slug", current: "works" },
            heroHeadline: "The Firm Behind the Firm.",
            heroSubheadline: "Company formation, government compliance, accounting, payroll, and international expansion. Handled by one firm.\n\nGrowValley Works manages the operational infrastructure businesses rely on to stay compliant, structured, and scalable across jurisdictions.",
            challengesHeadline: "What We Do",
            challengesIntro: "GrowValley Works operates across four integrated service pillars:\n\nLegal, regulatory, financial, and administrative operations coordinated under one firm.",
            challengesBullets: ["Establish", "Operate", "Manage", "Expand"],
            servicesEyebrow: "SERVICE PILLARS",
            servicesHeadline: "Service Pillars",
            servicesSubheadline: "GrowValley Works operates across four integrated service pillars — legal, regulatory, financial, and administrative operations coordinated under one firm.",
            cardGridHeadline: "Who We Work With",
            cardGridBody: "GrowValley Works supports:\n\nOur clients do not need another vendor.\n\nThey need one firm accountable across the full operational stack.",
            whoWeWorkWith: [
                "Founders and operators",
                "Growth-stage businesses",
                "Multi-entity corporate groups",
                "International companies entering the UAE",
                "Family offices and holding structures",
                "Businesses expanding across borders",
            ],
            positioningText: "We do not just form entities.\n\nWe run the infrastructure behind them.",
            engagementModelsHeadline: "Why GrowValley Works",
            engagementModelsIntro: "Most businesses spread operations across disconnected providers.\n\nGrowValley Works integrates legal, compliance, finance, payroll, and administration into one operating system.\n\nWhat defines the firm:",
            engagementModels: [
                "One point of accountability",
                "Cross-functional operational support",
                "UAE and international capability",
                "Integrated compliance and finance infrastructure",
                "Operator-focused execution",
                "Multi-entity operational management",
                "Built for scale, not just setup",
            ],
            nextSectionTitle: "Infrastructure that holds when the business grows.",
            nextSectionBody: "Operational failures rarely stay administrative.\n\nThey become legal, financial, and regulatory problems.\n\nGrowValley Works manages the systems that keep businesses running properly across every stage of growth.",
            nextSectionCtaLabel: "Talk to Our Team",
            nextSectionCtaHref: "/contact",
            aboutUsSubtitle: "Operational infrastructure, compliance, finance, and expansion support.",
        },

        // ── GrowValley Studios ───────────────────────────────────────────
        {
            _id: "pillar-studios",
            _type: "pillar-consulting",
            title: "GrowValley Studios",
            slug: { _type: "slug", current: "studios" },
            heroHeadline: "Build faster. Launch smarter.",
            heroSubheadline: "GrowValley Studios helps founders and startups validate ideas, build products, and reach traction with structured execution systems, operator support, and startup-focused infrastructure.\n\nThe goal is simple.\n\nReduce wasted time, avoid expensive mistakes, and help companies move from idea to execution with clarity.",
            challengesHeadline: "What GrowValley Studios Does",
            challengesIntro: "GrowValley Studios works with founders across the earliest stages of company building.\n\nFrom validation and MVP development to growth and fundraising preparation, the focus stays on execution instead of theory.\n\nCore areas include:",
            challengesBullets: [
                "Venture validation",
                "MVP development",
                "Go-to-market strategy",
                "Startup advisory",
                "Growth systems",
                "Founder support",
                "Fundraising preparation",
                "Startup education and programs",
                "Expert reviews and sprint systems",
            ],
            servicesEyebrow: "CORE EXECUTION AREAS",
            servicesHeadline: "Core Execution Areas",
            servicesSubheadline: "GrowValley Studios works with founders across the earliest stages of company building — from validation and MVP development to growth and fundraising preparation.",
            cardGridHeadline: "Who We Work With",
            cardGridBody: "GrowValley Studios supports:\n\nThe work is structured around speed, validation, and commercial clarity.",
            whoWeWorkWith: [
                "First-time founders",
                "Startup operators",
                "Venture-backed startups",
                "Early-stage technology companies",
                "Startup teams preparing for fundraising",
                "Founders validating new ideas",
                "Businesses building MVPs",
                "Companies seeking early traction",
            ],
            positioningText: "The objective is not activity.\n\nThe objective is traction.",
            engagementModelsHeadline: "Why GrowValley Studios",
            engagementModelsIntro: "Most startups waste months building the wrong thing.\n\nGrowValley Studios exists to reduce that risk.\n\nWhat defines the studio:",
            engagementModels: [
                "Structured startup execution",
                "Validation before scale",
                "Sprint-based delivery systems",
                "Founder-focused operating support",
                "Startup growth frameworks",
                "Expert and mentor access",
                "Startup education programs",
                "Practical execution over theory",
            ],
            nextSectionTitle: "Startups fail slower when nobody challenges the assumptions.",
            nextSectionBody: "GrowValley Studios helps founders test ideas, move faster, and build with structure before capital and time disappear into the wrong direction.",
            nextSectionCtaLabel: "Start Your Journey",
            nextSectionCtaHref: "https://www.gv.studio/",
            aboutUsSubtitle: "Startup validation, MVP development, and venture acceleration.",
        },
    ];

    for (const pillar of pillars) {
        await upsert(pillar);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// 8. SERVICES (sub-capabilities, rendered inline on company pages)
// ─────────────────────────────────────────────────────────────────────────────

async function seedServices() {
    console.log("\n▸ Services (company sub-capabilities)");

    const services = [
        // ── Advisory services ──────────────────────────────────────────
        {
            _id: "service-advisory-growth",
            title: "Growth Advisory",
            slug: { _type: "slug", current: "advisory-growth" },
            pillar: { _type: "reference", _ref: "pillar-advisory" },
            description: "We help businesses strengthen growth, operational performance, governance, and execution discipline.",
            pillarLandingTagline: "Strategy. Performance. Governance.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-advisory-capital",
            title: "Capital Advisory",
            slug: { _type: "slug", current: "advisory-capital" },
            pillar: { _type: "reference", _ref: "pillar-advisory" },
            description: "We prepare businesses for capital through investment readiness, institutional materials, capital structuring, and transaction preparation.",
            pillarLandingTagline: "Structure. Dataroom. Transaction.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-advisory-innovation",
            title: "Innovation Advisory",
            slug: { _type: "slug", current: "advisory-innovation" },
            pillar: { _type: "reference", _ref: "pillar-advisory" },
            description: "We help organisations build innovation systems, venture studios, and new growth engines with structure and execution discipline.",
            pillarLandingTagline: "Future. Ventures. Excellence.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-advisory-project",
            title: "Project Advisory",
            slug: { _type: "slug", current: "advisory-project" },
            pillar: { _type: "reference", _ref: "pillar-advisory" },
            description: "We design PMOs and execution systems that give leadership teams visibility, governance, and delivery discipline across complex initiatives.",
            pillarLandingTagline: "Visibility. Accountability. Delivery.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-advisory-family-office",
            title: "Family Office Setup",
            slug: { _type: "slug", current: "advisory-family-office" },
            pillar: { _type: "reference", _ref: "pillar-advisory" },
            description: "We help families structure, govern, and manage wealth through institutional-grade governance and investment operating models.",
            pillarLandingTagline: "Structure. Governance. Generational Discipline.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },

        // ── Capital services ──────────────────────────────────────────
        {
            _id: "service-capital-private-equity",
            title: "Private Equity",
            slug: { _type: "slug", current: "capital-private-equity" },
            pillar: { _type: "reference", _ref: "pillar-capital" },
            description: "We invest in businesses with strong fundamentals, scalable potential, and clear operational upside.",
            pillarLandingTagline: "Long-term value creation.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-capital-venture",
            title: "Venture Investments",
            slug: { _type: "slug", current: "capital-venture" },
            pillar: { _type: "reference", _ref: "pillar-capital" },
            description: "We invest in founders and companies building scalable businesses across emerging sectors and global markets.",
            pillarLandingTagline: "Backing ambitious operators.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-capital-private-markets",
            title: "Private Markets",
            slug: { _type: "slug", current: "capital-private-markets" },
            pillar: { _type: "reference", _ref: "pillar-capital" },
            description: "GrowValley Capital participates across private market opportunities through strategic partnerships, direct investments, and long-term capital positions.",
            pillarLandingTagline: "Access beyond public markets.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-capital-ma",
            title: "Mergers & Acquisitions",
            slug: { _type: "slug", current: "capital-ma" },
            pillar: { _type: "reference", _ref: "pillar-capital" },
            description: "We pursue acquisitions and strategic opportunities where capital, structure, and execution create measurable enterprise value.",
            pillarLandingTagline: "Strategic transactions with operational alignment.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },

        // ── Ventures services ─────────────────────────────────────────
        {
            _id: "service-ventures-wealth-mgmt",
            title: "Wealth Management",
            slug: { _type: "slug", current: "ventures-wealth-management" },
            pillar: { _type: "reference", _ref: "pillar-ventures" },
            description: "We build investment strategies around client objectives, risk tolerance, liquidity needs, and long-term outcomes.\n\nNo commissions. No product pushing. No generic portfolios.",
            pillarLandingTagline: "Portfolio strategy without product selling.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-ventures-family-office",
            title: "Family Office Services",
            slug: { _type: "slug", current: "ventures-family-office" },
            pillar: { _type: "reference", _ref: "pillar-ventures" },
            description: "We help families manage structures, reporting, governance, philanthropy, and cross-border wealth complexity through a single coordinated framework.",
            pillarLandingTagline: "Coordination across complex wealth.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-ventures-private-markets",
            title: "Private Market Access",
            slug: { _type: "slug", current: "ventures-private-markets" },
            pillar: { _type: "reference", _ref: "pillar-ventures" },
            description: "Clients gain access to private equity, venture capital, real estate, and corporate opportunities sourced through the GrowValley network.\n\nEvery opportunity is reviewed through an operator lens, not just a financial one.",
            pillarLandingTagline: "Access built through real operating networks.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-ventures-succession",
            title: "Wealth & Succession Planning",
            slug: { _type: "slug", current: "ventures-succession" },
            pillar: { _type: "reference", _ref: "pillar-ventures" },
            description: "We help clients structure wealth transfer, governance systems, trusts, succession frameworks, and family continuity planning.",
            pillarLandingTagline: "Protecting wealth across generations.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },

        // ── Works services ────────────────────────────────────────────
        {
            _id: "service-works-establish",
            title: "Establish",
            slug: { _type: "slug", current: "works-establish" },
            pillar: { _type: "reference", _ref: "pillar-works" },
            description: "We manage company formation, corporate structuring, free zone setup, and trust arrangements built for long-term operational stability.",
            pillarLandingTagline: "Structure before scale.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-works-operate",
            title: "Operate",
            slug: { _type: "slug", current: "works-operate" },
            pillar: { _type: "reference", _ref: "pillar-works" },
            description: "We run PRO services, entity management, regulatory filings, and corporate administration so operational deadlines do not become business risks.",
            pillarLandingTagline: "Compliance handled properly.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-works-manage",
            title: "Manage",
            slug: { _type: "slug", current: "works-manage" },
            pillar: { _type: "reference", _ref: "pillar-works" },
            description: "We manage accounting, payroll, HR administration, tax compliance, and employer-of-record services across UAE and international entities.",
            pillarLandingTagline: "Financial and people operations.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-works-expand",
            title: "Expand",
            slug: { _type: "slug", current: "works-expand" },
            pillar: { _type: "reference", _ref: "pillar-works" },
            description: "We support international expansion, multi-entity structuring, cross-border compliance, and market entry execution across multiple jurisdictions.",
            pillarLandingTagline: "Expansion without operational gaps.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },

        // ── Studios services ──────────────────────────────────────────
        {
            _id: "service-studios-validate",
            title: "Validate",
            slug: { _type: "slug", current: "studios-validate" },
            pillar: { _type: "reference", _ref: "pillar-studios" },
            description: "GrowValley Studios helps founders validate customer demand, refine positioning, and test ideas before significant capital is deployed.",
            pillarLandingTagline: "Know what the market actually wants.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-studios-build",
            title: "Build",
            slug: { _type: "slug", current: "studios-build" },
            pillar: { _type: "reference", _ref: "pillar-studios" },
            description: "We support founders through MVP planning, product execution, sprint management, and operational setup designed for fast learning cycles.",
            pillarLandingTagline: "Scope tight. Launch clean.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-studios-grow",
            title: "Grow",
            slug: { _type: "slug", current: "studios-grow" },
            pillar: { _type: "reference", _ref: "pillar-studios" },
            description: "GrowValley Studios helps startups improve messaging, activation, retention, and growth execution using structured experiments and measurable KPIs.",
            pillarLandingTagline: "Early traction with structure.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
        {
            _id: "service-studios-advisory",
            title: "Advisory",
            slug: { _type: "slug", current: "studios-advisory" },
            pillar: { _type: "reference", _ref: "pillar-studios" },
            description: "Founders get direct access to frameworks, mentors, startup operators, and execution systems built around practical startup growth.",
            pillarLandingTagline: "Operators, not spectators.",
            pillarLandingBullets: [],
            pillarLandingOutcome: "",
        },
    ];

    for (const service of services) {
        await upsert(service, "service-consulting");
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. ABOUT US PAGE
// ─────────────────────────────────────────────────────────────────────────────

async function seedAboutUsPage() {
    console.log("\n▸ About Us Page");
    await upsertByTypeAndKey("aboutUsPage-consulting", "_type", "aboutUsPage-consulting", {
        narrativeSections: [
            {
                eyebrow: "WHO WE ARE",
                heading: "An ecosystem built for execution.",
                body: "GrowValley Group operates through specialized companies designed around different parts of the business lifecycle.\n\nEach company focuses on a specific capability while remaining connected through one operating ecosystem.\n\nThe group includes:\n\n• GrowValley Advisory\n• GrowValley Capital\n• GrowValley Ventures\n• GrowValley Works\n• GrowValley Studios\n\nThis structure allows founders, businesses, investors, and institutions to access integrated support across strategy, investments, venture creation, operational infrastructure, and long-term growth.",
            },
            {
                eyebrow: "OPERATING PHILOSOPHY",
                heading: "Execution matters more than theory.",
                body: "GrowValley was not built as a traditional consulting firm.\n\nThe ecosystem combines operators, advisors, investors, and builders working across real businesses, ventures, and capital structures.\n\nThe focus is simple:\n\n• Build with structure\n• Operate with discipline\n• Scale with clarity\n• Think long term\n\nEvery company inside the group is designed around execution, accountability, and measurable outcomes.",
            },
            {
                eyebrow: "WHO WE WORK WITH",
                heading: "Built for ambitious organisations and long-term builders.",
                body: "GrowValley Group works with:\n\n• Founders and entrepreneurs\n• Family offices\n• Investors and institutions\n• Growth-stage businesses\n• Corporate groups\n• Venture-backed companies\n• Government and ecosystem initiatives\n• International businesses expanding into new markets\n\nMost clients do not need another disconnected service provider.\n\nThey need aligned execution across multiple areas of growth.",
            },
        ],
        subPagesNav: [
            { label: "Leadership", href: "/about-us/leadership" },
            { label: "Team", href: "/about-us/team" },
        ],
        ctaHeadline: "Built for companies that intend to scale properly.",
        ctaSubline: "Whether building a venture, deploying capital, expanding internationally, restructuring operations, or scaling long-term enterprise value, GrowValley Group operates through specialized companies designed to work together.",
        ctaButtonLabel: "Start the Conversation",
        ctaButtonLink: "/contact",
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. LEADERSHIP
// ─────────────────────────────────────────────────────────────────────────────

async function seedLeadership() {
    console.log("\n▸ Leadership");

    const leaders = [
        {
            _id: "leader-jazeer-jamal",
            name: "Jazeer Jamal",
            title: "Founder & Group Chief Executive Officer",
            bio: "Jazeer Jamal is the Founder and Group CEO of GrowValley Group, leading the organisation across advisory, investments, venture building, and ecosystem development.\n\nHis background spans venture creation, strategic advisory, innovation ecosystems, private investments, and public-private initiatives across the UAE and international markets.\n\nOver the past two decades, he has worked with founders, family businesses, investors, institutions, and government-linked initiatives across growth, transformation, and long-term enterprise development.",
        },
        {
            _id: "leader-billy-daly",
            name: "Billy Daly",
            title: "Group Chief Investment Officer",
            bio: "Billy Daly leads investment strategy and capital initiatives across the GrowValley ecosystem.\n\nHis experience spans private investments, real estate, asset management, acquisitions, and strategic growth across regional and international markets.\n\nHe has held senior leadership positions across major UAE-based organizations and brings institutional investment experience across complex multi-entity businesses and long-term capital strategies.",
        },
        {
            _id: "leader-aaisha-mathews",
            name: "Aaisha Mathews",
            title: "Co-Founder & Chairwoman",
            bio: "Aaisha Mathews is Co-Founder and Chairwoman of GrowValley Group, supporting venture development, ecosystem partnerships, and long-term strategic initiatives across the organisation.\n\nHer background spans venture building, innovation programs, wellness ventures, and startup ecosystem development across public and private sector initiatives.\n\nShe has contributed to multiple venture and innovation platforms focused on building scalable businesses and long-term impact.",
        },
        {
            _id: "leader-suhail-ismail",
            name: "Suhail Ismail",
            title: "Chief Operating Officer",
            bio: "Suhail Ismail leads operations, venture execution, and growth systems across the GrowValley ecosystem.\n\nHis experience spans venture building, startup operations, digital growth, brand strategy, and execution management across innovation-driven businesses.\n\nAt GrowValley, he focuses on operational discipline, venture execution, and scaling systems that support founders, partners, and emerging ventures.",
        },
    ];

    for (const leader of leaders) {
        await upsert(leader, "leadership-consulting");
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. JOIN / PARTNER PAGES
// ─────────────────────────────────────────────────────────────────────────────

async function seedPartnerPages() {
    console.log("\n▸ Partner / Join Pages");

    const pages = [
        {
            pageKey: "experts",
            heroEyebrow: "EXPERTS",
            heroHeadline: "Operators with real experience.",
            heroSubheadline: "We work with experienced operators, advisors, consultants, specialists, and execution partners across strategy, finance, operations, investment, technology, venture building, and business growth.\n\nWhether supporting clients, ventures, or internal initiatives, we look for people who understand execution, not just theory.",
            heroCtaLabel: "Join as an Expert",
            heroCtaLink: "/contact",
            traits: [
                { title: "Real execution experience", description: "Deep operating background across advisory, investment, operations, or venture building." },
                { title: "Aligned with long-term thinking", description: "Focused on building relationships and outcomes, not short-term transactions." },
                { title: "Domain specialists", description: "Expertise across strategy, finance, legal, technology, growth, or operational disciplines." },
            ],
            ctaHeadline: "Let's build something meaningful.",
            ctaBody: "Whether you are an operator, investor, expert, or strategic partner, GrowValley is built around long-term relationships with people who execute at a high level.\n\nIf that sounds like you, start the conversation.",
            ctaButtonLabel: "Join as an Expert",
            ctaButtonHref: "/contact",
        },
        {
            pageKey: "partners",
            heroEyebrow: "PARTNERS",
            heroHeadline: "Strategic relationships built for growth.",
            heroSubheadline: "GrowValley partners with firms, institutions, service providers, venture platforms, and ecosystem operators looking to collaborate across markets, clients, and opportunities.\n\nThe objective is long-term alignment, not transactional introductions.",
            heroCtaLabel: "Become a Partner",
            heroCtaLink: "/contact",
            traits: [
                { title: "Complementary capabilities", description: "Firms and platforms that extend or complement the GrowValley ecosystem." },
                { title: "Long-term alignment", description: "Partners who build relationships around shared clients and outcomes, not referral fees." },
                { title: "Market presence", description: "Established presence across key markets where GrowValley operates." },
            ],
            ctaHeadline: "Let's build something meaningful.",
            ctaBody: "Whether you are an operator, investor, expert, or strategic partner, GrowValley is built around long-term relationships with people who execute at a high level.\n\nIf that sounds like you, start the conversation.",
            ctaButtonLabel: "Become a Partner",
            ctaButtonHref: "/contact",
        },
        {
            pageKey: "investors",
            heroEyebrow: "INVESTORS",
            heroHeadline: "Capital with long-term alignment.",
            heroSubheadline: "We engage with investors, family offices, and strategic capital partners interested in venture opportunities, private markets, acquisitions, and long-term ecosystem growth.\n\nWe value disciplined capital, strategic thinking, and aligned relationships.",
            heroCtaLabel: "Connect as an Investor",
            heroCtaLink: "/contact",
            traits: [
                { title: "Long-term capital orientation", description: "Investors focused on value creation over three to seven year horizons." },
                { title: "Strategic value beyond capital", description: "Partners who bring networks, expertise, and market access alongside their investment." },
                { title: "Aligned with execution", description: "Investors who understand and value operating discipline alongside financial returns." },
            ],
            ctaHeadline: "Let's build something meaningful.",
            ctaBody: "Whether you are an operator, investor, expert, or strategic partner, GrowValley is built around long-term relationships with people who execute at a high level.\n\nIf that sounds like you, start the conversation.",
            ctaButtonLabel: "Connect as an Investor",
            ctaButtonHref: "/contact",
        },
    ];

    for (const page of pages) {
        await upsertByTypeAndKey("partnerPage-consulting", "pageKey", page.pageKey, page);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
    console.log(`\n🚀 Seeding GrowValley Group → Sanity [${projectId}/${dataset}]\n`);

    await seedSiteSettings();
    await seedHeroes();
    await seedHomePage();
    await seedCompaniesPage();
    await seedSolutions();
    await seedWhoWeWorkWith();
    await seedPillars();
    await seedServices();
    await seedAboutUsPage();
    await seedLeadership();
    await seedPartnerPages();

    console.log("\n✅ All GrowValley Group content seeded successfully.\n");
}

main().catch((err) => {
    console.error("\n❌ Seeding failed:", err);
    process.exit(1);
});
