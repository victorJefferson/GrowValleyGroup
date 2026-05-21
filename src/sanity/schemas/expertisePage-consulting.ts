import { defineType, defineField } from "sanity";

export default defineType({
    name: "expertisePage-consulting",
    title: "Expertise Page (Consulting)",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Document Title",
            type: "string",
            initialValue: "Expertise Page Content",
            hidden: true,
        }),

        // ── Hero ──────────────────────────────────────────────
        defineField({
            name: "heroEyebrow",
            title: "Hero: Eyebrow",
            type: "string",
            initialValue: "OUR TOP EXPERTISE",
        }),
        defineField({
            name: "heroHeadline",
            title: "Hero: Headline",
            type: "string",
            initialValue: "Our Top Expertise",
        }),
        defineField({
            name: "heroAccent",
            title: "Hero: Accent Tagline",
            description: "Short tagline below the headline (e.g. 'Advisory. Execution. Accountability.').",
            type: "string",
            initialValue: "Advisory. Execution. Accountability.",
        }),
        defineField({
            name: "heroSubheadline",
            title: "Hero: Subheadline",
            type: "text",
            rows: 3,
            initialValue: "GrowValley Group partners with organisations at critical moments of inflection — when growth is being pursued, capital decisions carry weight, and execution discipline becomes essential.",
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

        // ── Impact Stats ──────────────────────────────────────
        defineField({
            name: "impactStatsHeadline",
            title: "Impact Stats: Headline (Optional)",
            type: "string",
        }),
        defineField({
            name: "impactStats",
            title: "Impact Stats",
            description: "Inline impact metrics rendered under the hero. Three to four items recommended.",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "prefix", title: "Prefix", type: "string" },
                        { name: "number", title: "Number", type: "string" },
                        { name: "suffix", title: "Suffix", type: "string" },
                        { name: "label", title: "Label", type: "string" },
                    ],
                    preview: {
                        select: { prefix: "prefix", number: "number", suffix: "suffix", label: "label" },
                        prepare({ prefix, number, suffix, label }) {
                            return {
                                title: `${prefix || ""}${number || ""}${suffix || ""}`,
                                subtitle: label,
                            };
                        },
                    },
                },
            ],
        }),

        // ── Expertise Areas ───────────────────────────────────
        defineField({
            name: "expertiseAreasEyebrow",
            title: "Expertise Areas: Eyebrow (Optional)",
            type: "string",
        }),
        defineField({
            name: "expertiseAreas",
            title: "Expertise Areas",
            description: "Render as cards/sections. Each area has a title, narrative body, typical outcomes, and CTA.",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", title: "Area Title", type: "string" },
                        { name: "body", title: "Area Body", type: "text", rows: 4 },
                        {
                            name: "outcomes",
                            title: "Typical Outcomes (Bullets)",
                            type: "array",
                            of: [{ type: "string" }],
                        },
                        { name: "ctaLabel", title: "CTA Label", type: "string", initialValue: "Talk to Our Advisor" },
                        { name: "ctaLink", title: "CTA Link", type: "string", initialValue: "/contact" },
                    ],
                    preview: {
                        select: { title: "title" },
                    },
                },
            ],
        }),

        // ── How We Engage ─────────────────────────────────────
        defineField({
            name: "howWeEngageHeadline",
            title: "How We Engage: Headline",
            type: "string",
            initialValue: "How We Engage",
        }),
        defineField({
            name: "howWeEngageBody",
            title: "How We Engage: Body",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "engagementPrinciples",
            title: "Engagement Principles",
            description: "The numbered principles (e.g. Stage-specific / Outcome-driven / Integrated).",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "title", title: "Principle Title", type: "string" },
                        { name: "description", title: "Principle Description", type: "text", rows: 2 },
                    ],
                },
            ],
        }),
        defineField({
            name: "howWeEngageClosing",
            title: "How We Engage: Closing Paragraph",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "howWeEngageCtaLabel",
            title: "How We Engage: CTA Button Label",
            type: "string",
            initialValue: "Talk to Our Advisor",
        }),
        defineField({
            name: "howWeEngageCtaLink",
            title: "How We Engage: CTA Button Link",
            type: "string",
            initialValue: "/contact",
        }),

        // ── The GVC Difference (Closing) ──────────────────────
        defineField({
            name: "differentiatorHeadline",
            title: "The GVC Difference: Headline",
            type: "string",
            initialValue: "The GrowValley Group Difference",
        }),
        defineField({
            name: "differentiatorBody",
            title: "The GVC Difference: Body",
            type: "text",
            rows: 5,
        }),
        defineField({
            name: "differentiatorCtaLabel",
            title: "The GVC Difference: CTA Button Label",
            type: "string",
            initialValue: "Talk to Our Advisor",
        }),
        defineField({
            name: "differentiatorCtaLink",
            title: "The GVC Difference: CTA Button Link",
            type: "string",
            initialValue: "/contact",
        }),
    ],
});
