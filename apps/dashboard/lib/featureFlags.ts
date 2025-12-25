export const featureFlags = {
  magicLinkAuth: process.env.NEXT_PUBLIC_FEATURE_MAGIC_LINK_AUTH === "true",
} as const;

