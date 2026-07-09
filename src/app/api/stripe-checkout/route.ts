import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "User is not logged in" }, { status: 401 })
    }

    const { priceId } = await request.json()

    if (!priceId || !priceId.startsWith("price_")) {
      return NextResponse.json({ error: "Invalid or missing Stripe Price ID" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Explicitly targeting the accurate model column name from your schema
    let customerId = user.customerId 

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user.id },
      })
      customerId = customer.id

      await prisma.user.update({
        where: { id: user.id },
        data: { customerId: customerId },
      })
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // Securely dynamic
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/sign-up`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/sign-up`,
      metadata: {
        userId: user.id,
      },
    })

    return NextResponse.json({ url: checkoutSession.url })

  } catch (error: any) {
    console.error("CRITICAL BACKEND STRIPE ERROR: ", error.message || error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}


