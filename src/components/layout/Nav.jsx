import React from 'react';
import NavList from './NavList';
// import { SignInButton, UserButton } from '@clerk/nextjs';

export default function Nav() {
  return (
    <nav className="flex items-center gap-6">
      <NavList />
      <div className="flex items-center gap-4 border-l border-outline-variant/30 pl-6">
        {/* <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md font-bold hover:bg-on-primary-fixed transition-colors shadow-sm">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn> */}
      </div>
    </nav>
  );
}
