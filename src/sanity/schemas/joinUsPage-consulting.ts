import { defineType, defineField } from "sanity";

export default defineType({
  name: "joinUsPage-consulting",
  title: "Join Us / Careers Page (Consulting)",
  type: "document",
  fields: [
    defineField({
      name: "pageKey",
      title: "Page",
      type: "string",
      description: "Which Join Us page this document controls. Consulting only ships Careers.",
      options: {
        list: [
          { title: "Careers", value: "careers" },
        ],
        layout: "radio",
      },
      initialValue: "careers",
      validation: (Rule) => Rule.required(),
    }),

    // ── Hero ──────────────────────────────────────────────
    defineField({
      name: "heroEyebrow",
      title: "Hero: Eyebrow",
      type: "string",
      initialValue: "CAREERS",
    }),
    defineField({
      name: "heroHeadline",
      title: "Hero: Headline",
      type: "string",
      initialValue: "Solve Hard Problems. Build Real Systems. Work That Matters.",
    }),
    defineField({
      name: "heroSubheadline",
      title: "Hero: Subheadline",
      type: "text",
      rows: 3,
      initialValue: "GVC works at the intersection of strategy, capital, and execution. Our team operates at the same level as the founders, CFOs, and boards they serve.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero: Image (Overwrites static path)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImagePath",
      title: "Hero: Static Image Path",
      type: "string",
      initialValue: "/images/join_us.png",
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Hero: CTA Button Label",
      type: "string",
      initialValue: "View Open Roles",
    }),
    defineField({
      name: "heroCtaLink",
      title: "Hero: CTA Button Link",
      type: "string",
      initialValue: "#openings",
    }),

    // ── What Working at GVC Looks Like ─────────────────────
    defineField({
      name: "pullQuote1",
      title: "What Working at GVC Looks Like: Heading",
      type: "string",
      initialValue: "What Working at GVC Looks Like",
    }),
    defineField({
      name: "pullQuote2",
      title: "What Working at GVC Looks Like: Body",
      type: "text",
      rows: 5,
      initialValue: "Our work is direct, demanding, and consequential. Clients engage GVC because the stakes are real: capital is in motion, decisions carry weight, and execution has to deliver. The work is hands-on. You will be in the room, on the program, and accountable for outcomes from the beginning.",
    }),

    // ── What We Look For (Traits) ──────────────────────────
    defineField({
      name: "whoEyebrow",
      title: "Traits Section: Eyebrow",
      type: "string",
      initialValue: "WHAT WE LOOK FOR",
    }),
    defineField({
      name: "whoHeadline",
      title: "Traits Section: Headline",
      type: "string",
      initialValue: "What We Look For",
    }),
    defineField({
      name: "traits",
      title: "Traits Cards",
      description: "The 4 attributes block (Execution / Rigour / Ownership / Commercial).",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Trait Title", type: "string" },
            { name: "description", title: "Trait Description", type: "text", rows: 3 },
          ],
        },
      ],
    }),

    // ── Current Openings ───────────────────────────────────
    defineField({
      name: "ctaEyebrow",
      title: "Openings Section: Eyebrow",
      type: "string",
      initialValue: "CURRENT OPENINGS",
    }),
    defineField({
      name: "ctaHeadline",
      title: "Openings Section: Headline",
      type: "string",
      initialValue: "Current Openings",
    }),
    defineField({
      name: "openings",
      title: "Open Roles",
      description: "List of currently open roles. Leave empty to use the no-openings fallback message.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Role Title", type: "string" },
            { name: "summary", title: "Short Summary", type: "text", rows: 3 },
            { name: "applyLink", title: "Apply Link / Mailto", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "noOpeningsFallback",
      title: "No-Openings Fallback Text",
      type: "text",
      rows: 3,
      initialValue: "No openings that match your profile? Send your CV and a brief note to careers@gv.consulting. We keep strong profiles on file for upcoming mandates.",
    }),
    defineField({
      name: "ctaBody",
      title: "Openings Section: Body (Legacy)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "ctaButtonLabel",
      title: "Openings Section: Button Label",
      type: "string",
      initialValue: "Apply",
    }),
    defineField({
      name: "ctaButtonHref",
      title: "Openings Section: Button Link",
      type: "string",
      initialValue: "mailto:careers@gv.consulting",
    }),
  ],
});
