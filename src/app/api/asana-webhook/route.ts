import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    // Next.js normalizes all header keys to LOWERCASE automatically
    const asanaSecret = req.headers.get("x-hook-secret");
    const signature = req.headers.get("x-hook-signature");

    // ----------------------------------------------------
    // STEP 1: Handle the Initial Asana Handshake 
    // ----------------------------------------------------
    if (asanaSecret) {
      console.log("Handshake received! Secret is:", asanaSecret);
      
      // IMPORTANT: You must echo it back using the exact mixed-case 
      // string header key 'X-Hook-Secret' in the response.
      return new NextResponse(null, {
        status: 200,
        headers: {
          "X-Hook-Secret": asanaSecret,
        },
      });
    }

    // ----------------------------------------------------
    // STEP 2: Process Actual Webhook Event Payloads
    // ----------------------------------------------------
    // This code ONLY runs on future requests when Asana sends actual data.
    if (!signature) {
      return NextResponse.json({ error: "No signature found" }, { status: 400 });
    }

    const rawBody = await req.text();
    const savedSecret = process.env.ASANA_WEBHOOK_SECRET; 

    if (savedSecret) {
      const computedSignature = crypto
        .createHmac("sha256", savedSecret)
        .update(rawBody)
        .digest("hex");

      if (computedSignature !== signature) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const body = JSON.parse(rawBody);
    console.log("Asana Event Received:", body.events);

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
