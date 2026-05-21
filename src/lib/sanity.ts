import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const client = createClient({
    projectId,
    dataset,
    apiVersion: "2024-03-01",
    // CDN reduces Sanity latency and Worker CPU on cache misses (Free tier: 10ms CPU cap).
    useCdn: process.env.NODE_ENV === "production",
});

const builder = createImageUrlBuilder(client);

/**
 * Helper to generate Sanity image URLs with precise sizing
 * @param source Sanity image document or asset reference
 */
export function urlFor(source: any) {
    return builder.image(source);
}

export const isConfigured = projectId !== "placeholder";
