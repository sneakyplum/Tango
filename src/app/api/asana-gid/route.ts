import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // 1. Session check FIRST before hitting DB or external APIs
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // 2. Grab stored token
  const getToken = await prisma.account.findFirst({
    where: {
      userId: userId,
      providerId: "asana",
    },
  });

  if (!getToken?.accessToken) {
    return NextResponse.json({ error: "No Asana access token found" }, { status: 404 });
  }

  // 3. Fetch workspaces from Asana
  const workspaceRes = await fetch("https://app.asana.com/api/1.0/workspaces", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken.accessToken}`,
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

  if (!workspaceGid) {
    return NextResponse.json(
      { error: "No workspaces found in Asana account", rawResponse: asanaJson },
      { status: 400 }
    );
  }
  

  // 5. Return clean JSON to Postman/Browser!
  return NextResponse.json({

    allWorkspaces: asanaJson.data, // Shows every workspace the user owns
    workspaceGid: workspaceGid,
  });
}