import { defineField, defineType } from "sanity";
import { SOLUTIONS_HUB_FALLBACK } from "../../config/homepageContent.defaults";

export default defineType({
    name: "solutions-consulting",
    title: "Solutions / Capability Pillars (Consulting)",
    type: "document",
    initialValue: {
        ...SOLUTIONS_HUB_FALLBACK,
        items: [
            {
                id: "growth-advisory",
                title: "Growth Advisory",
                tagline: "Strengthening to maximize revenues.",
                body: "We help established businesses to increase revenues with strategy and systems to improve products, process, and performance, and governance – creating a strong foundation for scale.",
                subtitle:
                    "Strengthening to maximise revenue and performance. We help established businesses to increase revenues with strategy and systems to improve products, process, performance, and governance — creating a strong foundation for scale.",
                howNeedsMet:
                    "Strategy, structuring, optimisation, scaling systems – engineered to scale with revenues.",
                ctaPrompt: "Discuss Your Growth Priorities Today.",
                href: "/our-capabilities/growth-advisory",
            },
            {
                id: "capital-advisory",
                title: "Capital Advisory",
                tagline: "Strengthening to raise capital.",
                body: "We prepare businesses to attract, structure, and deploy capital intelligently by building investment readiness, valuation defensibility, and transaction preparedness.",
                subtitle:
                    "Strengthening to raise and deploy capital. We prepare businesses to attract, structure, and deploy capital intelligently by building investment readiness, valuation defensibility, and transaction preparedness.",
                howNeedsMet:
                    "Strategy, investment readiness, legal library, compliance – engineered to scale with capital.",
                ctaPrompt: "Discuss Your Capital Priorities Today.",
                href: "/our-capabilities/capital-advisory",
            },
            {
                id: "innovation-advisory",
                title: "Innovation Advisory",
                tagline: "Strengthening to become an industry leader.",
                body: "We design and build innovation engines to build the next-gen products and ventures through structured venture-building models to become industry leaders.",
                subtitle:
                    "Strengthening to become an industry leader. We design and build innovation engines through structured venture-building models and venture studios to create next-generation products and businesses.",
                howNeedsMet:
                    "Strategy, research, product development, startup building – engineered to scale with industry domination.",
                ctaPrompt: "Discuss Your Innovation Priorities Today.",
                href: "/our-capabilities/innovation-advisory",
            },
            {
                id: "pmo",
                title: "PMO",
                tagline: "Strengthening to deliver complex programs.",
                body: "We design and operate enterprise-grade Project Management Offices so leadership retains full visibility into delivery performance, accountability, and portfolio risk.",
                subtitle:
                    "Driving execution discipline across complex transformation programs. We design and operate enterprise-grade Project Management Offices that give leadership teams full visibility into delivery performance, accountability, and risk across every program in the portfolio.",
                howNeedsMet:
                    "Operating cadence, PMO tooling, accountability systems – engineered to scale with certainty of delivery.",
                ctaPrompt: "Discuss Your PMO Priorities Today.",
                href: "/our-capabilities/pmo",
            },
            {
                id: "family-office-advisory",
                title: "Family Office Advisory",
                tagline: "Structuring governance for enduring wealth.",
                body: "We help families build the governance frameworks, investment operating models, and structural foundations that allow wealth to be managed, preserved, and grown across generations.",
                subtitle:
                    "Structuring, governing, and managing family wealth for the long term. We help families build the governance frameworks, investment operating models, and structural foundations that allow wealth to be managed, preserved, and grown across generations.",
                howNeedsMet:
                    "Structure, mandates, succession alignment – engineered for multi-generational governance.",
                ctaPrompt: "Discuss Family Office Advisory Today.",
                href: "/our-capabilities/family-office-advisory",
            },
        ],
    },
    fields: [
        defineField({
            name: "headline",
            title: "Headline (ecosystem title)",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Intro paragraph",
            type: "text",
        }),
        defineField({
            name: "capabilitiesLeadIn",
            title: "Transition line before pillars",
            description: 'Optional line prefixed with “— ” for the pillar lead-in sentence.',
            type: "string",
        }),
        defineField({
            name: "items",
            title: "Capability pillars",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({
                            name: "id",
                            title: "ID",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: "subtitle",
                            title: "Legacy subtitle",
                            description: "Backward compatibility fallback when tagline/body omitted.",
                            type: "text",
                        }),
                        defineField({
                            name: "tagline",
                            title: "Tagline under title",
                            type: "string",
                        }),
                        defineField({
                            name: "body",
                            title: "Body copy",
                            description: "Left column narrative.",
                            type: "text",
                        }),
                        defineField({
                            name: "howNeedsMet",
                            title: "How needs are met card",
                            description: "Italic-feel positioning copy for the split card.",
                            type: "text",
                        }),
                        defineField({
                            name: "ctaPrompt",
                            title: "CTA headline",
                            description: 'Line above “Talk to our Advisor”.',
                            type: "string",
                        }),
                        defineField({
                            name: "href",
                            title: "Learn more deep link",
                            type: "string",
                        }),
                    ],
                },
            ],
        }),
    ],
});
