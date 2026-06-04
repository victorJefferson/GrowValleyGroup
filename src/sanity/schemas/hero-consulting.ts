import { defineField, defineType } from "sanity";
import {
    ADVISOR_LABEL,
    HERO_FALLBACK_HOME,
    STACKED_LINES_FALLBACK_HOME,
    TRUST_BAR_FALLBACK,
} from "../../config/homepageContent.defaults";
import { HeroPageSlugInput } from "../components/HeroPageSlugInput";
import { isHeroPageSlug } from "../lib/heroPageSlugs";

const homeHeroSeedLines = STACKED_LINES_FALLBACK_HOME.map((line) => ({
    text: line.text,
    muted: line.muted,
}));

export default defineType({
    name: "hero-consulting",
    title: "Page Heroes (Consulting)",
    type: "document",
    initialValue: {
        pageSlug: "home",
        immersionMode: true,
        stackedLines: homeHeroSeedLines,
        trustBarText: TRUST_BAR_FALLBACK,
        hasCTA: HERO_FALLBACK_HOME.hasCTA,
        eyebrow: HERO_FALLBACK_HOME.eyebrow,
        headline: HERO_FALLBACK_HOME.headline,
        subheadline: HERO_FALLBACK_HOME.subheadline,
        ctaText: ADVISOR_LABEL,
        ctaHref: HERO_FALLBACK_HOME.ctaHref,
    },
    fields: [
        defineField({
            name: "pageSlug",
            title: "Page Identifier (Slug)",
            type: "string",
            description: "Select the page this hero belongs to.",
            components: {
                input: HeroPageSlugInput,
            },
            validation: (Rule) =>
                Rule.required().custom((value) => {
                    if (!value || isHeroPageSlug(value)) {
                        return true;
                    }
                    return "Choose a page from the dropdown.";
                }),
        }),
        defineField({
            name: "eyebrow",
            title: "Eyebrow",
            type: "string",
        }),
        defineField({
            name: "headline",
            title: "Headline",
            description: "Used when Immersive (stacked) hero is disabled. When stacked lines exist, headline is fallback only.",
            type: "string",
        }),
        defineField({
            name: "immersionMode",
            title: "Immersive stacked hero",
            description: "Dark cinematic hero with oversized stacked lines (e.g. Growth / Capital / Innovation) and ambient blobs instead of a photo.",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "stackedLines",
            title: "Stacked hero lines",
            description: "Each line renders as oversized type. Toggle “Muted row” on the final line when it should appear softer.",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "text", title: "Line text", type: "string" },
                        { name: "muted", title: "Muted row styling", type: "boolean", initialValue: false },
                    ],
                    preview: {
                        select: { text: "text", muted: "muted" },
                        prepare({ text, muted }) {
                            return { title: text || "(empty)", subtitle: muted ? "Muted" : "Default" };
                        },
                    },
                },
            ],
            hidden: ({ document }) => document?.immersionMode !== true,
        }),
        defineField({
            name: "trustBarText",
            title: "Trust bar caption",
            description:
                "Optional line anchored to the hero bottom (full-height heroes). Falls back to site settings when blank.",
            type: "string",
        }),
        defineField({
            name: "subheadline",
            title: "Subheadline",
            description: "Supporting copy with vertical accent rail (immersive heroes) or standard hero paragraph.",
            type: "text",
        }),
        defineField({
            name: "hasCTA",
            title: "Include CTA Button?",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "ctaText",
            title: "CTA Button Text",
            type: "string",
            hidden: ({ document }) => !document?.hasCTA,
        }),
        defineField({
            name: "ctaHref",
            title: "CTA Button Link",
            type: "string",
            hidden: ({ document }) => !document?.hasCTA,
        }),
        defineField({
            name: "image",
            title: "Hero Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
    ],
});
