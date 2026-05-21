import { defineField, defineType } from "sanity";

export default defineType({
    name: "case-study-consulting",
    title: "Case Study (Consulting)",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            description: "Background image displayed on the carousel card.",
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "pdfFile",
            title: "PDF File",
            type: "file",
            description: "Upload the case study PDF. Visitors will download this file when they click the card.",
            options: {
                accept: ".pdf",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Lower numbers appear first in the carousel.",
            initialValue: 0,
        }),
    ],
    orderings: [
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
    preview: {
        select: {
            title: "title",
            media: "coverImage",
        },
    },
});
