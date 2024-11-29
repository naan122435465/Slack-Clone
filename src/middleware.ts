import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect
} from "@convex-dev/auth/nextjs/server";
import { request } from "http";

const isPublicPage = createRouteMatcher(["/auth"])

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
    if (!isPublicPage(request) && !(await convexAuth.isAuthenticated())) {
      return nextjsMiddlewareRedirect(request, "/auth");
    }
    if(isPublicPage(request) && (await convexAuth.isAuthenticated())){
        return nextjsMiddlewareRedirect(request,"/");
    }
    // TODAO: Redirect user away from " /auth" if authenticated
})
export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};