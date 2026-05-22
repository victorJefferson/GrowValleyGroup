import { groq } from "next-sanity";

export const heroQuery = groq`
  *[_type == "hero-consulting" && pageSlug == $pageSlug][0] {
    eyebrow,
    headline,
    subheadline,
    ctaText,
    ctaHref,
    hasCTA,
    image,
    immersionMode,
    stackedLines[]{ text, muted },
    trustBarText
  }
`;

export const dataSectionQuery = groq`
  *[_type == "data-section-consulting"] | order(_updatedAt desc)[0] {
    eyebrow,
    headline,
    description,
    stats[] {
      prefix,
      number,
      suffix,
      label,
      midLabel,
      descriptor
    }
  }
`;

export const insightsQuery = groq`
  *[_type == "insight-consulting"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    tag,
    excerpt,
    mainImage,
    publishedAt
  }
`;

export const allInsightsQuery = groq`
  *[_type == "insight-consulting"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    tag,
    excerpt,
    mainImage,
    publishedAt
  }
`;

export const insightBySlugQuery = groq`
  *[_type == "insight-consulting" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    tag,
    excerpt,
    mainImage,
    publishedAt,
    content
  }
`;

export const featuredInsightQuery = groq`
  *[_type == "insight-consulting" && featured == true] | order(_updatedAt desc)[0] {
    _id,
    title,
    "slug": slug.current,
    tag,
    excerpt,
    mainImage,
    publishedAt
  }
`;

export const editorsPickQuery = groq`
  *[_type == "insight-consulting" && editorsPick == true] | order(_updatedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    tag,
    excerpt,
    mainImage,
    publishedAt
  }
`;

export const leadershipQuery = groq`
  *[_type == "leadership-consulting"] | order(_createdAt asc) {
    _id,
    name,
    linkedinUrl,
    title,
    bio,
    image,
    stats[] {
      value,
      label
    }
  }
`;

export const teamQuery = groq`
  *[_type == "team-consulting"] | order(_id asc) {
    _id,
    name,
    role,
    image,
    category
  }
`;

export const pillarQuery = groq`
  *[_type == "pillar-consulting" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    heroHeadline,
    heroSubheadline,
    heroImage,
    approachHeadline,
    approachBody,
    challengesHeadline,
    challengesIntro,
    challengesBullets,
    challengesClosing,
    challengesSectionImage,
    howItWorks,
    positioningText,
    cardGridEyebrow,
    cardGridHeadline,
    cardGridBody,
    whoWeWorkWith,
    whoWeWorkWithSectionImage,
    stats,
    servicesEyebrow,
    servicesHeadline,
    servicesSubheadline,
    engagementModelsHeadline,
    engagementModelsIntro,
    engagementModels,
    engagementOutcomesHeadline,
    engagementOutcomes,
    nextSectionTitle,
    nextSectionBody,
    nextSectionCtaLabel,
    nextSectionCtaHref,
    whoWeWorkWithCtaLabel,
    whoWeWorkWithCtaHref,
    ctaHeadline,
    ctaBody,
    ctaButtonLabel,
    "services": *[_type == "service-consulting" && references(^._id)] | order(title asc) {
      title,
      "slug": slug.current,
      description,
      iconName,
      pillarLandingTagline,
      pillarLandingBullets,
      pillarLandingOutcome,
      pillarLandingImage
    }
  }
`;

export const serviceQuery = groq`
  *[_type == "service-consulting" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    "pillarSlug": pillar->slug.current,
    "pillarTitle": pillar->title,
    heroHeadline,
    heroImage,
    heroSubheadline,
    heroCtaLabel,
    heroCtaLink,
    valuePropHeadline,
    valuePropAccent,
    valuePropBody,
    problemHeadline,
    problemImage,
    problemHighlight,
    problemBody,
    problemBullets,
    problemCtaLabel,
    problemCtaLink,
    howWeHelpSubtitle,
    helpCards,
    networkHeadline,
    networkSubheadline,
    network,
    featureEyebrow,
    featureHeadline,
    featureImage,
    featureBody,
    featureBullets,
    featureCtaLabel,
    featureCtaLink,
    stats,
    featureGridEyebrow,
    featureGridHeadline,
    featureGridBody,
    featureGridCards[] {
      title,
      description,
      iconName
    },
    whatsIncludedHeadline,
    whatsIncludedSubtext,
    whatsIncludedImage,
    whatsIncluded,
    ctaHeadline,
    ctaBody,
    ctaButtonLabel,
    ctaButtonLink
  }
`;

export const whoWeWorkWithQuery = groq`
  *[_type == "who-we-work-with-consulting"][0] {
    headline,
    description,
    categories[] {
      title,
      description,
      iconName
    }
  }
`;

export const solutionsQuery = groq`
  *[_type == "solutions-consulting"][0] {
    headline,
    description,
    capabilitiesLeadIn,
    items[] {
      id,
      title,
      subtitle,
      tagline,
      body,
      howNeedsMet,
      ctaPrompt,
      href
    }
  }
`;

export const caseStudiesQuery = groq`
  *[_type == "case-study-consulting"] | order(order asc) {
    _id,
    title,
    coverImage,
    "pdfUrl": pdfFile.asset->url
  }
`;

export const serviceCategoriesQuery = groq`
  *[_type == "pillar-consulting"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    aboutUsSubtitle,
    aboutUsServices
  }
`;

