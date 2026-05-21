import { defineType, defineField } from "sanity";

export default defineType({
  name: "consentLog",
  title: "Cookie Consent Logs",
  type: "document",
  fields: [
    defineField({
      name: "timestamp",
      title: "Timestamp",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "anonymizedIp",
      title: "Anonymized IP",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "consent",
      title: "Consent Preferences",
      type: "object",
      fields: [
        { name: "necessary", type: "boolean" },
        { name: "preferences", type: "boolean" },
        { name: "statistics", type: "boolean" },
        { name: "marketing", type: "boolean" },
      ],
      readOnly: true,
    }),
    defineField({
      name: "userAgent",
      title: "User Agent",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "url",
      title: "Source URL",
      type: "url",
      readOnly: true,
    }),
  ],
});
