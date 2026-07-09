import {Stripe} from 'stripe';
import {NextRequest, NextResponse} from 'next/server';
import {headers} from 'next/headers';
import prisma from '@/lib/prisma';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  let event: Stripe.Event;

  try {
    const stripeSignature = (await headers()).get('stripe-signature');


    event = stripe.webhooks.constructEvent(
      await req.text(),
      stripeSignature as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      {message: `Webhook Error: ${errorMessage}`},
      {status: 400}
    );
  }

  // Successfully constructed event.
  console.log('✅ Success:', event.id);

  const permittedEvents: string[] = [
    'checkout.session.completed',
    'payment_intent.succeeded',
    'payment_intent.payment_failed',
  ];

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          data = event.data.object as Stripe.Checkout.Session;
          console.log(`💰 CheckoutSession status: ${data.payment_status}`);
          const userId = data.metadata?.userId;

            if (!userId) {
              console.log("❌ Webhook skipped: No userId found in session metadata.");
              break;
            }

            try {
              // 2. Update your database fields via Prisma!
              await prisma.user.update({
                where: {
                  id: userId,
                },
                data: {
                  isSubscribed: true,
                  subscriptionId: data.subscription as string,
                  priceId: data.metadata?.priceId || "premium",
                },
              });
              console.log(`🎉 Database updated successfully for user: ${userId}`);
            } catch (dbError) {
              console.error("❌ Prisma failed to update user record:", dbError);
            }
          break;
        case 'payment_intent.payment_failed':
          data = event.data.object as Stripe.PaymentIntent;
          console.log(`❌ Payment failed: ${data.last_payment_error?.message}`);
          break;
        case 'payment_intent.succeeded':
          data = event.data.object as Stripe.PaymentIntent;
          console.log(`💰 PaymentIntent status: ${data.status}`);
          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        {message: 'Webhook handler failed'},
        {status: 500}
      );
    }
  }

  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({message: 'Received'}, {status: 200});
}