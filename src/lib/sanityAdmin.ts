import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.warn("TrustGuard: SANITY_WRITE_TOKEN is not defined in .env.local. Audit logging will be disabled.");
}

export const adminClient = projectId 
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-03-01",
      useCdn: false,
      token, // Write token
    })
  : null;
