"use server";

import { auth } from '@/lib/auth';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import Stripe from 'stripe';

// Test mode key; don't put live keys in code. See https://docs.stripe.com/keys-best-practices.


export const createStripeProduct = async () => {
  const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const session = await auth.api.getSession({
    headers: await headers()
  }); 

  const userId = session?.user?.id as string;

  const stripeSession = await stripeClient.checkout.sessions.create({
  success_url: 'http://localhost:3000/sign-in',
  line_items: [
    {
      price: 'price_1TmoNj5rLJX5AeyxxCEHMuih',
      quantity: 1,
    },
  ],
  mode: 'subscription',
  metadata: {
    userId: userId,
  }
  });

  if (!userId) {
    redirect("/sign-in");
  }

  if (stripeSession.url) {
    redirect(stripeSession.url);
  }

  console.log('Stripe session created:', stripeSession);
  console.log('User ID:', userId);
}