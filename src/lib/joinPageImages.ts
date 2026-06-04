const unsplash = (id: string) =>
    `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1400&h=900`;

/** Default Unsplash art direction for Join page sections (keyed by audience type). */
export const JOIN_PAGE_IMAGES = {
    who: unsplash("photo-1522071820081-009f0129c71c"),
    experts: unsplash("photo-1542744173-8e7e53415bb0"),
    partners: unsplash("photo-1521737711867-e3b97375f902"),
    investors: unsplash("photo-1611974789855-9c2a0a7236a3"),
    why: unsplash("photo-1560179707-f14e90ef3623"),
    closing: unsplash("photo-1504384308090-c894fdcc538d"),
} as const;

export type JoinAudienceKey = keyof Pick<
    typeof JOIN_PAGE_IMAGES,
    "experts" | "partners" | "investors"
>;

export function getJoinAudienceImage(key?: string, index = 0): string {
    const normalized = key?.toLowerCase() as JoinAudienceKey | undefined;
    if (normalized && normalized in JOIN_PAGE_IMAGES) {
        return JOIN_PAGE_IMAGES[normalized];
    }
    const fallbacks = [
        JOIN_PAGE_IMAGES.experts,
        JOIN_PAGE_IMAGES.partners,
        JOIN_PAGE_IMAGES.investors,
    ];
    return fallbacks[index % fallbacks.length];
}

export function getJoinSplitLayout(index: number): "imageLeft" | "imageRight" {
    return index % 2 === 0 ? "imageLeft" : "imageRight";
}
