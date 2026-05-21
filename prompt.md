## Role & Objective
You are an expert full-stack developer. Your task is to duplicate the structure and UI design of an existing institutional website to create a new website for a different client. You will map new content to the existing architecture, modify the Sanity CMS schema, and seed the new content exactly as provided.

---

## High-Level Architecture & Mapping Instructions
Retain the exact design, components, and layout of the previous website, but adjust the page routing and Sanity schema according to this structural mapping:

1. **Home Page (`/`):** Retain exactly "as is" structurally. Map the new homepage content directly to the existing homepage components.
2. **Companies Page (`/companies`):** This is the new umbrella page for all underlying companies. 
   - *Mapping:* This replaces the existing site's **"Capabilities"** page structure.
3. **Company Detail Pages (`/companies/[slug]`):** Each individual company will have its own page.
   - *Mapping:* These replace the existing site's **"Service Pillars"** page structures.
4. **Removals:** We do not have individual sub-pages (like the old individual "Service Pages") for each company. **Scrape off / remove these individual sub-pages and their routes entirely.**
5. **Rest of the Pages:** Maintain the same mapping and structure as the existing site for any remaining pages (e.g., About, Contact, etc.).

---

## CRITICAL GUARDRAILS (Read Carefully Before Code Execution)

### 1. Zero-Tolerance Content Integrity
- When seeding data into Sanity, you must use the exact text provided in the new content file. 
- **DO NOT** alter, paraphrase, shorten, expand, or miss a single word.
- **DO NOT** insert any placeholder text, AI-generated copy, or assumptions.

### 2. Strict Fallback Text Removal & Defensiveness
- **Remove all hardcoded UI fallback text** across all pages that fetch content from the CMS.
- If content is missing from the CMS for a specific section, the page **MUST NOT BREAK**. 
- Implement strict defensive programming: use optional chaining (`?.`), nullish coalescing (`??`), and fallback to empty structures (e.g., empty arrays `[]` or empty strings `""`). 
- **Under no circumstances should any user-facing placeholder text or old client text be displayed if CMS data is empty.**

### 3. Sanity Configuration
- Use the target Sanity Project ID and Dataset directly from the local environment variables (`.env`).

---

## Step-by-Step Execution Plan

### Step 1: Schema Definition & Mapping
- Analyze the existing Sanity schema files and the provided new content text.
- Modify/Create the Sanity schema to reflect the new structure (`companies` replacing capabilities, and company details replacing service pillars).
- Ensure fields match the data types required by the new content.

### Step 2: Route & Frontend Adjustment
- Update the Next.js/frontend pages and routing folder structure to match the new mapping (`/companies` and `/companies/[slug]`).
- Strip out the deleted individual service page routes.
- Update the frontend GROQ queries to fetch from the newly defined Sanity schemas.
- Implement the strict defensive programming rules (no fallback text, empty arrays instead).

### Step 3: Sanity Seeding Script
- Create or update a Sanity seeding script.
- Seed the exact content attached below into the respective Sanity documents using the Project ID from the `.env` file.

---

## Input Data for Seeding
@grow_valley_group_content