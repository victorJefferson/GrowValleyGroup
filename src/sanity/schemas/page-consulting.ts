import { defineType, defineField } from "sanity";

export default defineType({
  name: "page-consulting",
  title: "Pages (Consulting, Generic)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroEyebrow",
      title: "Hero Eyebrow",
      type: "string",
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
      rows: 3,
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote Text",
      description: "The large highlighted text section below the hero.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "splitEyebrow",
      title: "Split Section Eyebrow",
      type: "string",
    }),
    defineField({
      name: "splitHeading",
      title: "Split Section Heading",
      type: "string",
    }),
    defineField({
      name: "splitBody",
      title: "Split Section Body",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "ctaEyebrow",
      title: "CTA Panel Eyebrow",
      type: "string",
    }),
    defineField({
      name: "ctaHeading",
      title: "CTA Panel Heading",
      type: "string",
    }),
    defineField({
      name: "ctaBody",
      title: "CTA Panel Body Text",
      type: "text",
      rows: 3,
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
