import { defineType, defineField } from "sanity";

export default defineType({
  name: "capabilitiesPage-consulting",
  title: "Capabilities / Companies Page (Consulting)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Capabilities Page Content",
      hidden: true,
    }),
    defineField({
      name: "introHeading",
      title: "Introduction / Positioning Heading",
      type: "string",
    }),
    defineField({
      name: "introParagraph",
      title: "Introduction / Positioning Paragraph",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "darkBlockStatement",
      title: "Dark Block: Bold Statement",
      description: "Short bold headline rendered inside the dark positioning block.",
      type: "string",
    }),
    defineField({
      name: "darkBlockBody",
      title: "Dark Block: Supporting Copy",
      description: "Supporting body text inside the dark positioning block.",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "statsStrip",
      title: "Stats Strip Items",
      description: "Each string is one stat/label displayed in the strip (e.g. '5 Specialized companies').",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "bottomCtaHeadline",
      title: "Bottom CTA Banner Headline",
      type: "string",
    }),
    defineField({
      name: "bottomCtaButtonText",
      title: "Bottom CTA Banner Button Text",
      type: "string",
    }),
    defineField({
      name: "bottomCtaButtonLink",
      title: "Bottom CTA Banner Button Link",
      type: "string",
    }),
  ],
});
