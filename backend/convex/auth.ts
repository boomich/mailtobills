import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth, type AuthProviderConfig } from "@convex-dev/auth/server";

import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Resend from "@auth/core/providers/resend";

const providers: (AuthProviderConfig | undefined)[] = [
  Password,
  process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      })
    : undefined,
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    : undefined,
  process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL
    ? Resend({
        apiKey: process.env.RESEND_API_KEY,
        from: process.env.RESEND_FROM_EMAIL,
      })
    : undefined,
];

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: providers.filter(Boolean) as AuthProviderConfig[],
});
