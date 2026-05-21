import { defineField, defineType } from "sanity";
import {
    DATA_SECTION_FALLBACK_IMPACT_STATS,
    DATA_SECTION_FALLBACK_META,
    IMPACT_BAND_EYEBROW_FALLBACK,
} from "../../config/homepageContent.defaults";

const dataSectionConsultingSeed = {
    eyebrow: IMPACT_BAND_EYEBROW_FALLBACK,
    headline: DATA_SECTION_FALLBACK_META.headline,
    description: DATA_SECTION_FALLBACK_META.description,
    stats: DATA_SECTION_FALLBACK_IMPACT_STATS.map((item) => ({ ...item })),
};

export default defineType({
    name: "data-section-consulting",
    title: "Data Section (Consulting)",
    type: "document",
    initialValue: dataSectionConsultingSeed,
    fields: [
        defineField({
            name: "eyebrow",
            title: "Section eyebrow",
            description: "Small capped label shown above stats (homepage impact band). Leave empty to omit.",
            type: "string",
        }),
        defineField({
            name: "headline",
            title: "Headline",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "stats",
            title: "Statistics",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "prefix", title: "Prefix (Optional)", type: "string" },
                        {
                            name: "number",
                            title: "Number (Mandatory)",
                            type: "number",
                            validation: Rule => Rule.required()
                        },
                        { name: "suffix", title: "Suffix (Optional)", type: "string" },
                        {
                            name: "midLabel",
                            title: "Emphasis row (below value)",
                            description:
                                "When both this and Descriptor are filled, the statistic shows three lines (value · emphasis · descriptor). Otherwise a single caption line uses Label (or Descriptor / Emphasis alone).",
                            type: "string",
                        },
                        {
                            name: "descriptor",
                            title: "Descriptor (fine print)",
                            description: "Muted supporting line underneath the emphasis row (split mode only).",
                            type: "string",
                        },
                        {
                            name: "label",
                            title: "Label (Mandatory)",
                            type: "string",
                            description: "Single-line caption when mid/descriptor aren't both set; also used in Studio preview.",
                            validation: Rule => Rule.required()
                        },
                    ],
                    preview: {
                        select: {
                            prefix: "prefix",
                            number: "number",
                            suffix: "suffix",
                            label: "label",
                        },
                        prepare({ prefix, number, suffix, label }) {
                            return {
                                title: `${prefix || ''}${number}${suffix || ''}`,
                                subtitle: label,
                            };
                        },
                    },
                },
            ],
            validation: Rule => Rule.required().min(1).max(6),
        }),
    ],
});
