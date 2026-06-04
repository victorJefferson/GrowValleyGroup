import { defineType, defineField } from "sanity";

export default defineType({
    name: "joinPage-consulting",
    title: "Join Page (Consulting)",
    type: "document",
    fields: [
        defineField({
            name: "heroParagraph1",
            title: "Hero: First Paragraph",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "heroParagraph2",
            title: "Hero: Second Paragraph",
            type: "text",
            rows: 2,
        }),
        defineField({
            name: "heroImage",
            title: "Hero: Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "heroCtaLabel",
            title: "Hero: CTA Label",
            type: "string",
            initialValue: "Start the Conversation",
        }),
        defineField({
            name: "heroCtaLink",
            title: "Hero: CTA Link",
            type: "string",
            initialValue: "/contact",
        }),
        defineField({
            name: "whoHeadline",
            title: "Who We Work With: Headline",
            type: "string",
        }),
        defineField({
            name: "whoIntro",
            title: "Who We Work With: Intro",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "whoFocusLabel",
            title: "Who We Work With: Focus Label",
            type: "string",
        }),
        defineField({
            name: "whoFocusLine",
            title: "Who We Work With: Focus Line",
            type: "string",
        }),
        defineField({
            name: "audienceSections",
            title: "Audience Sections",
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
                                    { title: "Experts", value: "experts" },
                                    { title: "Partners", value: "partners" },
                                    { title: "Investors", value: "investors" },
                                ],
                            },
                        },
                        { name: "title", title: "Title", type: "string" },
                        { name: "tagline", title: "Tagline", type: "string" },
                        { name: "body", title: "Body", type: "text", rows: 5 },
                        { name: "ctaLabel", title: "CTA Label", type: "string" },
                        { name: "ctaLink", title: "CTA Link", type: "string" },
                    ],
                    preview: {
                        select: { title: "title", subtitle: "tagline" },
                    },
                },
            ],
        }),
        defineField({
            name: "whyHeadline",
            title: "Why GrowValley: Headline",
            type: "string",
        }),
        defineField({
            name: "whyIntro",
            title: "Why GrowValley: Intro",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "whyBullets",
            title: "Why GrowValley: Bullets",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "whyClosing",
            title: "Why GrowValley: Closing Line",
            type: "text",
            rows: 2,
        }),
        defineField({
            name: "closingHeadline",
            title: "Closing: Headline",
            type: "string",
        }),
        defineField({
            name: "closingBody",
            title: "Closing: Body",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "closingCtaLabel",
            title: "Closing: CTA Label",
            type: "string",
            initialValue: "Contact GrowValley",
        }),
        defineField({
            name: "closingCtaLink",
            title: "Closing: CTA Link",
            type: "string",
            initialValue: "/contact",
        }),
    ],
});
