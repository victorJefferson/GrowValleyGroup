import { defineType, defineField } from "sanity";

export default defineType({
    name: "partnerPage-consulting",
    title: "Partner With Us Pages (Consulting)",
    type: "document",
    fields: [
        defineField({
            name: "pageKey",
            title: "Page",
            type: "string",
            description: "Which Partner With Us page this document controls.",
            options: {
                list: [
                    { title: "Landing (Hub)", value: "landing" },
                    { title: "Expert Partners", value: "expert" },
                    { title: "Technology Partners", value: "technology" },
                    { title: "Business Partners", value: "business" },
                    { title: "Media Partners", value: "media" },
                ],
                layout: "radio",
            },
            validation: (Rule) => Rule.required(),
        }),

        // ── Hero ──────────────────────────────────────────────
        defineField({
            name: "heroEyebrow",
            title: "Hero: Eyebrow",
            type: "string",
        }),
        defineField({
            name: "heroHeadline",
            title: "Hero: Headline",
            type: "string",
        }),
        defineField({
            name: "heroAccent",
            title: "Hero: Accent Tagline",
            description: "Short tagline below the headline (e.g. 'Expertise. Reach. Execution.').",
            type: "string",
        }),
        defineField({
            name: "heroSubheadline",
            title: "Hero: Subheadline",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "heroImage",
            title: "Hero: Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "heroCtaLabel",
            title: "Hero: CTA Button Label",
            type: "string",
            initialValue: "Talk to Our Advisor",
        }),
        defineField({
            name: "heroCtaLink",
            title: "Hero: CTA Button Link",
            type: "string",
            initialValue: "/contact",
        }),

        // ── Why Partner With GVC (Landing only) ───────────────
        defineField({
            name: "whyHeadline",
            title: "Why Partner: Headline",
            type: "string",
            hidden: ({ document }) => document?.pageKey !== "landing",
        }),
        defineField({
            name: "whyBody",
            title: "Why Partner: Body",
            type: "text",
            rows: 5,
            hidden: ({ document }) => document?.pageKey !== "landing",
        }),
        defineField({
            name: "whySectionImage",
            title: "Why Partner: Section Image",
            description: "Visual shown beside the Why Partner copy on the landing page.",
            type: "image",
            options: { hotspot: true },
            hidden: ({ document }) => document?.pageKey !== "landing",
        }),
        defineField({
            name: "whyAccessHeadline",
            title: "Why Partner: 'What partners gain access to' Headline",
            type: "string",
            initialValue: "What partners gain access to",
            hidden: ({ document }) => document?.pageKey !== "landing",
        }),
        defineField({
            name: "whyAccessPoints",
            title: "Why Partner: 'What partners gain access to' Bullets",
            type: "array",
            of: [{ type: "string" }],
            hidden: ({ document }) => document?.pageKey !== "landing",
        }),

        // ── Partner Types (Landing only) ──────────────────────
        defineField({
            name: "partnerTypes",
            title: "Partner Types",
            description: "Cards rendered on the landing page — one per partner type (Expert / Technology / Business / Media).",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "key",
                            title: "Key",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Expert", value: "expert" },
                                    { title: "Technology", value: "technology" },
                                    { title: "Business", value: "business" },
                                    { title: "Media", value: "media" },
                                ],
                            },
                        },
                        { name: "title", title: "Title", type: "string" },
                        { name: "tagline", title: "Tagline", type: "string" },
                        { name: "body", title: "Body Paragraph", type: "text", rows: 3 },
                        {
                            name: "whoForHeadline",
                            title: "Who This Is For: Heading",
                            type: "string",
                            initialValue: "Who this is for",
                        },
                        {
                            name: "whoFor",
                            title: "Who This Is For: Bullets",
                            type: "array",
                            of: [{ type: "string" }],
                        },
                        {
                            name: "howEngageHeadline",
                            title: "How We Engage: Heading",
                            type: "string",
                            initialValue: "How we engage",
                        },
                        {
                            name: "howEngage",
                            title: "How We Engage: Bullets",
                            type: "array",
                            of: [{ type: "string" }],
                        },
                        {
                            name: "whatGainHeadline",
                            title: "What You Gain: Heading",
                            type: "string",
                            initialValue: "What you gain",
                        },
                        {
                            name: "whatGain",
                            title: "What You Gain: Bullets",
                            type: "array",
                            of: [{ type: "string" }],
                        },
                        { name: "ctaLabel", title: "CTA Label", type: "string" },
                        { name: "ctaLink", title: "CTA Link", type: "string" },
                    ],
                    preview: {
                        select: { title: "title", subtitle: "tagline" },
                    },
                },
            ],
            hidden: ({ document }) => document?.pageKey !== "landing",
        }),

        // ── Sub-page narrative (per partner type) ─────────────
        defineField({
            name: "tagline",
            title: "Sub-page: Tagline (Optional)",
            type: "string",
            hidden: ({ document }) => document?.pageKey === "landing",
        }),
        defineField({
            name: "narrativeBody",
            title: "Sub-page: Narrative Body",
            type: "text",
            rows: 6,
            hidden: ({ document }) => document?.pageKey === "landing",
        }),
        defineField({
            name: "whoForHeadline",
            title: "Sub-page: Who This Is For Heading",
            type: "string",
            initialValue: "Who this is for",
            hidden: ({ document }) => document?.pageKey === "landing",
        }),
        defineField({
            name: "whoFor",
            title: "Sub-page: Who This Is For Bullets",
            type: "array",
            of: [{ type: "string" }],
            hidden: ({ document }) => document?.pageKey === "landing",
        }),
        defineField({
            name: "howEngageHeadline",
            title: "Sub-page: How We Engage Heading",
            type: "string",
            initialValue: "How we engage",
            hidden: ({ document }) => document?.pageKey === "landing",
        }),
        defineField({
            name: "howEngage",
            title: "Sub-page: How We Engage Bullets",
            type: "array",
            of: [{ type: "string" }],
            hidden: ({ document }) => document?.pageKey === "landing",
        }),
        defineField({
            name: "whatGainHeadline",
            title: "Sub-page: What You Gain Heading",
            type: "string",
            initialValue: "What you gain",
            hidden: ({ document }) => document?.pageKey === "landing",
        }),
        defineField({
            name: "whatGain",
            title: "Sub-page: What You Gain Bullets",
            type: "array",
            of: [{ type: "string" }],
            hidden: ({ document }) => document?.pageKey === "landing",
        }),

        // ── Closing CTA Section ───────────────────────────────
        defineField({
            name: "closingHeadline",
            title: "Closing: Headline",
            type: "string",
            initialValue: "Let's Build Together.",
        }),
        defineField({
            name: "closingBody",
            title: "Closing: Body",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "closingCtaLabel",
            title: "Closing: CTA Button Label",
            type: "string",
            initialValue: "Talk to Our Advisor",
        }),
        defineField({
            name: "closingCtaLink",
            title: "Closing: CTA Button Link",
            type: "string",
            initialValue: "/contact",
        }),
    ],
});
