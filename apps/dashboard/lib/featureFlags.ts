export const featureFlags = {
  magicLinkAuth: process.env.FEATURE_MAGIC_LINK_AUTH === "true",
} as const;
