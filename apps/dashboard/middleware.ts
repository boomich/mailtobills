import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
  type ConvexAuthNextjsMiddlewareContext,
} from "@convex-dev/auth/nextjs/server";
import type { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/signin(.*)",
  "/_next(.*)",
  "/favicon.ico",
]);

export default convexAuthNextjsMiddleware(
  async (
    request: NextRequest,
    {
      convexAuth,
    }: {
      convexAuth: ConvexAuthNextjsMiddlewareContext;
    }
  ) => {
    if (!isPublicRoute(request) && !(await convexAuth.isAuthenticated())) {
      return nextjsMiddlewareRedirect(request, "/signin");
    }
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
