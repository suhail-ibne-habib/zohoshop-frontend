import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isSellerRoute = createRouteMatcher(['/seller(.*)', '/saler(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isSellerRoute(req)) {
    const authObj = await auth();

    // Not signed in → redirect to Clerk sign-in, return to original URL after
    if (!authObj.userId) {
      return authObj.redirectToSignIn({ returnBackUrl: req.url });
    }

    console.log(authObj.sessionClaims);

    // Signed in check: extract role safely whether sessionClaims.role is a string or an object
    const rawRole = authObj?.sessionClaims?.role || authObj?.sessionClaims?.publicMetadata?.role || authObj?.sessionClaims?.metadata?.role;
    const userRole = typeof rawRole === 'object' && rawRole !== null ? rawRole.role : rawRole;

    // If role is present and not seller/saler/admin, redirect to homepage
    if (userRole && userRole !== 'seller' && userRole !== 'saler' && userRole !== 'admin') {
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