import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isSellerRoute = createRouteMatcher(['/saler(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isSellerRoute(req)) {
    const authObj = await auth();

    // Not signed in → redirect to Clerk sign-in, return to original URL after
    if (!authObj.userId) {
      return authObj.redirectToSignIn({ returnBackUrl: req.url });
    }

    // Signed in but wrong role → redirect to homepage
    const userRole = authObj?.sessionClaims?.role?.role;
    console.log(userRole)
    if (userRole !== 'saler' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|png|jpg|jpeg|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};