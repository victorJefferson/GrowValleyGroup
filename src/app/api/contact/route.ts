import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const formData = await request.json();

        // 1. Validate the data (optional but recommended)
        if (!formData.emailAddress || !formData.fullName) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // 2. Verify the captchaToken with Cloudflare Turnstile
        const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;
        const captchaToken = formData.captchaConfirmed; // This will now carry the real token

        if (!turnstileSecretKey) {
            console.error("TURNSTILE_SECRET_KEY is not defined");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        // Verify the token with Cloudflare
        const verifyResponse = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `secret=${encodeURIComponent(turnstileSecretKey)}&response=${encodeURIComponent(captchaToken)}`,
            }
        );

        const verifyData = await verifyResponse.json();

        if (!verifyData.success) {
            console.error("Turnstile verification failed:", verifyData["error-codes"]);
            return NextResponse.json(
                { error: "Anti-bot verification failed. Please try again." },
                { status: 400 }
            );
        }

        // 3. Get the webhook URL from environment variables
        const webhookUrl = process.env.NINJAPIPE_WEBHOOK_URL || process.env.NINJAPIPE_CONTACT_WEBHOOK;

        if (!webhookUrl) {
            console.error("NINJAPIPE_CONTACT_WEBHOOK is not defined");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        // 3. Forward the data to NinjaPipe
        // We include a timestamp and source for better CRM tracking
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...formData,
                source: "GrowValley Group",
                submittedAt: new Error().stack?.includes("GMT") ? new Date().toISOString() : new Date().toLocaleString(),
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("NinjaPipe API Error:", errorText);
            return NextResponse.json(
                { error: "Failed to send enquiry to CRM" },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact API Route Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
