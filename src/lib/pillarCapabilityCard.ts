/** Placeholder images when `pillarLandingImage` is not set in CMS (rotates by card index). */
export const PILLAR_CAPABILITY_IMAGE_FALLBACKS = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1400&h=900",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400&h=900",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1400&h=900",
  "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1400&h=900",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1400&h=900",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1400&h=900",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1400&h=900",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1400&h=900",
] as const;

export type PillarCapabilityLayout = "splitImageLeft" | "splitImageRight";

/** Alternate image left / image right only (no stacked top–bottom layouts). */
export function getPillarCapabilityLayout(index: number): PillarCapabilityLayout {
  return index % 2 === 0 ? "splitImageLeft" : "splitImageRight";
}

/** Pillar landing sections (Challenges / Who we work with) — use distinct fallback slots when CMS image empty. */
export function resolvePillarSectionImageUrl(
  cmsImage: unknown,
  fallbackSlotIndex: number,
  urlFor: (source: unknown) => any
): string {
  const img = cmsImage as { asset?: unknown } | undefined;
  if (img?.asset) {
    try {
      return urlFor(img).width(1400).height(900).fit("crop").url();
    } catch {
      /* fallback */
    }
  }
  const len = PILLAR_CAPABILITY_IMAGE_FALLBACKS.length;
  const i = ((fallbackSlotIndex % len) + len) % len;
  return PILLAR_CAPABILITY_IMAGE_FALLBACKS[i];
}

export function resolvePillarCapabilityImageUrl(
  service: { pillarLandingImage?: unknown },
  index: number,
  urlFor: (source: unknown) => any
): string {
  const img = service?.pillarLandingImage as { asset?: unknown } | undefined;
  if (img?.asset) {
    try {
      return urlFor(img).width(1400).height(900).fit("crop").url();
    } catch {
      /* fallback */
    }
  }
  return PILLAR_CAPABILITY_IMAGE_FALLBACKS[index % PILLAR_CAPABILITY_IMAGE_FALLBACKS.length];
}
