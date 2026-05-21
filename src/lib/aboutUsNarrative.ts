/** Distinct placeholder images when CMS `sectionImage` is empty. */
export const ABOUT_US_SECTION_IMAGE_FALLBACKS = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200&h=800",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200&h=800",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200&h=800",
  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1200&h=800",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200&h=800",
] as const;

export type AboutUsNarrativeLayout =
  | "splitImageRight"
  | "splitImageLeft"
  | "mediaTop"
  | "panelSplit"
  | "stackImageTop";

const LAYOUT_ROTATION: AboutUsNarrativeLayout[] = [
  "splitImageRight",
  "splitImageLeft",
  "mediaTop",
  "panelSplit",
  "stackImageTop",
];

export function getAboutUsNarrativeLayout(index: number): AboutUsNarrativeLayout {
  return LAYOUT_ROTATION[index % LAYOUT_ROTATION.length];
}

export function resolveAboutUsSectionImageUrl(
  section: { sectionImage?: unknown },
  index: number,
  urlFor: (source: unknown) => any
): string {
  const img = section?.sectionImage as { asset?: unknown } | undefined;
  if (img?.asset) {
    try {
      return urlFor(img).width(1400).height(900).fit("crop").url();
    } catch {
      /* use fallback */
    }
  }
  return ABOUT_US_SECTION_IMAGE_FALLBACKS[index % ABOUT_US_SECTION_IMAGE_FALLBACKS.length];
}
