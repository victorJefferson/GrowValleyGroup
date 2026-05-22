import { defineField, defineType } from "sanity";
import { HOME_WHO_ICON_OPTIONS } from "../../config/homeWhoIcons";

const statMetric = {
  type: "object",
  name: "homeStatMetric",
  fields: [
    defineField({ name: "metricValue", title: "Metric value", type: "string" }),
    defineField({ name: "metricLabel", title: "Metric label", type: "string" }),
    defineField({ name: "supportingLabel", title: "Supporting label", type: "string" }),
  ],
};

const serviceBlock = {
  type: "object",
  name: "homeServiceBlock",
  fields: [
    defineField({ name: "title", title: "Service title", type: "string" }),
    defineField({ name: "shortDescription", title: "Short description", type: "string" }),
    defineField({ name: "supportingCopy", title: "Supporting copy", type: "text", rows: 4 }),
    defineField({
      name: "featureHighlights",
      title: "Feature highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "sideCardEyebrow", title: "Side card eyebrow", type: "string" }),
    defineField({
      name: "sideCardHeadline",
      title: "Side card headline (optional override)",
      description:
        "Shown on the right card only when Short description is empty. Otherwise the site uses Short description for both columns.",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "sideCardCtaText", title: "Side card CTA text", type: "string" }),
    defineField({ name: "sideCardCtaHref", title: "Side card CTA link", type: "string" }),
    defineField({
      name: "pillarHref",
      title: "Pillar page link (optional)",
      description: "Used for “Learn more” on the main column when set.",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }: { title?: string }) => ({ title: title || "Service block" }),
  },
};

export default defineType({
  name: "homePage-consulting",
  title: "Home Page (Consulting)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Document Title",
      type: "string",
      initialValue: "Home Page Content",
      hidden: true,
    }),

    defineField({
      name: "stats",
      title: "Stats / credibility metrics",
      type: "array",
      of: [statMetric],
    }),

    defineField({
      name: "positioningEyebrow",
      title: "Positioning – eyebrow",
      type: "string",
    }),
    defineField({
      name: "positioningHeadline",
      title: "Positioning – headline",
      type: "string",
    }),
    defineField({
      name: "positioningSupportingCopy",
      title: "Positioning – supporting copy",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "painPointCards",
      title: "Positioning – pain point cards",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "positioningStatement",
      title: "Positioning – statement card",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "positioningCtaText",
      title: "Positioning – CTA text",
      type: "string",
    }),
    defineField({
      name: "positioningCtaHref",
      title: "Positioning – CTA link",
      type: "string",
    }),

    defineField({
      name: "ecosystemHeadline",
      title: "Ecosystem – headline",
      type: "string",
    }),
    defineField({
      name: "ecosystemSupportingCopy",
      title: "Ecosystem – supporting copy",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "serviceBlocks",
      title: "Service blocks (split layout)",
      type: "array",
      of: [serviceBlock],
    }),

    defineField({
      name: "whoHeadline",
      title: "Who we work with – headline",
      type: "string",
    }),
    defineField({
      name: "whoSupportingCopy",
      title: "Who we work with – supporting copy",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "whoClientTypes",
      title: "Who we work with – client types",
      type: "array",
      of: [
        {
          type: "object",
          name: "homeWhoClientType",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: HOME_WHO_ICON_OPTIONS.map((o) => ({
                  title: o.title,
                  value: o.value,
                })),
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "icon" },
          },
        },
      ],
    }),
    defineField({
      name: "whoPositioningText",
      title: "Who we work with – positioning card",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "whoCtaText",
      title: "Who we work with – CTA text",
      type: "string",
    }),
    defineField({
      name: "whoCtaHref",
      title: "Who we work with – CTA link",
      type: "string",
    }),

    defineField({
      name: "whyHeadline",
      title: "Why GrowValley – headline",
      type: "string",
    }),
    defineField({
      name: "whySupportingCopy",
      title: "Why GrowValley – supporting copy",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "whyBullets",
      title: "Why GrowValley – value bullets",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "whyClosingStatement",
      title: "Why GrowValley – closing statement",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "whyCtaText",
      title: "Why GrowValley – CTA text",
      type: "string",
    }),
    defineField({
      name: "whyCtaHref",
      title: "Why GrowValley – CTA link",
      type: "string",
    }),

    defineField({
      name: "expertiseHeadline",
      title: "Top expertise – headline",
      type: "string",
    }),
    defineField({
      name: "expertiseSubheadline",
      title: "Top expertise – subheadline",
      type: "string",
    }),
    defineField({
      name: "expertiseLead",
      title: "Top expertise – lead paragraph",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "expertiseItems",
      title: "Top expertise – grid items",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "expertiseClosingStatement",
      title: "Top expertise – closing statement",
      type: "string",
    }),
    defineField({
      name: "expertiseCtaText",
      title: "Top expertise – CTA text",
      type: "string",
    }),
    defineField({
      name: "expertiseCtaHref",
      title: "Top expertise – CTA link",
      type: "string",
    }),

    defineField({
      name: "finaleHeadline",
      title: "Final CTA – headline",
      type: "string",
    }),
    defineField({
      name: "finaleSupportingCopy",
      title: "Final CTA – supporting copy",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "finaleCtaText",
      title: "Final CTA – button text",
      type: "string",
    }),
    defineField({
      name: "finaleCtaHref",
      title: "Final CTA – link",
      type: "string",
    }),
  ],
});