export const allServicesQuery = groq`
  *[_type == "service-consulting"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    "pillarSlug": pillar->slug.current,
    "pillarTitle": pillar->title,
    description
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings-consulting"][0] {
    title,
    trustedByLine,
    newsletterHeading,
    newsletterPlaceholder,
    newsletterSubmitLabel,
    newsletterEndpoint,
    footerTagline,
    footerCopyright,
    mainNavigation[] {
      name,
      href,
      description,
      children[] {
        name,
        href,
        description
      }
    },
    footerNavigation[] {
      columnTitle,
      links[] {
        name,
        href
      }
    }
  }
`;

export const pageQuery = groq`
  *[_type == "page-consulting" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    heroEyebrow,
    heroHeadline,
    heroSubheadline,
    heroImage,
    pullQuote,
    splitEyebrow,
    splitHeading,
    splitBody,
    ctaEyebrow,
    ctaHeading,
    ctaBody,
    ctaButtonLabel,
    ctaButtonLink
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage-consulting"][0] {
    stats[] {
      metricValue,
      metricLabel,
      supportingLabel
    },
    positioningEyebrow,
    positioningHeadline,
    positioningSupportingCopy,
    painPointCards,
    positioningStatement,
    positioningCtaText,
    positioningCtaHref,
    ecosystemHeadline,
    ecosystemSupportingCopy,
    serviceBlocks[] {
      title,
      shortDescription,
      supportingCopy,
      featureHighlights,
      sideCardEyebrow,
      sideCardHeadline,
      sideCardCtaText,
      sideCardCtaHref,
      pillarHref
    },
    whoHeadline,
    whoSupportingCopy,
    whoClientTypes[] {
      label,
      icon
    },
    whoPositioningText,
    whoCtaText,
    whoCtaHref,
    whyHeadline,
    whySupportingCopy,
    whyBullets,
    whyClosingStatement,
    whyCtaText,
    whyCtaHref,
    expertiseHeadline,
    expertiseSubheadline,
    expertiseLead,
    expertiseItems,
    expertiseClosingStatement,
    expertiseCtaText,
    expertiseCtaHref,
    finaleHeadline,
    finaleSupportingCopy,
    finaleCtaText,
    finaleCtaHref
  }
`;

export const capabilitiesPageQuery = groq`
  *[_type == "capabilitiesPage-consulting"][0] {
    introHeading,
    introParagraph,
    darkBlockStatement,
    darkBlockBody,
    statsStrip,
    bottomCtaHeadline,
    bottomCtaButtonText,
    bottomCtaButtonLink
  }
`;

export const aboutUsPageQuery = groq`
  *[_type == "aboutUsPage-consulting"][0] {
    introImage,
    narrativeSections[] {
      eyebrow,
      heading,
      body,
      sectionImage
    },
    subPagesNav[] {
      label,
      href
    },
    ctaHeadline,
    ctaSubline,
    ctaButtonLabel,
    ctaButtonLink
  }
`;

export const legalPageQuery = groq`
  *[_type == "legalPage-consulting" && slug.current == $slug][0] {
    title,
    lastUpdated,
    heroImage,
    content
  }
`;

export const joinUsPageQuery = groq`
  *[_type == "joinUsPage-consulting" && pageKey == $pageKey][0] {
    pageKey,
    heroEyebrow,
    heroHeadline,
    heroSubheadline,
    heroImage,
    heroImagePath,
    heroCtaLabel,
    heroCtaLink,
    pullQuote1,
    pullQuote2,
    whoEyebrow,
    whoHeadline,
    traits[] {
      title,
      description
    },
    ctaEyebrow,
    ctaHeadline,
    openings[] {
      title,
      summary,
      applyLink
    },
    noOpeningsFallback,
    ctaBody,
    ctaButtonLabel,
    ctaButtonHref
  }
`;

export const expertisePageQuery = groq`
  *[_type == "expertisePage-consulting"][0] {
    heroEyebrow,
    heroHeadline,
    heroAccent,
    heroSubheadline,
    heroImage,
    heroCtaLabel,
    heroCtaLink,
    impactStatsHeadline,
    impactStats[] {
      prefix,
      number,
      suffix,
      label
    },
    expertiseAreasEyebrow,
    expertiseAreas[] {
      title,
      body,
      outcomes,
      ctaLabel,
      ctaLink
    },
    howWeEngageHeadline,
    howWeEngageBody,
    engagementPrinciples[] {
      title,
      description
    },
    howWeEngageClosing,
    howWeEngageCtaLabel,
    howWeEngageCtaLink,
    differentiatorHeadline,
    differentiatorBody,
    differentiatorCtaLabel,
    differentiatorCtaLink
  }
`;

export const partnerPageQuery = groq`
  *[_type == "partnerPage-consulting" && pageKey == $pageKey][0] {
    pageKey,
    heroEyebrow,
    heroHeadline,
    heroAccent,
    heroSubheadline,
    heroImage,
    heroCtaLabel,
    heroCtaLink,
    whyHeadline,
    whyBody,
    whySectionImage,
    whyAccessHeadline,
    whyAccessPoints,
    partnerTypes[] {
      key,
      title,
      tagline,
      body,
      whoForHeadline,
      whoFor,
      howEngageHeadline,
      howEngage,
      whatGainHeadline,
      whatGain,
      ctaLabel,
      ctaLink
    },
    tagline,
    narrativeBody,
    whoForHeadline,
    whoFor,
    howEngageHeadline,
    howEngage,
    whatGainHeadline,
    whatGain,
    closingHeadline,
    closingBody,
    closingCtaLabel,
    closingCtaLink
  }
`;
