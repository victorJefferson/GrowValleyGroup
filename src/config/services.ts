export interface ServiceDetail {
  slug: string;
  title: string;
  description: string;
  category: string;
  iconName: string;
  content: string;
  features: string[];
  stats: { label: string; value: string }[];
}

export const services: ServiceDetail[] = [
  // Establish
  {
    slug: "company-formation",
    title: "Company Formation",
    description: "Mainland, free zone, or offshore. We handle the full formation process from document preparation through trade licence issuance.",
    category: "Establish",
    iconName: "Building2",
    content: "Mainland, free zone, or offshore. We handle the full formation process from document preparation through trade licence issuance. No delays from missing paperwork or wrong submissions.",
    features: ["Mainland & free zone formation", "Document preparation and submission", "Trade licence issuance"],
    stats: [{ label: "Entities Formed", value: "400+" }]
  },
  {
    slug: "free-zone-setup",
    title: "Free Zone Setup",
    description: "Over 40 free zones in the UAE, each with different rules on ownership, activity, visas, and tax. We advise on the right zone for your specific business and manage the full application.",
    category: "Establish",
    iconName: "Globe",
    content: "Over 40 free zones in the UAE, each with different rules on ownership, activity, visas, and tax. We advise on the right zone for your specific business and manage the full application.",
    features: ["Free zone selection advisory", "Full application management", "Visa and licence coordination"],
    stats: [{ label: "Free Zones Covered", value: "40+" }]
  },
  {
    slug: "corporate-structuring",
    title: "Corporate Structuring",
    description: "Holding companies, subsidiary networks, SPVs, and cross-border structures. We design the legal and ownership architecture that matches your operating model and expansion plans.",
    category: "Establish",
    iconName: "Layers",
    content: "Holding companies, subsidiary networks, SPVs, and cross-border structures. We design the legal and ownership architecture that matches your operating model and expansion plans.",
    features: ["Holding company design", "Subsidiary and SPV setup", "Cross-border ownership architecture"],
    stats: [{ label: "Structures Designed", value: "200+" }]
  },
  {
    slug: "trust-and-fiduciary",
    title: "Trust & Fiduciary Setup",
    description: "Trust structures for asset protection, succession planning, and cross-border estate management. We work with qualified fiduciaries to design and establish the right vehicle.",
    category: "Establish",
    iconName: "ShieldCheck",
    content: "Trust structures for asset protection, succession planning, and cross-border estate management. We work with qualified fiduciaries to design and establish the right vehicle.",
    features: ["Asset protection trusts", "Succession trust structures", "Fiduciary coordination"],
    stats: [{ label: "Jurisdictions", value: "15+" }]
  },

  // Operate
  {
    slug: "pro-and-government-services",
    title: "PRO & Government Services",
    description: "Visa applications, Emirates ID, medical fitness, labour card, MOL and MOHRE filings. Every government touchpoint managed end to end, with no missed deadlines.",
    category: "Operate",
    iconName: "Briefcase",
    content: "Visa applications, Emirates ID, medical fitness, labour card, MOL and MOHRE filings. Every government touchpoint managed end to end, with no missed deadlines.",
    features: ["Visa processing", "Government filings", "Deadline management"],
    stats: [{ label: "Filings Per Month", value: "500+" }]
  },
  {
    slug: "entity-management",
    title: "Entity Management",
    description: "Trade licence renewals, MoA amendments, shareholder changes, and registered address maintenance. Your entity records kept accurate and current.",
    category: "Operate",
    iconName: "Building2",
    content: "Trade licence renewals, Memorandum of Association amendments, shareholder changes, and registered address maintenance. Your entity records kept accurate and current.",
    features: ["Licence renewals", "Corporate amendments", "Record maintenance"],
    stats: [{ label: "Entities Managed", value: "400+" }]
  },
  {
    slug: "regulatory-filings",
    title: "Regulatory Filings",
    description: "UBO registration, ESR notifications and reports, AML compliance submissions, and DIFC or ADGM reporting requirements handled by specialists in each framework.",
    category: "Operate",
    iconName: "ScrollText",
    content: "UBO registration, ESR notifications and reports, AML compliance submissions, and DIFC or ADGM reporting requirements handled by specialists in each framework.",
    features: ["UBO and ESR compliance", "AML filings", "Free zone regulatory submissions"],
    stats: [{ label: "Compliance Rate", value: "100%" }]
  },
  {
    slug: "corporate-administration",
    title: "Corporate Administration",
    description: "Board resolutions, minutes, statutory registers, and corporate secretarial compliance. The documentation layer that keeps your governance clean and your records defensible.",
    category: "Operate",
    iconName: "Layers",
    content: "Board resolutions, minutes, statutory registers, and corporate secretarial compliance. The documentation layer that keeps your governance clean and your records defensible.",
    features: ["Board resolutions and minutes", "Statutory registers", "Corporate secretarial compliance"],
    stats: [{ label: "Documents Managed", value: "10,000+" }]
  },

  // Manage
  {
    slug: "accounting-and-bookkeeping",
    title: "Accounting & Bookkeeping",
    description: "Monthly bookkeeping, reconciliations, management accounts, and financial statements. Accurate records maintained on a consistent cadence — not as an afterthought at year end.",
    category: "Manage",
    iconName: "BarChart3",
    content: "Monthly bookkeeping, reconciliations, management accounts, and financial statements. Accurate records maintained on a consistent cadence — not as an afterthought at year end.",
    features: ["Monthly bookkeeping", "Management accounts", "Financial statements"],
    stats: [{ label: "Clients Served", value: "200+" }]
  },
  {
    slug: "payroll",
    title: "Payroll",
    description: "End-to-end payroll processing compliant with UAE Labour Law and WPS requirements. Every employee paid accurately and on time, with full records maintained.",
    category: "Manage",
    iconName: "Users",
    content: "End-to-end payroll processing compliant with UAE Labour Law and WPS requirements. Every employee paid accurately and on time, with full records maintained.",
    features: ["WPS-compliant processing", "Labour Law compliance", "Full payroll records"],
    stats: [{ label: "Employees on Payroll", value: "2,000+" }]
  },
  {
    slug: "hr-administration",
    title: "HR Administration",
    description: "Employment contracts, HR policy documentation, leave management, and personnel file maintenance. The administrative layer that keeps your workforce management defensible.",
    category: "Manage",
    iconName: "Briefcase",
    content: "Employment contracts, HR policy documentation, leave management, and personnel file maintenance. The administrative layer that keeps your workforce management defensible.",
    features: ["Employment contracts", "Policy documentation", "Leave and personnel management"],
    stats: [{ label: "HR Files Managed", value: "5,000+" }]
  },
  {
    slug: "tax-compliance",
    title: "Tax Compliance",
    description: "VAT registration, quarterly VAT return preparation and filing, Corporate Tax registration and compliance. Every obligation met on schedule with full documentation.",
    category: "Manage",
    iconName: "ShieldCheck",
    content: "VAT registration, quarterly VAT return preparation and filing, Corporate Tax registration and compliance. Every obligation met on schedule with full documentation.",
    features: ["VAT registration and returns", "Corporate Tax compliance", "Full audit documentation"],
    stats: [{ label: "On-Time Filing Rate", value: "100%" }]
  },
  {
    slug: "employer-of-record",
    title: "Employer of Record",
    description: "Employ staff in the UAE without setting up a local entity. We act as the legal employer, handling payroll, HR administration, visa sponsorship, and full compliance.",
    category: "Manage",
    iconName: "Network",
    content: "Employ staff in the UAE without setting up a local entity. We act as the legal employer, handling payroll, HR administration, visa sponsorship, and full compliance.",
    features: ["Legal employer status", "Visa sponsorship", "Full HR and payroll management"],
    stats: [{ label: "EOR Employees", value: "500+" }]
  },

  // Expand
  {
    slug: "international-expansion",
    title: "International Expansion",
    description: "Entity setup, regulatory registration, and operational infrastructure across target markets. We coordinate the full sequence so the expansion lands ready to operate.",
    category: "Expand",
    iconName: "Globe",
    content: "Entity setup, regulatory registration, and operational infrastructure across target markets. We coordinate the full sequence so the expansion lands ready to operate.",
    features: ["Entity setup in target markets", "Regulatory registration", "Operational infrastructure"],
    stats: [{ label: "Markets Covered", value: "25+" }]
  },
  {
    slug: "multi-entity-structuring",
    title: "Multi-Entity Structuring",
    description: "Holding company design, subsidiary networks, and intercompany frameworks for groups operating across multiple jurisdictions. Clean structure, clear governance.",
    category: "Expand",
    iconName: "Layers",
    content: "Holding company design, subsidiary networks, and intercompany frameworks for groups operating across multiple jurisdictions. Clean structure, clear governance.",
    features: ["Group holding design", "Intercompany frameworks", "Multi-jurisdiction governance"],
    stats: [{ label: "Multi-Entity Groups", value: "80+" }]
  },
  {
    slug: "cross-border-compliance",
    title: "Cross-Border Compliance",
    description: "Transfer pricing documentation, substance requirements, permanent establishment analysis, and multi-jurisdiction tax compliance. Managed by specialists in each regime.",
    category: "Expand",
    iconName: "ShieldCheck",
    content: "Transfer pricing documentation, substance requirements, permanent establishment analysis, and multi-jurisdiction tax compliance. Managed by specialists in each regime.",
    features: ["Transfer pricing documentation", "Substance requirements", "Multi-jurisdiction tax compliance"],
    stats: [{ label: "Jurisdictions Covered", value: "25+" }]
  },
  {
    slug: "market-entry-support",
    title: "Market Entry Support",
    description: "Market-specific regulatory guidance, local partner introductions, banking and account opening support, and operational setup coordination for new market entry.",
    category: "Expand",
    iconName: "Target",
    content: "Market-specific regulatory guidance, local partner introductions, banking and account opening support, and operational setup coordination for new market entry.",
    features: ["Regulatory guidance", "Banking setup", "Local partner introductions"],
    stats: [{ label: "Markets Entered", value: "30+" }]
  }
];
