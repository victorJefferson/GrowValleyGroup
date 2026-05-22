import { defineField, defineType } from "sanity";

export default defineType({
    name: "leadership-consulting",
    title: "Leadership (Consulting)",
    type: "document",
    initialValue: {
        eyebrow: "OUR LEADERSHIP",
        name: "GrowValley Group Leadership",
        title: "Strategy. Capital. Execution.",
        bio: "Our leadership team brings decades of experience in strategy, capital advisory, innovation programs, and family office structuring across the Middle East and international markets.",
    },
    fields: [
        defineField({
            name: "eyebrow",
            title: "Eyebrow",
            type: "string",
        }),
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: "linkedinUrl",
            title: "LinkedIn profile URL",
            description: "Optional. When set, the card on the Leadership page links to this profile.",
            type: "url",
        }),
        defineField({
            name: "title",
            title: "Job Title",
            type: "string",
        }),
        defineField({
            name: "bio",
            title: "Biography",
            type: "text",
        }),
        defineField({
            name: "image",
            title: "Profile Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "stats",
            title: "Key Stats",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "value", title: "Value", type: "string" },
                        { name: "label", title: "Label", type: "string" },
                    ]
                }
            ]
        }),
    ],
});
