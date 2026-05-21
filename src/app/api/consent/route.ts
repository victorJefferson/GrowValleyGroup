import { NextResponse } from "next/server";
import { adminClient } from "@/lib/sanityAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { timestamp, consent, userAgent, url } = body;

    // Redact IP for privacy compliance (supports IPv4 and IPv6)
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = request.headers.get("cf-connecting-ip") || 
               request.headers.get("x-real-ip") || 
               (forwarded ? forwarded.split(",")[0].trim() : "unknown");

    let anonymizedIp = "unknown";
    
    if (ip.includes(".")) {
      // IPv4: 192.168.1.1 -> 192.168.1.xxx
      anonymizedIp = ip.split(".").slice(0, 3).join(".") + ".xxx";
    } else if (ip.includes(":")) {
      // IPv6: 2001:db8:85a3:8d3:1319:8a2e:370:7348 -> 2001:db8:85a3:8d3:1319:8a2e:370:xxxx
      const parts = ip.split(":");
      anonymizedIp = parts.slice(0, Math.max(1, parts.length - 1)).join(":") + ":xxxx";
    } else if (ip === "::1" || ip === "127.0.0.1") {
      anonymizedIp = "localhost";
    }

    // Only skip if no token is configured or client is missing
    if (!process.env.SANITY_WRITE_TOKEN || !adminClient) {
      console.log(`TrustGuard [STUB]: Audit log recorded (${!adminClient ? "no client" : "no token"}):`, {
        timestamp,
        anonymizedIp,
        consent,
      });
      return NextResponse.json({ status: !adminClient ? "recorded_no_config" : "recorded_stub" });
    }

    await adminClient.create({
      _type: "consentLog",
      timestamp,
      anonymizedIp,
      consent: {
          necessary: consent.necessary || false,
          preferences: consent.preferences || false,
          statistics: consent.statistics || false,
          marketing: consent.marketing || false,
      },
      userAgent,
      url,
    });

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("TrustGuard: API Error", error);
    return NextResponse.json({ error: "Failed to log consent" }, { status: 500 });
  }
}
