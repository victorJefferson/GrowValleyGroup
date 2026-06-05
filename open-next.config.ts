import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Serve prerendered ISR/SSG output from static assets when possible (near-zero CPU).
 * Required on Workers Free (10ms CPU/request); avoids 1102 after prefetch traffic.
 * Do not use export const revalidate — ISR requires a DO queue (R2/KV cache).
 * Content updates: redeploy after CMS changes.
 */
export default defineCloudflareConfig({
	incrementalCache: staticAssetsIncrementalCache,
	enableCacheInterception: true,
});
