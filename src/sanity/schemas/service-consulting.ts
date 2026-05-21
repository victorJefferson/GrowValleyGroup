import { defineField, defineType } from "sanity";
import { iconList } from "../lib/iconList";

export default defineType({
    name: "service-consulting",
    title: "Services (Consulting)",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Service Title",
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
            name: "pillar",
            title: "Pillar",
            type: "reference",
            to: [{ type: "pillar-consulting" }],
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Card Description",
            description: "The short summary that appears on the Service Card (Pillar page).",
            type: "text",
        }),
        defineField({
            name: "pillarLandingTagline",
            title: "Pillar landing: tagline",
            description:
                "One line under the title on the pillar landing (e.g. “Defining where to play, how to win…”). Optional.",
            type: "string",
        }),
        defineField({
            name: "pillarLandingBullets",
            title: "Pillar landing: capability bullets",
            description: "Bullet list shown on the pillar landing card for this service.",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "pillarLandingOutcome",
            title: "Pillar landing: client outcome",
            description: "The “Client outcome: …” line on the pillar landing card.",
            type: "text",
            rows: 2,
        }),
        defineField({
            name: "pillarLandingImage",
            title: "Pillar landing: image",
            description:
                "Optional image for this capability block on the pillar page. If empty, the site uses a rotating placeholder.",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "iconName",
            title: "Card Icon Name",
            description: "The icon that appears at the top of the Service Card.",
            type: "string",
            options: { list: iconList },
        }),
        defineField({
            name: "heroHeadline",
            title: "Hero Headline",
            type: "string",
        }),
        defineField({
            name: "heroImage",
            title: "Hero Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "heroSubheadline",
            title: "Hero Subheadline",
            type: "text",
        }),
        defineField({
            name: "heroCtaLabel",
            title: "Hero CTA Label",
            description: "Defaults to 'Talk to Our Advisor'.",
            type: "string",
        }),
        defineField({
            name: "heroCtaLink",
            title: "Hero CTA Link",
            description: "Where the hero button should go. Defaults to /contact.",
            type: "string",
        }),
        defineField({
            name: "valuePropHeadline",
            title: "Value Prop Headline (How We Work)",
            type: "string",
        }),
        defineField({
            name: "valuePropAccent",
            title: "Value Prop Accent (Italic)",
            type: "string",
        }),
        defineField({
            name: "valuePropBody",
            title: "Value Prop Body",
            type: "text",
        }),
        defineField({
            name: "problemHeadline",
            title: "Problem Headline (Challenges We Solve)",
            type: "string",
        }),
        defineField({
            name: "problemImage",
            title: "Problem Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "problemHighlight",
            title: "Problem Image Overlay Text",
            type: "string",
        }),
        defineField({
            name: "problemBody",
            title: "Problem Body",
            type: "text",
        }),
        defineField({
            name: "problemBullets",
            title: "Problem Bullets",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "problemCtaLabel",
            title: "Problem CTA Label",
            type: "string",
            initialValue: "Talk to Our Advisor",
        }),
        defineField({
            name: "problemCtaLink",
            title: "Problem CTA Link",
            type: "string",
            initialValue: "/contact",
        }),
        defineField({
            name: "howWeHelpSubtitle",
            title: "How We Help Subtitle",
            type: "string",
        }),
        defineField({
            name: "helpCards",
            title: "Help Cards",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "iconName", title: "Icon Name", type: "string", options: { list: iconList } },
                        { name: "title", title: "Card Title", type: "string" },
                        { name: "desc", title: "Card Description", type: "text" },
                    ]
                }
            ]
        }),
        defineField({
            name: "networkHeadline",
            title: "Network Headline (Optional)",
            type: "string",
        }),
        defineField({
            name: "networkSubheadline",
            title: "Network Subheadline (Optional)",
            type: "text",
        }),
        defineField({
            name: "network",
            title: "Network Cards (Optional)",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "iconName", title: "Icon Name", type: "string", options: { list: iconList } },
                        { name: "title", title: "Card Title", type: "string" },
                        { name: "desc", title: "Card Description", type: "text" },
                    ]
                }
            ]
        }),
        defineField({
            name: "featureEyebrow",
            title: "Feature Eyebrow (What We Do)",
            type: "string",
        }),
        defineField({
            name: "featureHeadline",
            title: "Feature Headline",
            type: "string",
        }),
        defineField({
            name: "featureImage",
            title: "Feature Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "featureBody",
            title: "Feature Body",
            type: "text",
        }),
        defineField({
            name: "featureBullets",
            title: "Feature Bullets",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "featureCtaLabel",
            title: "Feature CTA Label",
            type: "string",
            initialValue: "Talk to Our Advisor",
        }),
        defineField({
            name: "featureCtaLink",
            title: "Feature CTA Link",
            type: "string",
            initialValue: "/contact",
        }),
        defineField({
            name: "stats",
            title: "Statistics",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "num", title: "Number", type: "string" },
                        { name: "desc", title: "Description", type: "string" },
                    ]
                }
            ]
        }),
        defineField({
            name: "featureGridEyebrow",
            title: "Feature Grid: Eyebrow (Optional)",
            description: "Example: 'HOW WE HELP'",
            type: "string",
        }),
        defineField({
            name: "featureGridHeadline",
            title: "Feature Grid: Headline (Optional)",
            type: "string",
        }),
        defineField({
            name: "featureGridBody",
            title: "Feature Grid: Intro Body (Optional)",
            description: "This is the small text that appears below the headline.",
            type: "text",
        }),
        defineField({
            name: "featureGridCards",
            title: "Feature Grid: Cards",
            description: "These will appear as rich cards with icons.",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "featureGridCard",
                    fields: [
                        defineField({ name: "title", title: "Card Title", type: "string" }),
                        defineField({ name: "description", title: "Card Description", type: "text" }),
                        defineField({
                            name: "iconName",
                            title: "Icon",
                            type: "string",
                            options: {
                                list: iconList
                            }
                        }),
                    ]
                }
            ],
        }),
        defineField({
            name: "whatsIncludedHeadline",
            title: "What's Included / Engagement Outcomes Headline",
            description: "Heading rendered above the two-column bullet block at the bottom of the service page. Defaults to 'Engagement Outcomes'.",
            type: "string",
            initialValue: "Engagement Outcomes",
        }),
        defineField({
            name: "whatsIncludedSubtext",
            title: "What's Included Subtext (Optional)",
            type: "text",
            rows: 2,
        }),
        defineField({
            name: "whatsIncludedImage",
            title: "What's Included Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "whatsIncluded",
            title: "What's Included",
            type: "object",
            fields: [
                { name: "column1", title: "Column 1 Bullets", type: "array", of: [{ type: "string" }] },
                { name: "column2", title: "Column 2 Bullets", type: "array", of: [{ type: "string" }] },
            ]
        }),
        defineField({
            name: "ctaHeadline",
            title: "CTA Headline",
            type: "string",
        }),
        defineField({
            name: "ctaBody",
            title: "CTA Body",
            type: "text",
        }),
        defineField({
            name: "ctaButtonLabel",
            title: "CTA Button Label",
            type: "string",
        }),
        defineField({
            name: "ctaButtonLink",
            title: "CTA Button Link",
            type: "string",
        }),
    ],
});
