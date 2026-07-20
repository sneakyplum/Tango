import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
    baseURL: "http://localhost:3000",
    emailAndPassword: {    
        enabled: true
    },
    account: {
        accountLinking: {
            enabled: false, 
        }
    },
    plugins: [
        genericOAuth({ 
          config: [ 
            { 
              providerId: "asana",
              clientId: process.env.ASANA_CLIENT_ID as string,
              clientSecret: process.env.ASANA_CLIENT_SECRET as string,
              authorizationUrl: "https://app.asana.com/-/oauth_authorize",
              tokenUrl: "https://app.asana.com/-/oauth_token",
                    // Add any specific scopes you need (space-separated in Asana docs, an array here)
              scopes: ["openid", "users:read", "tasks:read", "tasks:write", "projects:read"],
          
          getUserInfo: async (tokens) => {
            try {
              const response = await fetch("https://app.asana.com/api/1.0/users/me", {
                headers: {
                  Authorization: `Bearer ${tokens.accessToken}`,
                },
              });

              const json = await response.json();
              console.log("ASANA RESPONSE PAYLOAD:", json); // Look for this in your VS Code terminal!

              if (!response.ok) {
                throw new Error(`Asana API error: ${JSON.stringify(json)}`);
              }

              const asanaUser = json.data;

              return {
                id: asanaUser.gid,
                name: asanaUser.name,
                email: asanaUser.email,
                emailVerified: true, // Asana doesn't provide email verification status, so we assume it's verified
              };
            } catch (err) {
              console.error("GET_USER_INFO CRASHED:", err);
              throw err;
            }
          }
            }, 
          ]
        }) 
    ]
});