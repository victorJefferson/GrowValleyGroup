import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';
import { groq } from 'next-sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gv.consulting';

  const staticRoutes = [
    '',
    '/about-us',
    '/about-us/team',
    '/about-us/leadership',
    '/our-capabilities',
    '/our-capabilities/growth-advisory',
    '/our-capabilities/capital-advisory',
    '/our-capabilities/innovation-advisory',
    '/our-capabilities/pmo',
    '/our-capabilities/family-office-advisory',
    '/expertise',
    '/partner-with-us',
    '/partner-with-us/expert',
    '/partner-with-us/technology',
    '/partner-with-us/business',
    '/partner-with-us/media',
    '/insights',
    '/join-us/careers',
    '/contact',
    '/team',
    '/privacy-policy',
    '/terms-of-use',
    '/cookie-policy',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  interface InsightSitemapResult {
    slug: string;
    _updatedAt: string;
  }

  let insightRoutes: MetadataRoute.Sitemap = [];
  try {
    const insights = await client.fetch<InsightSitemapResult[]>(
      groq`*[_type == "insight-consulting" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`
    );
    insightRoutes = insights.map((insight) => ({
      url: `${baseUrl}/insights/${insight.slug}`,
      lastModified: new Date(insight._updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Sitemap insight fetch failed:', error);
  }

  return [...staticRoutes, ...insightRoutes];
}
