import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { genericOAuth } from "better-auth/plugins";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
    baseURL: process.env.BETTER_AUTH_URL!,
    emailAndPassword: {    
        enabled: true
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        await resend.emails.send({
          from: 'Tanjey <onboarding@resend.dev>',
          to: user.email,
          subject: 'Verify your email address for Tanjey',
          html: 
        `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify your email</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px 20px;">
            <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 32px; border: 1px solid #e4e4e7;">
              
              <!-- Header / App Name -->
              <h1 style="font-size: 20px; font-weight: 700; color: #09090b; margin: 0 0 16px 0;">
                Tanjey
              </h1>
              
              <!-- Content -->
              <p style="font-size: 15px; color: #3f3f46; line-height: 1.5; margin: 0 0 24px 0;">
                Thanks for signing up for Tanjey! Please verify your email address to complete your account setup and access your workspace.
              </p>
              
              <!-- CTA Button -->
              <div style="margin: 32px 0;">
                <a href="${url}" style="background-color: #09090b; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500; font-size: 14px; display: inline-block;">
                  Verify Email Address
                </a>
              </div>
              
              <!-- Fallback Link -->
              <p style="font-size: 13px; color: #71717a; line-height: 1.4; margin: 0 0 24px 0;">
                Or copy and paste this link into your browser:<br>
                <a href="${url}" style="color: #2563eb; text-decoration: underline; word-break: break-all;">${url}</a>
              </p>
              
              <!-- Footer -->
              <hr style="border: none; border-top: 1px solid #f4f4f5; margin: 24px 0;">
              <p style="font-size: 12px; color: #a1a1aa; margin: 0;">
                If you didn't create an account with Tanjey, you can safely ignore this email.
              </p>
              
            </div>
          </body>
        </html>
        `,
        });
      },
    },
    account: {
        accountLinking: {
            enabled: true,
        }
    },
    trustedOrigins: [
      process.env.NEXT_PUBLIC_APP_URL!,
      process.env.BETTER_AUTH_URL!,
    ],
    plugins: [
        genericOAuth({ 
          config: [ 
            { 
              providerId: "asana",
              clientId: process.env.ASANA_CLIENT_ID!,
              clientSecret: process.env.ASANA_CLIENT_SECRET!,
              authorizationUrl: "https://app.asana.com/-/oauth_authorize",
              tokenUrl: "https://app.asana.com/-/oauth_token",
                    // Add any specific scopes you need (space-separated in Asana docs, an array here)
              scopes: ["openid", "users:read", "tasks:read", "tasks:write", "projects:read", "workspaces:read"],
          
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


