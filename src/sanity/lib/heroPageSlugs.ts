/** Single source of truth for hero-consulting pageSlug (sync with scripts/seed-hero-page-slug-validation-fix.mjs). */
export const HERO_PAGE_SLUG_OPTIONS = [
    { title: "Home (/)", value: "home" },
    { title: "Companies (/companies)", value: "companies" },
    { title: "About Us (/about-us)", value: "about-us" },
    { title: "Leadership (/about-us/leadership)", value: "leadership" },
    { title: "Team (/about-us/team)", value: "team" },
    { title: "GrowValley Advisory (/companies/advisory)", value: "advisory" },
    { title: "GrowValley Capital (/companies/capital)", value: "capital" },
    { title: "GrowValley Ventures (/companies/ventures)", value: "ventures" },
    { title: "GrowValley Works (/companies/works)", value: "works" },
    { title: "GrowValley Studios (/companies/studios)", value: "studios" },
    { title: "Contact (/contact)", value: "contact" },
    { title: "Join (/join)", value: "join" },
    { title: "Capabilities hub (/our-capabilities)", value: "capabilities" },
    { title: "Growth Advisory (/our-capabilities/growth-advisory)", value: "growth-advisory" },
    { title: "Capital Advisory (/our-capabilities/capital-advisory)", value: "capital-advisory" },
    { title: "Innovation Advisory (/our-capabilities/innovation-advisory)", value: "innovation-advisory" },
    { title: "Project Advisory (/our-capabilities/project-advisory)", value: "project-advisory" },
    { title: "Family Office Advisory (/our-capabilities/family-office-advisory)", value: "family-office-advisory" },
    { title: "Expertise (/expertise)", value: "expertise" },
    { title: "Partner With Us (/partner-with-us)", value: "partner-with-us" },
    { title: "Careers (/join-us/careers)", value: "careers" },
] as const;

export type HeroPageSlug = (typeof HERO_PAGE_SLUG_OPTIONS)[number]["value"];

export const HERO_PAGE_SLUG_VALUES = new Set<string>(
    HERO_PAGE_SLUG_OPTIONS.map((option) => option.value),
);

export function isHeroPageSlug(value: unknown): value is HeroPageSlug {
    return typeof value === "string" && HERO_PAGE_SLUG_VALUES.has(value.trim());
}

export function heroPageSlugTitle(value: string | undefined): string | undefined {
    if (!value) return undefined;
    return HERO_PAGE_SLUG_OPTIONS.find((option) => option.value === value)?.title ?? value;
}
