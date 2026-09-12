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

    // Signed in check: extract role safely from session claims
    const userRole = authObj?.sessionClaims?.role || authObj?.sessionClaims?.publicMetadata?.role || authObj?.sessionClaims?.metadata?.role;
    
    // If role is present and not saler/admin, redirect to homepage
    if (userRole && userRole !== 'saler' && userRole !== 'admin') {
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