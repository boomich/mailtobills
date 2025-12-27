"use client";

import { ConvexReactClient } from "convex/react";
import { api } from "@mailtobills/backend/_generated/api";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export const isConvexConfigured = Boolean(convexUrl);

export const convexClient = convexUrl
  ? new ConvexReactClient(convexUrl, {
      verbose: true,
    })
  : null;

export { api };
