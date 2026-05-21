import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutUsPage-consulting",
  title: "About Us Page (Consulting)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "About Us Page Content",
      hidden: true,
    }),
    defineField({
      name: "introImage",
      title: "Intro Section Image",
      description: "Image displayed alongside the first narrative section.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "narrativeSections",
      title: "Narrative Sections",
      description: "Ordered narrative blocks rendered down the About Us page (e.g. What GrowValley Is / Built For / Philosophy / Who We Work With / The Long-Term Relationship).",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "eyebrow", title: "Eyebrow (Optional)", type: "string" },
            { name: "heading", title: "Section Heading", type: "string" },
            { name: "body", title: "Section Body", type: "text", rows: 6 },
            defineField({
              name: "sectionImage",
              title: "Section image (optional)",
              description:
                "Optional image for this block. If empty, the site uses a rotating placeholder image.",
              type: "image",
              options: { hotspot: true },
            }),
          ],
          preview: {
            select: { title: "heading", subtitle: "eyebrow", media: "sectionImage" },
          },
        },
      ],
    }),
    defineField({
      name: "subPagesNav",
      title: "Sub-pages Nav Block",
      description: "Links rendered as a sub-page nav block (e.g. Team / Leadership / Capabilities).",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Link Label", type: "string" },
            { name: "href", title: "Link URL", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "ctaHeadline",
      title: "Bottom CTA Banner Headline",
      type: "string",
    }),
    defineField({
      name: "ctaSubline",
      title: "Bottom CTA Banner Subline (Optional)",
      type: "text",
      rows: 2,
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
