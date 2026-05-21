import { defineField, defineType } from "sanity";

export default defineType({
    name: "insight-consulting",
    title: "Insights (Consulting)",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
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
            name: "tag",
            title: "Tag / Category",
            type: "string",
            options: {
                list: [
                    { title: "Growth Advisory", value: "Growth Advisory" },
                    { title: "Capital Advisory", value: "Capital Advisory" },
                    { title: "Innovation Advisory", value: "Innovation Advisory" },
                    { title: "PMO", value: "PMO" },
                    { title: "Family Office Setup", value: "Family Office Setup" },
                    { title: "Strategy", value: "Strategy" },
                    { title: "Governance", value: "Governance" },
                ]
            }
        }),
        defineField({
            name: "excerpt",
            title: "Excerpt",
            type: "text",
            description: "Short summary for the index page.",
        }),
        defineField({
            name: "mainImage",
            title: "Main Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: "featured",
            title: "Featured Article?",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "editorsPick",
            title: "Editor's Pick?",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [
                { type: "block" },
                { type: "image" }
            ],
        }),
    ],
});
