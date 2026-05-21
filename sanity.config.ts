import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'GrowValley Consulting Studio',

  projectId,
  dataset,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      // Filter out the generic 'hero-consulting' template so only our specific presets show up
      ...prev.filter((template) => template.id !== 'hero-consulting'),
      {
        id: 'hero-home-consulting',
        title: 'Hero (Home - Consulting)',
        schemaType: 'hero-consulting',
        value: {
          pageSlug: 'home',
          hasCTA: true,
          eyebrow: 'GROWVALLEY CONSULTING',
          headline: 'Strategy. Structure. Execution.',
          subheadline: 'We help businesses to design, structure, and scale their organisations — with clarity, discipline, and an execution focus.',
          ctaText: 'Talk to Our Advisor',
          ctaHref: '/contact',
        },
      },
      {
        id: 'hero-about-consulting',
        title: 'Hero (About Us - Consulting)',
        schemaType: 'hero-consulting',
        value: {
          pageSlug: 'about',
          hasCTA: true,
          eyebrow: 'ABOUT GROWVALLEY CONSULTING',
          headline: 'We run what your business can\'t afford to get wrong.',
          subheadline: 'GrowValley Consulting integrates strategy, capital, and execution into one accountable advisory system.',
          ctaText: 'Talk to Our Advisor',
          ctaHref: '/contact',
        },
      },
      {
        id: 'hero-growth-advisory-consulting',
        title: 'Hero (Growth Advisory - Consulting)',
        schemaType: 'hero-consulting',
        value: {
          pageSlug: 'growth-advisory',
          hasCTA: true,
          eyebrow: 'GROWTH ADVISORY',
          headline: 'Growth Advisory',
          subheadline: 'Strategy. Performance. Governance. We work with leadership teams to move beyond ad-hoc growth to revenue-driven strategy, strong governance, and execution excellence.',
          ctaText: 'Talk to Our Advisor',
          ctaHref: '/contact',
        },
      },
      {
        id: 'hero-capital-advisory-consulting',
        title: 'Hero (Capital Advisory - Consulting)',
        schemaType: 'hero-consulting',
        value: {
          pageSlug: 'capital-advisory',
          hasCTA: true,
          eyebrow: 'CAPITAL ADVISORY',
          headline: 'Capital Advisory',
          subheadline: 'Structure. Dataroom. Transaction. We work with leadership teams to ensure their businesses are investment-ready, structurally sound, and transaction-prepared before capital is introduced.',
          ctaText: 'Talk to Our Advisor',
          ctaHref: '/contact',
        },
      },
      {
        id: 'hero-innovation-advisory-consulting',
        title: 'Hero (Innovation Advisory - Consulting)',
        schemaType: 'hero-consulting',
        value: {
          pageSlug: 'innovation-advisory',
          hasCTA: true,
          eyebrow: 'INNOVATION ADVISORY',
          headline: 'Innovation Advisory',
          subheadline: 'Future. Ventures. Excellence. We work with leadership teams to help their businesses become future-ready and industry leaders through game-changing products, ventures, and innovation programs.',
          ctaText: 'Talk to Our Advisor',
          ctaHref: '/contact',
        },
      },
      {
        id: 'hero-project-advisory-consulting',
        title: 'Hero (Project Advisory - Consulting)',
        schemaType: 'hero-consulting',
        value: {
          pageSlug: 'project-advisory',
          hasCTA: true,
          eyebrow: 'PROJECT ADVISORY',
          headline: 'Project Advisory',
          subheadline:
            'Visibility. Accountability. Delivery. We design and operate enterprise-grade project management systems that give leadership teams full visibility into delivery performance, resource accountability, and program risk across every strategic initiative in the portfolio.',
          ctaText: 'Talk to Our Advisor',
          ctaHref: '/contact',
        },
      },
      {
        id: 'hero-family-office-setup-consulting',
        title: 'Hero (Family Office Advisory - Consulting)',
        schemaType: 'hero-consulting',
        value: {
          pageSlug: 'family-office-advisory',
          hasCTA: true,
          eyebrow: 'FAMILY OFFICE ADVISORY',
          headline: 'Family Office Advisory',
          subheadline: 'Structure. Governance. Generational Discipline. We help families build the governance frameworks, investment operating models, and structural foundations that allow wealth to be managed, preserved, and grown across generations.',
          ctaText: 'Talk to Our Advisor',
          ctaHref: '/contact',
        },
      },
      {
        id: 'hero-expertise-consulting',
        title: 'Hero (Expertise - Consulting)',
        schemaType: 'hero-consulting',
        value: {
          pageSlug: 'expertise',
          hasCTA: true,
          eyebrow: 'OUR TOP EXPERTISE',
          headline: 'Our Top Expertise',
          subheadline: 'Advisory. Execution. Accountability. GrowValley Consulting partners with organisations at critical moments of inflection — when growth is being pursued, capital decisions carry weight, and execution discipline becomes essential.',
          ctaText: 'Talk to Our Advisor',
          ctaHref: '/contact',
        },
      },
      {
        id: 'hero-partner-with-us-consulting',
        title: 'Hero (Partner With Us - Consulting)',
        schemaType: 'hero-consulting',
        value: {
          pageSlug: 'partner-with-us',
          hasCTA: true,
          eyebrow: 'PARTNER WITH US',
          headline: 'Partner With Us',
          subheadline: 'Expertise. Reach. Execution. GrowValley Consulting partners with experts, operators, platforms, and ecosystem builders who share a commitment to execution-led growth and long-term value creation.',
          ctaText: 'Talk to Our Advisor',
          ctaHref: '/contact',
        },
      },
      {
        id: 'hero-careers-consulting',
        title: 'Hero (Careers - Consulting)',
        schemaType: 'hero-consulting',
        value: {
          pageSlug: 'careers',
          hasCTA: true,
          eyebrow: 'CAREERS',
          headline: 'Solve Hard Problems. Build Real Systems. Work That Matters.',
          subheadline: 'GVC works at the intersection of strategy, capital, and execution. Our team operates at the same level as the founders, CFOs, and boards they serve.',
          ctaText: 'View Open Roles',
          ctaHref: '#openings',
        },
      },
      {
        id: 'hero-contact-consulting',
        title: 'Hero (Contact - Consulting)',
        schemaType: 'hero-consulting',
        value: {
          pageSlug: 'contact',
          hasCTA: false,
          eyebrow: 'CONTACT',
          headline: 'Talk to the team that runs the work.',
          subheadline: 'Tell us what you\'re dealing with. We\'ll tell you what needs to happen next.',
        },
      },
    ],
  },

  basePath: '/studio',
});
