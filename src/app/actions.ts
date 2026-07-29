"use server";

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

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

  interface TaskFilterOptions {
    workspace: string; // Optional workspace filter
    limit?: number;
    gid: string; // Required task GID

  }

export const getAsanaApiData = async ({
  gid,
  workspace,
  limit = 50,

}: TaskFilterOptions) => {
  // 1. Safely grab the session using request headers
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id as string;

  // 2. Protect the route/action
  if (!userId) {
    redirect("/sign-in");
  }

  const account = await prisma.account.findFirst({
    where: {
      userId: userId,
      providerId: "asana",
    },
  });

  const workspaceRes = await fetch("https://app.asana.com/api/1.0/workspaces", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${account?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const asanaJson = await workspaceRes.json();

  if (!workspaceRes.ok) {
    return NextResponse.json(
      { error: "Asana API call failed", details: asanaJson },
      { status: workspaceRes.status }
    );
  }

  // 4. ✅ Correctly extract GID from the data array
  const workspaceGid = asanaJson.data?.[0]?.gid;
 // Debugging: Log the entire response

  const paramsObj: Record<string, string> = {
    workspace: workspaceGid, // Replace with your actual workspace GID
    assignee: "me", // Special Asana keyword for the token owner!
    limit: limit.toString(), // Numbers convert to strings for URLs
    // Only select the fields your UI actually renders (keeps responses fast)
    opt_fields: "gid,name,resource_type,completed,due_at,due_on,assignee_status,created_at,modified_at",
  };

  const queryParams = new URLSearchParams(paramsObj);

  console.log("Asana API Request URL:", `https://app.asana.com/api/1.0/tasks?${queryParams.toString()}`);

  // 3. Make the API request with a clean await syntax
  const response = await fetch(`https://app.asana.com/api/1.0/tasks?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${account?.accessToken}`,
      "Content-Type": "application/json",
 // Replace with your actual task GID
    },
  });

  console.log("Asana API Response Status:", response);

  if (!response.ok) {
    throw new Error(`Asana API error: ${response.statusText}`);
  }

  // 4. Parse and explicitly RETURN the data
  const data = await response.json();
  return data.data; // Note: Asana nests its main arrays inside a "data" property
};