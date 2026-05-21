import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings-consulting",
  title: "Site Settings (Consulting)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      initialValue: "GrowValley Group Settings",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "trustedByLine",
      title: "'Trusted By' Tagline",
      description: "Single line shown under each hero. Example: 'Trusted by leading governments, corporates, and innovators across the region.'",
      type: "string",
      initialValue: "Trusted by leading governments, corporates, and innovators across the region.",
    }),
    defineField({
      name: "newsletterHeading",
      title: "Newsletter: Heading",
      type: "string",
      initialValue: "Subscribe to our newsletter",
    }),
    defineField({
      name: "newsletterPlaceholder",
      title: "Newsletter: Email Placeholder",
      type: "string",
      initialValue: "Enter Email",
    }),
    defineField({
      name: "newsletterSubmitLabel",
      title: "Newsletter: Submit Label",
      type: "string",
      initialValue: "Subscribe",
    }),
    defineField({
      name: "newsletterEndpoint",
      title: "Newsletter: Submit Endpoint (Optional)",
      description: "If provided, the form will POST to this URL. Leave empty to render a non-functional placeholder.",
      type: "string",
    }),
    defineField({
      name: "footerTagline",
      title: "Footer: Tagline",
      type: "string",
      initialValue: "Enabling businesses to reach their highest potential.",
    }),
    defineField({
      name: "footerCopyright",
      title: "Footer: Copyright Line",
      type: "string",
      initialValue: "© 2026 GrowValley Group | A subsidiary of GrowValley Group.",
    }),
    defineField({
      name: "mainNavigation",
      title: "Main Navigation",
      description: "Controls the top mega menu and links.",
      type: "array",
      of: [
        {
          type: "object",
          name: "navGroup",
          title: "Navigation Group or Link",
          fields: [
            defineField({
              name: "name",
              title: "Link Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link URL",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              description: "Optional description text for mega menu items.",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "featuredTitle",
              title: "Featured Card Title",
              description: "Optional: Title for the featured card on the right.",
              type: "string",
            }),
            defineField({
              name: "featuredImage",
              title: "Featured Card Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "featuredLink",
              title: "Featured Card Link",
              type: "string",
            }),
            defineField({
              name: "children",
              title: "Dropdown Links (Sub-menu)",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "subLink",
                  fields: [
                    defineField({
                      name: "name",
                      title: "Link Name",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "href",
                      title: "Link URL",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "description",
                      title: "Description",
                      description: "Description shown under the link in the mega menu.",
                      type: "text",
                      rows: 2,
                    }),
                    defineField({
                      name: "isFeatured",
                      title: "Highlight this link?",
                      description: "If checked, this link will use the brand accent color.",
                      type: "boolean",
                      initialValue: false,
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "footerNavigation",
      title: "Footer Navigation",
      description: "Controls the columns of links in the footer.",
      type: "array",
      of: [
        {
          type: "object",
          name: "footerColumn",
          title: "Footer Column",
          fields: [
            defineField({
              name: "columnTitle",
              title: "Column Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "links",
              title: "Column Links",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "footerLink",
                  fields: [
                    defineField({
                      name: "name",
                      title: "Link Name",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "href",
                      title: "Link URL",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
});
