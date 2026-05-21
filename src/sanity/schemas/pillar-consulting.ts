import { defineField, defineType } from "sanity";

export default defineType({
    name: "pillar-consulting",
    title: "Service Pillars (Consulting)",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Pillar Title",
            type: "string",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "heroHeadline",
            title: "Hero Headline",
            type: "string",
        }),
        defineField({
            name: "heroSubheadline",
            title: "Hero Subheadline",
            type: "text",
        }),
        defineField({
            name: "heroImage",
            title: "Hero Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "approachHeadline",
            title: "Approach Headline (Large Statement)",
            type: "string",
        }),
        defineField({
            name: "approachBody",
            title: "Approach Body",
            type: "array",
            of: [{ type: "block" }],
        }),

        // ── NEW: Challenges We Solve ──────────────────────────
        defineField({
            name: "challengesHeadline",
            title: "Challenges: Headline",
            description: "Example: 'The Growth Challenges We Solve'.",
            type: "string",
        }),
        defineField({
            name: "challengesIntro",
            title: "Challenges: Intro Paragraph (Optional)",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "challengesBullets",
            title: "Challenges: Bullets",
            description: "List of typical client situations.",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "challengesClosing",
            title: "Challenges: Closing Paragraph (Optional)",
            description: "Short paragraph rendered after the bullet list.",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "challengesSectionImage",
            title: "Challenges: section image",
            description:
                "Large visual beside challenges copy on the pillar page. Falls back to a placeholder if empty.",
            type: "image",
            options: { hotspot: true },
        }),

        defineField({
            name: "howItWorks",
            title: "How It Works (Steps)",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", title: "Step Title", type: "string" },
                        { name: "description", title: "Step Description", type: "text" },
                    ]
                }
            ]
        }),
        defineField({
            name: "positioningText",
            title: "Positioning Strip Text",
            description:
                "Rendered after “Who we work with” — integrator line (e.g. “We don’t sell advice…”).",
            type: "text",
        }),
        defineField({
            name: "cardGridEyebrow",
            title: "Card Grid: Eyebrow (Optional)",
            description: "Example: 'WHO WE WORK WITH'",
            type: "string",
        }),
        defineField({
            name: "cardGridHeadline",
            title: "Card Grid: Headline (Optional)",
            type: "string",
        }),
        defineField({
            name: "cardGridBody",
            title: "Card Grid: Body (Optional)",
            type: "text",
        }),
        defineField({
            name: "whoWeWorkWith",
            title: "Card Grid: Items",
            description: "These will appear as cards in a 2-column grid.",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "whoWeWorkWithCtaLabel",
            title: "Who We Work With: CTA Label (deprecated)",
            description: "Not shown on the site.",
            type: "string",
            initialValue: "Talk to Our Advisor",
            hidden: true,
        }),
        defineField({
            name: "whoWeWorkWithCtaHref",
            title: "Who We Work With: CTA Link",
            type: "string",
            initialValue: "/contact",
            hidden: true,
        }),
        defineField({
            name: "whoWeWorkWithSectionImage",
            title: "Who we work with: section image",
            description:
                "Large visual beside this block on the pillar page (opposite side from Challenges). Placeholder if empty.",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "stats",
            title: "Statistics (Impact Stats)",
            description: "Used for the 'Impact Stats' line under the hero (e.g. $3B+ Revenues / $1B+ Capital / 500+ Mandates).",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "number", title: "Number", type: "string" },
                        { name: "label", title: "Label", type: "string" },
                    ]
                }
            ]
        }),
        defineField({
            name: "servicesEyebrow",
            title: "Services Grid: Eyebrow (Optional)",
            description: "Example: 'OUR GROWTH ADVISORY CAPABILITIES'",
            type: "string",
        }),
        defineField({
            name: "servicesHeadline",
            title: "Services Grid: Headline (Optional)",
            type: "string",
        }),
        defineField({
            name: "servicesSubheadline",
            title: "Services Grid: Intro (Optional)",
            description: "Short paragraph below the services section title.",
            type: "text",
            rows: 3,
        }),

        // ── NEW: Engagement Models ────────────────────────────
        defineField({
            name: "engagementModelsHeadline",
            title: "Engagement Models: Headline",
            type: "string",
            initialValue: "Engagement Models",
        }),
        defineField({
            name: "engagementModelsIntro",
            title: "Engagement Models: Intro (Optional)",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "engagementModels",
            title: "Engagement Models: Bullets",
            type: "array",
            of: [{ type: "string" }],
        }),

        // ── NEW: Engagement Outcomes ──────────────────────────
        defineField({
            name: "engagementOutcomesHeadline",
            title: "Engagement Outcomes: Headline",
            type: "string",
            initialValue: "Engagement Outcomes",
        }),
        defineField({
            name: "engagementOutcomes",
            title: "Engagement Outcomes: Bullets",
            type: "array",
            of: [{ type: "string" }],
        }),

        defineField({
            name: "nextSectionTitle",
            title: "Next Section Heading",
            type: "string",
        }),
        defineField({
            name: "nextSectionBody",
            title: "Next Section Body",
            type: "text",
        }),
        defineField({
            name: "nextSectionCtaLabel",
            title: "Next Section: CTA Button Label",
            type: "string",
            initialValue: "Talk to Our Advisor",
        }),
        defineField({
            name: "nextSectionCtaHref",
            title: "Next Section: CTA Link",
            type: "string",
            initialValue: "/contact",
        }),
        defineField({
            name: "ctaHeadline",
            title: "CTA Banner Headline",
            type: "string",
        }),
        defineField({
            name: "ctaBody",
            title: "CTA Banner Body",
            type: "text",
        }),
        defineField({
            name: "ctaButtonLabel",
            title: "CTA Button Label",
            type: "string",
        }),
        defineField({
            name: "aboutUsSubtitle",
            title: "About Us: Grid Subtitle",
            description: "The subtitle that appears under the Pillar Title in the 'Our Solutions' grid on the About Us page.",
            type: "string",
            initialValue: "Integrated advisory and alignment.",
        }),
        defineField({
            name: "aboutUsServices",
            title: "About Us: Grid Services (4 Cards)",
            description: "Provide exactly 4 services to be displayed in the grid on the About Us page. These are short summaries specifically for that layout.",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", title: "Service Title", type: "string" },
                        { name: "description", title: "Service Description", type: "text" },
                    ]
                }
            ],
            validation: Rule => Rule.max(4),
        }),
    ],
});
